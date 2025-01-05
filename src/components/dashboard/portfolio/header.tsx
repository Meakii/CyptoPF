import { CardTitle } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { TimeFrame, ChartTimeFrame } from "@/components/crypto/chart-timeframe";
import { cn } from "@/lib/utils";

interface PortfolioHeaderProps {
  isValueHidden: boolean;
  onToggleHide: () => void;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  value: string;
  performanceAmount: string;
  performancePercentage: number;
}

export function PortfolioHeader({
  isValueHidden,
  onToggleHide,
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
        {/* Title and Icon Button */}
        <div className="flex items-center gap-1">
          <CardTitle className="text-(--muted-foreground)">
            Portfolio value
          </CardTitle>
          <IconButton
            icon={isValueHidden ? ViewIcon : ViewOffSlashIcon}
            onClick={onToggleHide}
            className="h-6 w-6"
            aria-label={
              isValueHidden ? "Show portfolio value" : "Hide portfolio value"
            }
          />
        </div>

        {/* Value Display */}
          <div className="btcm-heading-xl text-(--foreground)">
            {isValueHidden ? "••••••" : value}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-(--muted-foreground)">
              {timeframe} change
            </span>
            <div
              className={cn(
                "flex items-center gap-1",
                performancePercentage >= 0
                  ? "text-(--uptrend-foreground)"
                  : "text-(--downtrend-foreground)"
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


// import { CardTitle } from "@/components/ui/card";
// import { IconButton } from "@/components/ui/icon-button";
// import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
// import { TimeFrame, ChartTimeFrame } from "@/components/crypto/chart-timeframe";

// interface PortfolioHeaderProps {
//   isValueHidden: boolean;
//   onToggleHide: () => void;
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
// }

// export function PortfolioHeader({
//   isValueHidden,
//   onToggleHide,
//   timeframe,
//   onTimeframeChange,
// }: PortfolioHeaderProps) {
//   return (
//     <div className="flex justify-between">
//         <div className="flex gap-x-1 items-center">
//           <CardTitle className="text-(--muted-foreground) gap-x-2">
//             Portfolio value
//           </CardTitle>
//           <IconButton
//             icon={isValueHidden ? ViewIcon : ViewOffSlashIcon}
//             onClick={onToggleHide}
//             className="h-6 w-6"
//             aria-label={
//               isValueHidden ? "Show portfolio value" : "Hide portfolio value"
//             }
//           />
//         </div>
//       <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
//     </div>
//   );
// }
