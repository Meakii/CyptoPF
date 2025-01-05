import { cn } from "@/lib/utils";
import { TimeFrame } from "@/components/crypto/chart-timeframe";

interface ValueDisplayProps {
  value: string;
  isHidden: boolean;
  timeframe: TimeFrame;
  performanceAmount: string;
  performancePercentage: number;
}

export function ValueDisplay({
  value,
  isHidden,
  timeframe,
  performanceAmount,
  performancePercentage
}: ValueDisplayProps) {
  return (
    <div className="mt-[-6px]">
      <div className="btcm-heading-xl">
        {isHidden ? '••••••' : value}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-(--muted-foreground)">
          {timeframe} change
        </span>
        <div className={cn(
          "flex items-center gap-1",
          performancePercentage >= 0 ? "text-(--uptrend-foreground)" : "text-(--downtrend-foreground)"
        )}>
          <span>{performanceAmount}</span>
          <span>({performancePercentage >= 0 ? '+' : '-'}{performancePercentage.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
  );
}