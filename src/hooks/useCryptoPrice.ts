import { useState, useEffect } from 'react';
import { fetchPrice, fetch24hChange } from '@/lib/api/binance';

interface UseCryptoPriceResult {
  price: string;
  priceChange: number;
  isLoading: boolean;
  error: string | null;
}

export function useCryptoPrice(symbol: string): UseCryptoPriceResult {
  const [price, setPrice] = useState('');
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [newPrice, newPriceChange] = await Promise.all([
          fetchPrice(symbol),
          fetch24hChange(symbol)
        ]);

        if (mounted) {
          setPrice(newPrice);
          setPriceChange(newPriceChange);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch price data');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    // Set up polling every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [symbol]);

  return { price, priceChange, isLoading, error };
}