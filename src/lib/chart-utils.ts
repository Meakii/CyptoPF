import { TimeFrame } from "@/components/crypto/chart-timeframe";
import { format } from "date-fns";

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

export function formatTimeLabel(time: number, timeframe: TimeFrame): string {
  const date = new Date(time * 1000);
  
  switch (timeframe) {
    case '1D':
      return format(date, 'h:mma').toLowerCase();
    case '1W':
      return format(date, 'MMM d');
    case '1M':
      return format(date, 'MMM d');
    case '6M':
      return format(date, 'MMM d');
    case '1Y':
      return format(date, 'MMM yyyy');
  }
}

export function formatTooltipTime(time: number, timeframe: TimeFrame): string {
  const date = new Date(time * 1000);
  
  switch (timeframe) {
    case '1D':
      return format(date, 'h:mma').toLowerCase();
    case '1W':
      return `${format(date, 'MMM d,')} ${format(date, 'h:mma').toLowerCase()}`; // Include time
    case '1M':
    case '6M':
      return `${format(date, 'MMM d yyyy,')} ${format(date, 'h:mma').toLowerCase()}`; // Include time
    case '1Y':
      return `${format(date, 'MMM d yyyy,')} ${format(date, 'h:mma').toLowerCase()}`; // Include time
  }
}