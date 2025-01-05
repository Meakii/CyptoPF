import { useState, useEffect } from "react";
import { fetchPrice, fetch24hChange } from "@/lib/api/binance";
import { stripCurrencySymbols, parseAndFormatCurrency, DEFAULT_CURRENCY } from "@/lib/currency-utils";

interface UseCryptoPriceResult {
  price: string;
  rawPrice: number; // Added raw numeric value
  priceChange: number;
  isLoading: boolean;
  error: string | null;
}

interface UseCryptoPriceOptions {
  currency?: string;
}

export function useCryptoPrice(
  symbol: string,
  options: UseCryptoPriceOptions = {}
): UseCryptoPriceResult {
  const [price, setPrice] = useState("");
  const [rawPrice, setRawPrice] = useState(0);
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
          fetch24hChange(symbol),
        ]);

        if (mounted) {
          const numericPrice = parseFloat(stripCurrencySymbols(newPrice));
          setRawPrice(numericPrice);
          setPrice(parseAndFormatCurrency(numericPrice, options.currency || DEFAULT_CURRENCY));
          setPriceChange(newPriceChange);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch price data"
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [symbol, options.currency]);

  return { price, rawPrice, priceChange, isLoading, error };
}

// export function useCryptoPrice(
//   symbol: string,
//   options: UseCryptoPriceOptions = {}
// ): UseCryptoPriceResult {
//   const [price, setPrice] = useState('');
//   const [rawPrice, setRawPrice] = useState(0);
//   const [priceChange, setPriceChange] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;

//     async function fetchData() {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const [newPrice, newPriceChange] = await Promise.all([
//           fetchPrice(symbol),
//           fetch24hChange(symbol)
//         ]);

//         if (mounted) {
//           // Strip any existing currency symbols and convert to number
//           const numericPrice = parseFloat(stripCurrencySymbols(newPrice));
//           setRawPrice(numericPrice);
//           // Format with the specified currency
//           setPrice(formatCurrency(numericPrice, options.currency));
//           setPriceChange(newPriceChange);
//         }
//       } catch (err) {
//         if (mounted) {
//           setError(err instanceof Error ? err.message : 'Failed to fetch price data');
//         }
//       } finally {
//         if (mounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     fetchData();

//     const interval = setInterval(fetchData, 10000);

//     return () => {
//       mounted = false;
//       clearInterval(interval);
//     };
//   }, [symbol, options.currency]);

//   return { price, rawPrice, priceChange, isLoading, error };
// }

// import { useState, useEffect } from 'react';
// import { fetchPrice, fetch24hChange } from '@/lib/api/binance';

// interface UseCryptoPriceResult {
//   price: string;
//   priceChange: number;
//   isLoading: boolean;
//   error: string | null;
// }

// export function useCryptoPrice(symbol: string): UseCryptoPriceResult {
//   const [price, setPrice] = useState('');
//   const [priceChange, setPriceChange] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;

//     async function fetchData() {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const [newPrice, newPriceChange] = await Promise.all([
//           fetchPrice(symbol),
//           fetch24hChange(symbol)
//         ]);

//         if (mounted) {
//           setPrice(newPrice);
//           setPriceChange(newPriceChange);
//         }
//       } catch (err) {
//         if (mounted) {
//           setError(err instanceof Error ? err.message : 'Failed to fetch price data');
//         }
//       } finally {
//         if (mounted) {
//           setIsLoading(false);
//         }
//       }
//     }

//     fetchData();

//     // Set up polling every 10 seconds
//     const interval = setInterval(fetchData, 10000);

//     return () => {
//       mounted = false;
//       clearInterval(interval);
//     };
//   }, [symbol]);

//   return { price, priceChange, isLoading, error };
// }
