import { useState, useEffect } from 'react';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { fetchPrice, fetch24hChange } from '@/lib/api/binance';

export interface AssetPrice {
  symbol: string;
  price: string;
  change: number;
}

const POLLING_INTERVAL = 10000; // 10 seconds
const BATCH_SIZE = 5; // Number of concurrent requests

export function useAssetPrices() {
  const [prices, setPrices] = useState<AssetPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchBatch(cryptos: typeof SUPPORTED_CRYPTOCURRENCIES) {
      return Promise.all(
        cryptos.map(async (crypto) => {
          try {
            const [price, change] = await Promise.all([
              fetchPrice(crypto.symbol),
              fetch24hChange(crypto.symbol)
            ]);

            return {
              symbol: crypto.symbol,
              price,
              change
            };
          } catch (err) {
            console.error(`Failed to fetch data for ${crypto.symbol}:`, err);
            return {
              symbol: crypto.symbol,
              price: '-',
              change: 0
            };
          }
        })
      );
    }

    async function fetchPrices() {
      try {
        setError(null);

        // Split cryptocurrencies into batches
        const batches = [];
        for (let i = 0; i < SUPPORTED_CRYPTOCURRENCIES.length; i += BATCH_SIZE) {
          batches.push(SUPPORTED_CRYPTOCURRENCIES.slice(i, i + BATCH_SIZE));
        }

        // Fetch batches sequentially to avoid rate limiting
        const results = [];
        for (const batch of batches) {
          const batchResults = await fetchBatch(batch);
          results.push(...batchResults);
        }

        if (mounted) {
          setPrices(results);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch prices');
          setIsLoading(false);
        }
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, POLLING_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { prices, isLoading, error };
}