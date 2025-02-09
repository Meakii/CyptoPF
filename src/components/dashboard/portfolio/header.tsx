import { CardTitle } from "@/components/ui/card";
import { TimeFrame, ChartTimeFrame } from "@/components/crypto/chart-timeframe";
import { cn } from "@/lib/utils";

interface PortfolioHeaderProps {
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  performanceAmount: string;
  performancePercentage: number;
}

export function PortfolioHeader({
  timeframe,
  onTimeframeChange,
  performanceAmount,
  performancePercentage,
}: PortfolioHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-1",
            performancePercentage >= 0
              ? "text-[var(--uptrend-foreground)]"
              : "text-[var(--downtrend-foreground)]"
          )}
        >
          <span>{performanceAmount}</span>
          <span>
            ({performancePercentage >= 0 ? "+" : ""}
            {performancePercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
      <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
    </div>
  );
}