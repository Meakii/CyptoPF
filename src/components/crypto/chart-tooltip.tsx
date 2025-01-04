import { TimeFrame } from "./chart-timeframe";

interface ChartTooltipProps {
  time: number;
  price: number;
  timeframe: TimeFrame;
  style: React.CSSProperties;
}

export function ChartTooltip({ time, price, timeframe, style }: ChartTooltipProps) {
  const formattedTime = new Date(time * 1000).toLocaleString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    ...(timeframe !== '1D' && {
      day: 'numeric',
      month: 'short',
    }),
  });

  const formattedPrice = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(price);

  return (
    <div 
      className="absolute px-3 py-2 bg-(--popover) text-popover-foreground rounded-[var(--radius-sm)] shadow-md border-[var(--muted-border)] pointer-events-none z-50"
      style={style}
    >
      <div className="text-sm font-medium">{formattedTime}</div>
      <div className="text-muted-foreground text-xs">{formattedPrice}</div>
    </div>
  );
}