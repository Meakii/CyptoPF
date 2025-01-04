import { formatChartTime } from '@/lib/format-utils';
import { TimeFrame } from '../chart-timeframe';

interface ChartTooltipProps {
  time: number;
  price: number;
  timeframe: TimeFrame;
  style: React.CSSProperties;
}

export function ChartTooltip({ time, price, timeframe, style }: ChartTooltipProps) {
  const formattedTime = formatChartTime(time, timeframe);
  const formattedPrice = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(price);

  return (
    <div 
      className="absolute px-3 py-2 bg-(--popover) text-popover-foreground rounded-[var(--radius-sm)]  shadow-md border-[var(--muted-border)] border-1 pointer-events-none z-50"
      style={style}
    >
      <div className="text-sm font-medium">{formattedTime}</div>
      <div className="text-muted-foreground text-xs">{formattedPrice}</div>
    </div>
  );
}