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
  showAxes?: boolean;
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
  height = "h-[240px]",
  className,
  showAxes,
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
      rightPriceScale: { 
        visible: showAxes ?? false,
        borderVisible: false,
      },
      leftPriceScale: { visible: false },
      timeScale: {
        visible: showAxes ?? false,
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
        timeVisible: true,
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
  }, [showAxes]);

  // Update chart data
  useEffect(() => {
    if (!seriesRef.current || !data) return;
    seriesRef.current.setData(data);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  return (
    <div className="space-y-4 z-0">
      {showTimeframeSelector && (
        <div className="flex justify-start">
          <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
        </div>
      )}
      <div
        className={cn(
          "relative w-full rounded-lg z-0",
          height,
          className,
          isLoading && "animate-pulse bg-muted"
        )}
      >
        <div ref={chartContainerRef} className="h-full w-full z-0" />
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