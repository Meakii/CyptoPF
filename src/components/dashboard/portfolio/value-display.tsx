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
    <div className="space-y-1">
      <div className="text-2xl font-bold">
        {isHidden ? '••••••' : value}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {timeframe} change
        </span>
        <div className={cn(
          "flex items-center gap-1",
          performancePercentage >= 0 ? "text-green-500" : "text-red-500"
        )}>
          <span>{performanceAmount}</span>
          <span>({performancePercentage >= 0 ? '+' : ''}{performancePercentage.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
  );
}