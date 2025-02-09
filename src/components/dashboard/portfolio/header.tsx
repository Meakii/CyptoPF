import { CardTitle } from "@/components/ui/card";
import { TimeFrame, ChartTimeFrame } from "@/components/crypto/chart-timeframe";
import { cn } from "@/lib/utils";
import { HiddenFigure } from '@/components/ui/hide-figures';

interface PortfolioHeaderProps {
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  value: string;
  performanceAmount: string;
  performancePercentage: number;
}

export function PortfolioHeader({
  timeframe,
  onTimeframeChange,
  value,
  performanceAmount,
  performancePercentage,
}: PortfolioHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      {/* Left Column */}
      <div className="flex flex-col gap-1">
        {/* Title */}
        <CardTitle className="text-(--muted-foreground)">
          Portfolio value
        </CardTitle>

        {/* Value Display */}
        <div className="btcm-heading-xl text-(--foreground)">
          <HiddenFigure value={value} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-(--muted-foreground)">
            {timeframe} change
          </span>
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
      </div>
      <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
    </div>
  );
}