import { useState, useEffect } from 'react';
import { TimeFrame } from '@/components/crypto/chart-timeframe';
import { getChartInterval } from '@/lib/chart-utils';
import { fetchKlines } from '@/lib/api/binance';
import { fetchAUDRate } from '@/lib/api/binance';

interface ChartData {
  time: number;
  value: number;
}

export function useChartData(symbol: string, timeframe: TimeFrame) {
  const [data, setData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const { binanceInterval, limit } = getChartInterval(timeframe);
        const [klines, audRate] = await Promise.all([
          fetchKlines(symbol, binanceInterval, limit),
          fetchAUDRate()
        ]);
        
        if (!mounted) return;

        const chartData = klines.map(kline => ({
          time: kline.openTime / 1000,
          value: parseFloat(kline.close) * audRate,
        }));

        setData(chartData);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err : new Error('Failed to fetch chart data'));
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    // Set up polling for live updates
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [symbol, timeframe]);

  return { data, isLoading, error };
}