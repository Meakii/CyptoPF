import { TimeFrame } from "@/components/crypto/chart-timeframe";

export interface ChartInterval {
  binanceInterval: string;
  limit: number;
}

export function getChartInterval(timeframe: TimeFrame): ChartInterval {
  switch (timeframe) {
    case '1D':
      return { binanceInterval: '30m', limit: 48 }; // 30min intervals for 1 day
    case '1W':
      return { binanceInterval: '4h', limit: 42 }; // 4h intervals for 1 week
    case '1M':
      return { binanceInterval: '1d', limit: 30 }; // 1 day intervals for 1 month
    case '6M':
      return { binanceInterval: '1d', limit: 180 }; // 1 day intervals for 6 months
    case '1Y':
      return { binanceInterval: '1w', limit: 52 }; // 1 week intervals for 1 year
  }
}