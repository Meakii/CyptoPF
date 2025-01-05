import { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  ISeriesApi,
  CrosshairMode,
} from "lightweight-charts";
import { TimeFrame, ChartTimeFrame } from "./chart-timeframe";
import { ChartTooltip } from "./chart/tooltip";
import { useChartData } from "@/hooks/useChartData";
import { cn } from "@/lib/utils";

interface PriceChartProps {
  symbol: string;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  showTimeframeSelector?: boolean;
  height?: string;
  className?: string;
}

interface TooltipData {
  time: number;
  price: number;
  x: number;
  y: number;
}

export function PriceChart({
  symbol,
  timeframe,
  onTimeframeChange,
  showTimeframeSelector = true,
  height = "h-[400px]",
  className,
}: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const seriesRef = useRef<ISeriesApi<"Area">>();
  const resizeObserverRef = useRef<ResizeObserver>();
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const { data, isLoading, error } = useChartData(symbol, timeframe);

  // Initialize chart with dynamic height
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.5)",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      leftPriceScale: { visible: false },
      timeScale: {
        visible: false,
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { visible: false, labelVisible: false },
        horzLine: { visible: false, labelVisible: false },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    chartRef.current = chart;

    const areaSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.05)",
      lineWidth: 2,
      priceFormat: {
        type: "price",
        precision: 2,
        minMove: 0.01,
      },
      lastValueVisible: false,
      priceLineVisible: false,
    });

    seriesRef.current = areaSeries;

    // Handle tooltip
    chart.subscribeCrosshairMove((param) => {
      if (
        !param.point ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current!.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current!.clientHeight
      ) {
        setTooltip(null);
        return;
      }

      const price = param.seriesData.get(areaSeries)?.value;
      if (typeof price !== "number") {
        setTooltip(null);
        return;
      }

      setTooltip({
        time: param.time as number,
        price,
        x: param.point.x,
        y: param.point.y,
      });
    });

    // Set up ResizeObserver for container resizing
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({
        width,
        height,
      });
      chart.timeScale().fitContent();
    });

    resizeObserver.observe(chartContainerRef.current);
    resizeObserverRef.current = resizeObserver;

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, []);

  // Update chart data
  useEffect(() => {
    if (!seriesRef.current || !data) return;
    seriesRef.current.setData(data);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  return (
    <div className="space-y-4">
      {showTimeframeSelector && (
        <div className="flex justify-start">
          <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
        </div>
      )}
      <div
        className={cn(
          "relative w-full rounded-lg",
          height,
          className,
          isLoading && "animate-pulse bg-muted"
        )}
      >
        <div ref={chartContainerRef} className="h-full w-full" />
        {tooltip && (
          <ChartTooltip
            time={tooltip.time}
            price={tooltip.price}
            timeframe={timeframe}
            style={{
              left: tooltip.x + "px",
              top: tooltip.y + "px",
              transform: "translate(-50%, -100%)",
            }}
          />
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
            Failed to load chart data
          </div>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useRef, useState } from "react";
// import {
//   createChart,
//   ColorType,
//   ISeriesApi,
//   CrosshairMode,
// } from "lightweight-charts";
// import { TimeFrame, ChartTimeFrame } from "./chart-timeframe";
// import { ChartTooltip } from "./chart/tooltip";
// import { useChartData } from "@/hooks/useChartData";
// import { cn } from "@/lib/utils";

// interface PriceChartProps {
//   symbol: string;
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
//   showTimeframeSelector?: boolean;
//   height?: string; // Tailwind height class
//   className?: string; // Additional classes for the container
// }

// interface TooltipData {
//   time: number;
//   price: number;
//   x: number;
//   y: number;
// }

// export function PriceChart({
//   symbol,
//   timeframe,
//   onTimeframeChange,
//   showTimeframeSelector = true,
//   height = "h-[400px]", // Default height
//   className,
// }: PriceChartProps) {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<ReturnType<typeof createChart>>();
//   const seriesRef = useRef<ISeriesApi<"Area">>();
//   const [tooltip, setTooltip] = useState<TooltipData | null>(null);
//   const { data, isLoading, error } = useChartData(symbol, timeframe);

//   // Initialize chart with dynamic height
//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     const chart = createChart(chartContainerRef.current, {
//       layout: {
//         background: { type: ColorType.Solid, color: "transparent" },
//         textColor: "rgba(255, 255, 255, 0.5)",
//       },
//       grid: {
//         vertLines: { visible: false },
//         horzLines: { visible: false },
//       },
//       rightPriceScale: { visible: false },
//       leftPriceScale: { visible: false },
//       timeScale: {
//         visible: false,
//         borderVisible: false,
//         fixLeftEdge: true,
//         fixRightEdge: true,
//       },
//       crosshair: {
//         mode: CrosshairMode.Normal,
//         vertLine: { visible: false, labelVisible: false },
//         horzLine: { visible: false, labelVisible: false },
//       },
//       width: chartContainerRef.current.clientWidth,
//       height: chartContainerRef.current.clientHeight,
//     });

//     chartRef.current = chart;

//     const areaSeries = chart.addAreaSeries({
//       lineColor: "#2962FF",
//       topColor: "#2962FF",
//       bottomColor: "rgba(41, 98, 255, 0.05)",
//       lineWidth: 2,
//       priceFormat: {
//         type: "price",
//         precision: 2,
//         minMove: 0.01,
//       },
//       lastValueVisible: false,
//       priceLineVisible: false,
//     });

//     seriesRef.current = areaSeries;

//     // Handle tooltip
//     chart.subscribeCrosshairMove((param) => {
//       if (
//         !param.point ||
//         !param.time ||
//         param.point.x < 0 ||
//         param.point.x > chartContainerRef.current!.clientWidth ||
//         param.point.y < 0 ||
//         param.point.y > chartContainerRef.current!.clientHeight
//       ) {
//         setTooltip(null);
//         return;
//       }

//       const price = param.seriesData.get(areaSeries)?.value;
//       if (typeof price !== "number") {
//         setTooltip(null);
//         return;
//       }

//       setTooltip({
//         time: param.time as number,
//         price,
//         x: param.point.x,
//         y: param.point.y,
//       });
//     });

//     // Handle resize
//     const handleResize = () => {
//       if (chartContainerRef.current) {
//         chart.applyOptions({
//           width: chartContainerRef.current.clientWidth,
//           height: chartContainerRef.current.clientHeight,
//         });
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       chart.remove();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Update chart data
//   useEffect(() => {
//     if (!seriesRef.current || !data) return;
//     seriesRef.current.setData(data);
//     chartRef.current?.timeScale().fitContent();
//   }, [data]);

//   return (
//     <div className="space-y-4">
//       {showTimeframeSelector && (
//         <div className="flex justify-start">
//           <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
//         </div>
//       )}
//       <div
//         className={cn(
//           "relative w-full rounded-lg",
//           height, // Apply the height class
//           className, // Apply any additional classes
//           isLoading && "animate-pulse bg-muted"
//         )}
//       >
//         <div ref={chartContainerRef} className="h-full w-full" />
//         {tooltip && (
//           <ChartTooltip
//             time={tooltip.time}
//             price={tooltip.price}
//             timeframe={timeframe}
//             style={{
//               left: tooltip.x + "px",
//               top: tooltip.y + "px",
//               transform: "translate(-50%, -100%)",
//             }}
//           />
//         )}
//         {error && (
//           <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
//             Failed to load chart data
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import {  createChart,  ColorType,  ISeriesApi,  CrosshairMode,} from "lightweight-charts";
// import { TimeFrame, ChartTimeFrame } from "./chart-timeframe";
// import { ChartTooltip } from "./chart/tooltip";
// import { useChartData } from "@/hooks/useChartData";
// import { cn } from "@/lib/utils";

// interface PriceChartProps {
//   symbol: string;
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
//   showTimeframeSelector?: boolean;
// }

// interface TooltipData {
//   time: number;
//   price: number;
//   x: number;
//   y: number;
// }

// export function PriceChart({
//   symbol,
//   timeframe,
//   onTimeframeChange,
//   showTimeframeSelector = true,
// }: PriceChartProps) {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<ReturnType<typeof createChart>>();
//   const seriesRef = useRef<ISeriesApi<"Area">>();
//   const [tooltip, setTooltip] = useState<TooltipData | null>(null);
//   const { data, isLoading, error } = useChartData(symbol, timeframe);

//   // Initialize chart
//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     const chart = createChart(chartContainerRef.current, {
//       layout: {
//         background: { type: ColorType.Solid, color: "transparent" },
//         textColor: "rgba(255, 255, 255, 0.5)",
//       },
//       grid: {
//         vertLines: { visible: false },
//         horzLines: { visible: false },
//       },
//       rightPriceScale: { visible: false },
//       leftPriceScale: { visible: false },
//       timeScale: {
//         visible: false,
//         borderVisible: false,
//         fixLeftEdge: true,
//         fixRightEdge: true,
//       },
//       crosshair: {
//         mode: CrosshairMode.Normal,
//         vertLine: { visible: false, labelVisible: false },
//         horzLine: { visible: false, labelVisible: false },
//       },
//       width: chartContainerRef.current.clientWidth,
//       height: 400,
//     });

//     chartRef.current = chart;

//     const areaSeries = chart.addAreaSeries({
//       lineColor: "#2962FF",
//       topColor: "#2962FF",
//       bottomColor: "rgba(41, 98, 255, 0.05)",
//       lineWidth: 2,
//       priceFormat: {
//         type: "price",
//         precision: 2,
//         minMove: 0.01,
//       },
//       lastValueVisible: false,
//       priceLineVisible: false,
//     });

//     seriesRef.current = areaSeries;

//     // Handle tooltip
//     chart.subscribeCrosshairMove((param) => {
//       if (
//         !param.point ||
//         !param.time ||
//         param.point.x < 0 ||
//         param.point.x > chartContainerRef.current!.clientWidth ||
//         param.point.y < 0 ||
//         param.point.y > chartContainerRef.current!.clientHeight
//       ) {
//         setTooltip(null);
//         return;
//       }

//       const price = param.seriesData.get(areaSeries)?.value;
//       if (typeof price !== "number") {
//         setTooltip(null);
//         return;
//       }

//       setTooltip({
//         time: param.time as number,
//         price,
//         x: param.point.x,
//         y: param.point.y,
//       });
//     });

//     // Handle resize
//     const handleResize = () => {
//       if (chartContainerRef.current) {
//         chart.applyOptions({
//           width: chartContainerRef.current.clientWidth,
//         });
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       chart.remove();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Update chart data
//   useEffect(() => {
//     if (!seriesRef.current || !data) return;
//     seriesRef.current.setData(data);
//     chartRef.current?.timeScale().fitContent();
//   }, [data]);

//   return (
//     <div className="space-y-4">
//       {showTimeframeSelector && (
//         <div className="flex justify-start">
//           <ChartTimeFrame
//             value={timeframe}
//             onValueChange={onTimeframeChange}
//           />
//         </div>
//       )}
//       <div
//         className={cn(
//           "relative min-h-[400px] w-full rounded-lg",
//           isLoading && "animate-pulse bg-muted"
//         )}
//       >
//         <div ref={chartContainerRef} className="w-full" />
//         {tooltip && (
//           <ChartTooltip
//             time={tooltip.time}
//             price={tooltip.price}
//             timeframe={timeframe}
//             style={{
//               left: tooltip.x + "px",
//               top: tooltip.y + "px",
//               transform: "translate(-50%, -100%)",
//             }}
//           />
//         )}
//         {error && (
//           <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
//             Failed to load chart data
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // import { useEffect, useRef, useState } from "react";
// // import {
// //   createChart,
// //   ColorType,
// //   ISeriesApi,
// //   CrosshairMode,
// // } from "lightweight-charts";
// // import { TimeFrame } from "./chart-timeframe";
// // import { ChartTooltip } from "./chart/tooltip";
// // import { TimeFrameSelector } from "./chart/timeframe-selector";
// // import { useChartData } from "@/hooks/useChartData";
// // import { cn } from "@/lib/utils";

// // interface PriceChartProps {
// //   symbol: string;
// //   timeframe: TimeFrame;
// //   onTimeframeChange: (timeframe: TimeFrame) => void;
// //   showTimeframeSelector?: boolean;
// // }

// // interface TooltipData {
// //   time: number;
// //   price: number;
// //   x: number;
// //   y: number;
// // }

// // export function PriceChart({
// //   symbol,
// //   timeframe,
// //   onTimeframeChange,
// //   showTimeframeSelector = true, // Default to true for backward compatibility
// // }: PriceChartProps) {
// //   const chartContainerRef = useRef<HTMLDivElement>(null);
// //   const chartRef = useRef<ReturnType<typeof createChart>>();
// //   const seriesRef = useRef<ISeriesApi<"Area">>();
// //   const [tooltip, setTooltip] = useState<TooltipData | null>(null);
// //   const { data, isLoading, error } = useChartData(symbol, timeframe);

// //   // Initialize chart
// //   useEffect(() => {
// //     if (!chartContainerRef.current) return;

// //     const chart = createChart(chartContainerRef.current, {
// //       layout: {
// //         background: { type: ColorType.Solid, color: "transparent" },
// //         textColor: "rgba(255, 255, 255, 0.5)",
// //       },
// //       grid: {
// //         vertLines: { visible: false },
// //         horzLines: { visible: false },
// //       },
// //       rightPriceScale: { visible: false },
// //       leftPriceScale: { visible: false },
// //       timeScale: {
// //         visible: false,
// //         borderVisible: false,
// //         fixLeftEdge: true,
// //         fixRightEdge: true,
// //       },
// //       crosshair: {
// //         mode: CrosshairMode.Normal,
// //         vertLine: { visible: false, labelVisible: false },
// //         horzLine: { visible: false, labelVisible: false },
// //       },
// //       width: chartContainerRef.current.clientWidth,
// //       height: 400,
// //     });

// //     chartRef.current = chart;

// //     const areaSeries = chart.addAreaSeries({
// //       lineColor: "#2962FF",
// //       topColor: "#2962FF",
// //       bottomColor: "rgba(41, 98, 255, 0.05)",
// //       lineWidth: 2,
// //       priceFormat: {
// //         type: "price",
// //         precision: 2,
// //         minMove: 0.01,
// //       },
// //       lastValueVisible: false,
// //       priceLineVisible: false,
// //     });

// //     seriesRef.current = areaSeries;

// //     // Handle tooltip
// //     chart.subscribeCrosshairMove((param) => {
// //       if (
// //         !param.point ||
// //         !param.time ||
// //         param.point.x < 0 ||
// //         param.point.x > chartContainerRef.current!.clientWidth ||
// //         param.point.y < 0 ||
// //         param.point.y > chartContainerRef.current!.clientHeight
// //       ) {
// //         setTooltip(null);
// //         return;
// //       }

// //       const price = param.seriesData.get(areaSeries)?.value;
// //       if (typeof price !== "number") {
// //         setTooltip(null);
// //         return;
// //       }

// //       setTooltip({
// //         time: param.time as number,
// //         price,
// //         x: param.point.x,
// //         y: param.point.y,
// //       });
// //     });

// //     // Handle resize
// //     const handleResize = () => {
// //       if (chartContainerRef.current) {
// //         chart.applyOptions({
// //           width: chartContainerRef.current.clientWidth,
// //         });
// //       }
// //     };

// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       chart.remove();
// //       window.removeEventListener("resize", handleResize);
// //     };
// //   }, []);

// //   // Update chart data
// //   useEffect(() => {
// //     if (!seriesRef.current || !data) return;
// //     seriesRef.current.setData(data);
// //     chartRef.current?.timeScale().fitContent();
// //   }, [data]);

// //   return (
// //     <div className="space-y-4">
// //       {showTimeframeSelector && (
// //         <div className="flex justify-end">
// //           <TimeFrameSelector
// //             value={timeframe}
// //             onValueChange={onTimeframeChange}
// //           />
// //         </div>
// //       )}
// //       <div
// //         className={cn(
// //           "relative min-h-[400px] w-full rounded-lg",
// //           isLoading && "animate-pulse bg-muted"
// //         )}
// //       >
// //         <div ref={chartContainerRef} className="w-full" />
// //         {tooltip && (
// //           <ChartTooltip
// //             time={tooltip.time}
// //             price={tooltip.price}
// //             timeframe={timeframe}
// //             style={{
// //               left: tooltip.x + "px",
// //               top: tooltip.y + "px",
// //               transform: "translate(-50%, -100%)",
// //             }}
// //           />
// //         )}
// //         {error && (
// //           <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
// //             Failed to load chart data
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useEffect, useRef, useState } from 'react';
// // import { createChart, ColorType, ISeriesApi, CrosshairMode } from 'lightweight-charts';
// // import { TimeFrame } from './chart-timeframe';
// // import { ChartTooltip } from './chart/tooltip';
// // import { TimeFrameSelector } from './chart/timeframe-selector';
// // import { useChartData } from '@/hooks/useChartData';
// // import { cn } from '@/lib/utils';

// // interface PriceChartProps {
// //   symbol: string;
// //   timeframe: TimeFrame;
// //   onTimeframeChange: (timeframe: TimeFrame) => void;
// // }

// // interface TooltipData {
// //   time: number;
// //   price: number;
// //   x: number;
// //   y: number;
// // }

// // export function PriceChart({ symbol, timeframe, onTimeframeChange }: PriceChartProps) {
// //   const chartContainerRef = useRef<HTMLDivElement>(null);
// //   const chartRef = useRef<ReturnType<typeof createChart>>();
// //   const seriesRef = useRef<ISeriesApi<'Area'>>();
// //   const [tooltip, setTooltip] = useState<TooltipData | null>(null);
// //   const { data, isLoading, error } = useChartData(symbol, timeframe);

// //   // Initialize chart
// //   useEffect(() => {
// //     if (!chartContainerRef.current) return;

// //     const chart = createChart(chartContainerRef.current, {
// //       layout: {
// //         background: { type: ColorType.Solid, color: 'transparent' },
// //         textColor: 'rgba(255, 255, 255, 0.5)',
// //       },
// //       grid: {
// //         vertLines: { visible: false },
// //         horzLines: { visible: false },
// //       },
// //       rightPriceScale: { visible: false },
// //       leftPriceScale: { visible: false },
// //       timeScale: {
// //         visible: false,
// //         borderVisible: false,
// //         fixLeftEdge: true,
// //         fixRightEdge: true,
// //       },
// //       crosshair: {
// //         mode: CrosshairMode.Normal,
// //         vertLine: { visible: false, labelVisible: false },
// //         horzLine: { visible: false, labelVisible: false },
// //       },
// //       width: chartContainerRef.current.clientWidth,
// //       height: 400,
// //     });

// //     chartRef.current = chart;

// //     const areaSeries = chart.addAreaSeries({
// //       lineColor: '#2962FF',
// //       topColor: '#2962FF',
// //       bottomColor: 'rgba(41, 98, 255, 0.05)',
// //       lineWidth: 2,
// //       priceFormat: {
// //         type: 'price',
// //         precision: 2,
// //         minMove: 0.01,
// //       },
// //       lastValueVisible: false,
// //       priceLineVisible: false,
// //     });

// //     seriesRef.current = areaSeries;

// //     // Handle tooltip
// //     chart.subscribeCrosshairMove(param => {
// //       if (
// //         !param.point ||
// //         !param.time ||
// //         param.point.x < 0 ||
// //         param.point.x > chartContainerRef.current!.clientWidth ||
// //         param.point.y < 0 ||
// //         param.point.y > chartContainerRef.current!.clientHeight
// //       ) {
// //         setTooltip(null);
// //         return;
// //       }

// //       const price = param.seriesData.get(areaSeries)?.value;
// //       if (typeof price !== 'number') {
// //         setTooltip(null);
// //         return;
// //       }

// //       setTooltip({
// //         time: param.time as number,
// //         price,
// //         x: param.point.x,
// //         y: param.point.y,
// //       });
// //     });

// //     // Handle resize
// //     const handleResize = () => {
// //       if (chartContainerRef.current) {
// //         chart.applyOptions({
// //           width: chartContainerRef.current.clientWidth
// //         });
// //       }
// //     };

// //     window.addEventListener('resize', handleResize);

// //     return () => {
// //       chart.remove();
// //       window.removeEventListener('resize', handleResize);
// //     };
// //   }, []);

// //   // Update chart data
// //   useEffect(() => {
// //     if (!seriesRef.current || !data) return;
// //     seriesRef.current.setData(data);
// //     chartRef.current?.timeScale().fitContent();
// //   }, [data]);

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex justify-end">
// //         <TimeFrameSelector value={timeframe} onValueChange={onTimeframeChange} />
// //       </div>
// //       <div className={cn(
// //         "relative min-h-[400px] w-full rounded-lg",
// //         isLoading && "animate-pulse bg-muted"
// //       )}>
// //         <div ref={chartContainerRef} className="w-full" />
// //         {tooltip && (
// //           <ChartTooltip
// //             time={tooltip.time}
// //             price={tooltip.price}
// //             timeframe={timeframe}
// //             style={{
// //               left: tooltip.x + 'px',
// //               top: tooltip.y + 'px',
// //               transform: 'translate(-50%, -100%)',
// //             }}
// //           />
// //         )}
// //         {error && (
// //           <div className="absolute inset-0 flex items-center justify-center text-sm text-destructive">
// //             Failed to load chart data
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
