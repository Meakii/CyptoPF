import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimeFrame, ChartTimeFrame } from "@/components/crypto/chart-timeframe";
import { PriceChart } from "@/components/crypto/price-chart";
import { cn } from "@/lib/utils";
import { parseAndFormatCurrency } from "@/lib/currency-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InformationCircleIcon } from "hugeicons-react";
interface PortfolioChartProps {
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  performanceAmount: string;
  performancePercentage: number;
  totalPortfolioValue: number;
}

export function PortfolioChart({
  timeframe,
  onTimeframeChange,
  performanceAmount,
  performancePercentage,
  totalPortfolioValue,
}: PortfolioChartProps) {
  const isPositiveAmount = !performanceAmount.startsWith("-");
  const isPositivePercentage = performancePercentage >= 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[var(--foreground)]">
              <h3 className="btcm-label-sm text-[var(--muted-foreground)]">
                Total portfolio value
              </h3>
            </div>

            <div className="flex items-end gap-4">
              <div className="btcm-heading-xl text-[var(--foreground)]">
                {parseAndFormatCurrency(totalPortfolioValue)}
              </div>

              <div className="flex items-center gap-2 text-sm">
                {/* Timeframe Label */}
                <span className="text-[var(--muted-foreground)]">
                  {timeframe} change
                </span>

                {/* Divider */}
                <span className="text-[var(--border)]">|</span>

                {/* Performance Amount */}
                <span
                  className={cn(
                    "btcm-label-sm-semibold",
                    isPositiveAmount
                      ? "text-[var(--uptrend-foreground)]"
                      : "text-[var(--downtrend-foreground)]"
                  )}
                >
                  {isPositiveAmount ? "+" : "-"}
                  {performanceAmount.replace("-", "")}
                </span>

                {/* Divider */}
                <span className="text-[var(--border)]">|</span>

                {/* Performance Percentage */}
                <span
                  className={cn(
                    "btcm-label-sm",
                    isPositivePercentage
                      ? "text-[var(--uptrend-foreground)]"
                      : "text-[var(--downtrend-foreground)]"
                  )}
                >
                  {isPositivePercentage ? "+" : "-"}
                  {Math.abs(performancePercentage).toFixed(2)}%
                </span>

                {/* <TooltipProvider delayDuration={20}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground focus:text-foreground transition-colors">
                        <InformationCircleIcon className="h-4 w-4" />
                        <span className="sr-only">
                          More information about P&L
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The total value amount of your entire account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              </div>
            </div>
          </div>

          <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        <PriceChart
          symbol="BTCUSDT"
          timeframe={timeframe}
          showTimeframeSelector={false}
          onTimeframeChange={onTimeframeChange}
          showAxes={true}
          className="h-full"
        />
      </CardContent>
    </Card>
  );
}

// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { TimeFrame } from "@/lib/types/timeframe";
// import { PriceChart } from '@/components/crypto/price-chart';
// import { PortfolioHeader } from './portfolio/header';
// // import { LineChart } from 'lucide-react';
// import {
//   ChartLineData01Icon
// } from "hugeicons-react";

// interface PortfolioChartProps {
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
//   performanceAmount: string;
//   performancePercentage: number;
// }

// export function PortfolioChart({
//   timeframe,
//   onTimeframeChange,
//   performanceAmount,
//   performancePercentage
// }: PortfolioChartProps) {
//   return (
//     <Card className="h-full flex flex-col">
//       <CardHeader className="flex-none space-y-0">
//         <div className="flex items-center gap-2 text-[var(--foreground)]">
//           <ChartLineData01Icon className="h-5 w-5" />
//           <h3 className="btcm-heading-lg text-[var(--foreground)]">Portfolio</h3>
//         </div>
//         <PortfolioHeader
//           timeframe={timeframe}
//           onTimeframeChange={onTimeframeChange}
//           performanceAmount={performanceAmount}
//           performancePercentage={performancePercentage}
//         />
//       </CardHeader>
//       <CardContent className="flex-1 min-h-0">
//         <PriceChart
//           symbol="BTCUSDT"
//           timeframe={timeframe}
//           showTimeframeSelector={false}
//           onTimeframeChange={onTimeframeChange}
//           showAxes={true}
//           className="h-full"
//         />
//       </CardContent>
//     </Card>
//   );
// }
