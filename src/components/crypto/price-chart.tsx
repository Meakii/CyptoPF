import { useEffect, useState, useMemo } from "react";
import { TimeFrame, ChartTimeFrame } from "./chart-timeframe";
import { useChartData } from "@/hooks/useChartData";
import { cn } from "@/lib/utils";
import { formatTimeLabel, formatTooltipTime } from "@/lib/chart-utils";
import { formatCompactCurrency } from "@/lib/currency-utils";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PriceChartProps {
  symbol: string;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  showTimeframeSelector?: boolean;
  height?: string;
  className?: string;
  showAxes?: boolean;
}

interface ChartDataPoint {
  time: number;
  value: number;
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    value: number;
    payload: ChartDataPoint;
  }[];
  label?: string | number;
  timeframe: TimeFrame;
};

const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 2 ? 4 : 2,
    maximumFractionDigits: value < 2 ? 4 : 2,
  });
  return formatter.format(value);
};

const formatYAxisTick = (value: number): string => {
  if (value >= 1000) {
    return formatCompactCurrency(value);
  }
  return formatCurrency(value);
};

const CustomTooltip = ({
  active,
  payload,
  label,
  timeframe,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="px-3 py-2 bg-[var(--popover)] text-[var(--popover-foreground)] rounded-[var(--radius-sm)] shadow-md border-[var(--border)] border">
      <div className="text-[var(--foreground)] btcm-label-sm">
        {formatCurrency(payload[0].value)}
      </div>
      <div className="text-[var(--muted-foreground)] btcm-label-sm">
        {formatTooltipTime(Number(label), timeframe)}
      </div>
    </div>
  );
};

export function PriceChart({
  symbol,
  timeframe,
  onTimeframeChange,
  showTimeframeSelector = true,
  height = "100%",
  className,
  showAxes = false,
}: PriceChartProps) {
  const { data, isLoading, error } = useChartData(symbol, timeframe);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  const yDomain = useMemo(() => {
    if (!data?.length) return [0, 0];

    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;
    
    const paddingFactor = 0.05;
    const topPadding = range * paddingFactor;
    const bottomPadding = range * paddingFactor;

    return [
      Math.max(0, minValue - bottomPadding),
      maxValue + topPadding,
    ];
  }, [data]);

  const yAxisTicks = useMemo(() => {
    if (!data?.length) return [];

    const [min, max] = yDomain;
    const range = max - min;

    const tickPaddingFactor = 0.1;
    const tickMin = min + (range * tickPaddingFactor);
    const tickMax = max - (range * tickPaddingFactor);
    const tickRange = tickMax - tickMin;

    return Array.from({ length: 5 }, (_, i) => tickMin + (tickRange * (i / 4)));
  }, [data, yDomain]);

  useEffect(() => {
    if (data) {
      setChartData(
        data.map((d) => ({
          time: d.time,
          value: d.value,
        }))
      );
    }
  }, [data]);

  return (
    <div className="h-full w-full flex flex-col">
      {showTimeframeSelector && (
        <div className="flex justify-start mb-4">
          <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
        </div>
      )}
      <div
        className={cn("relative flex-1 w-full", className)}
        style={{ height: showTimeframeSelector ? "calc(100% - 48px)" : height }}
      >
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
            Failed to load chart data
          </div>
        ) : isLoading ? (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              className="min-w-full flex flex-col justify-between gap-x-4"
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2962FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2962FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tickFormatter={(time) => formatTimeLabel(time, timeframe)}
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                minTickGap={50}
                dy={10}
                hide={!showAxes}
              />
              <YAxis
                orientation="right"
                domain={yDomain}
                ticks={yAxisTicks}
                tickFormatter={formatYAxisTick}
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={true}
                axisLine={false}
                width={60}
                dx={0}
                tick
                tickMargin={8}
                minTickGap={8}
                hide={!showAxes}
              />
              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload as { value: number; payload: ChartDataPoint }[]}
                    label={label}
                    timeframe={timeframe}
                  />
                )}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2962FF"
                strokeWidth={2}
                fill="url(#colorValue)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState, useMemo } from "react";
// import { TimeFrame, ChartTimeFrame } from "./chart-timeframe";
// import { useChartData } from "@/hooks/useChartData";
// import { cn } from "@/lib/utils";
// import { formatTimeLabel, formatTooltipTime } from "@/lib/chart-utils";
// import { parseAndFormatCurrency } from "@/lib/currency-utils";
// import {
//   Area,
//   AreaChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// interface PriceChartProps {
//   symbol: string;
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
//   showTimeframeSelector?: boolean;
//   height?: string;
//   className?: string;
//   showAxes?: boolean;
// }

// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: Array<{ value: number; }>;
//   label?: number;
//   timeframe: TimeFrame;
// }

// const CustomTooltip = ({ active, payload, label, timeframe }: CustomTooltipProps) => {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="px-3 py-2 bg-[var(--popover)] text-[var(--popover-foreground)] rounded-[var(--radius-sm)] shadow-md border-[var(--border)] border">
//       <div className="text-sm font-medium">
//         {formatTooltipTime(label, timeframe)}
//       </div>
//       <div className="text-muted-foreground text-xs">
//         {parseAndFormatCurrency(payload[0].value)}
//       </div>
//     </div>
//   );
// };

// function formatYAxisTick(value: number) {
//   return parseAndFormatCurrency(value, undefined, value < 1 ? 4 : 2);
// }

// export function PriceChart({
//   symbol,
//   timeframe,
//   onTimeframeChange,
//   showTimeframeSelector = true,
//   height = "100%",
//   className,
//   showAxes = false,
// }: PriceChartProps) {
//   const { data, isLoading, error } = useChartData(symbol, timeframe);
//   const [chartData, setChartData] = useState<any[]>([]);

//   // Calculate domain with 1% padding
//   const yDomain = useMemo(() => {
//     if (!data?.length) return [0, 0];

//     const values = data.map(d => d.value);
//     const minValue = Math.min(...values);
//     const maxValue = Math.max(...values);
//     const padding = (maxValue - minValue) * 0.01;

//     return [
//       Math.max(0, minValue - padding), // Don't go below 0
//       maxValue + padding
//     ];
//   }, [data]);

//   // Calculate y-axis ticks
//   const yAxisTicks = useMemo(() => {
//     if (!data?.length) return [];

//     const [min, max] = yDomain;
//     const range = max - min;
//     const step = range / 4;

//     return Array.from({ length: 5 }, (_, i) => min + (step * i));
//   }, [data, yDomain]);

//   useEffect(() => {
//     if (data) {
//       setChartData(data.map(d => ({
//         time: d.time,
//         value: d.value
//       })));
//     }
//   }, [data]);

//   return (
//     <div className="h-full w-full flex flex-col">
//       {showTimeframeSelector && (
//         <div className="flex justify-start mb-4">
//           <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
//         </div>
//       )}
//       <div className={cn("relative flex-1 w-full", className)} style={{ height: showTimeframeSelector ? 'calc(100% - 48px)' : height }}>
//         {error ? (
//           <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
//             Failed to load chart data
//           </div>
//         ) : isLoading ? (
//           <div className="absolute inset-0 animate-pulse bg-muted" />
//         ) : (
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={chartData} margin={{ top: 10, right: showAxes ? 16 : 0, left: 0, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#2962FF" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#2962FF" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               {showAxes && (
//                 <>
//                   <XAxis
//                     dataKey="time"
//                     tickFormatter={(time) => formatTimeLabel(time, timeframe)}
//                     stroke="var(--muted-foreground)"
//                     fontSize={12}
//                     tickLine={false}
//                     axisLine={false}
//                     minTickGap={50}
//                     dy={10}
//                   />
//                   <YAxis
//                     orientation="right"
//                     domain={yDomain}
//                     ticks={yAxisTicks}
//                     tickFormatter={formatYAxisTick}
//                     stroke="var(--muted-foreground)"
//                     fontSize={12}
//                     tickLine={false}
//                     axisLine={false}
//                     width={80}
//                     dx={-8}
//                   />
//                 </>
//               )}
//               <Tooltip
//                 content={({ active, payload, label }) => (
//                   <CustomTooltip
//                     active={active}
//                     payload={payload}
//                     label={label}
//                     timeframe={timeframe}
//                   />
//                 )}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#2962FF"
//                 strokeWidth={2}
//                 fill="url(#colorValue)"
//                 isAnimationActive={false}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// }
