import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, ISeriesApi, AreaData, CrosshairMode } from 'lightweight-charts';
import { ChartTimeFrame, TimeFrame } from './chart-timeframe';
import { getChartInterval } from '@/lib/chart-utils';
import { formatChartTime } from '@/lib/format-utils';

interface PriceChartProps {
  symbol: string;
}

export function PriceChart({ symbol }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const seriesRef = useRef<ISeriesApi<'Area'>>();
  const [timeframe, setTimeframe] = useState<TimeFrame>('1D');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.5)',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: false,
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          visible: false,
          labelVisible: false,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    chartRef.current = chart;

    // Create area series
    const areaSeries = chart.addAreaSeries({
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.05)',
      lineWidth: 2,
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
      lastValueVisible: false,
      priceLineVisible: false,
    });

    seriesRef.current = areaSeries;

    // Create and style the tooltip
    const toolTip = document.createElement('div');
    toolTip.className = 'px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-md border';
    toolTip.style.position = 'absolute';
    toolTip.style.display = 'none';
    toolTip.style.padding = '8px';
    toolTip.style.zIndex = '1000';
    toolTip.style.pointerEvents = 'none';
    chartContainerRef.current.appendChild(toolTip);
    tooltipRef.current = toolTip;

    // Update tooltip on crosshair move
    chart.subscribeCrosshairMove(param => {
      if (
        !param.point ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current!.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current!.clientHeight
      ) {
        toolTip.style.display = 'none';
        return;
      }

      const price = param.seriesData.get(areaSeries)?.value;
      if (typeof price !== 'number') {
        toolTip.style.display = 'none';
        return;
      }

      const dateStr = formatChartTime(param.time as number, timeframe);
      const priceStr = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
      }).format(price);

      toolTip.innerHTML = `
        <div class="text-sm font-medium">${dateStr}</div>
        <div class="text-muted-foreground text-xs">${priceStr}</div>
      `;

      const coordinate = areaSeries.priceToCoordinate(price);
      let toolTipWidth = 100;
      let toolTipHeight = 80;
      let left = param.point.x + 20;

      if (left > chartContainerRef.current!.clientWidth - toolTipWidth) {
        left = param.point.x - toolTipWidth - 20;
      }

      let top = coordinate! - toolTipHeight / 2;
      if (top < 0) {
        top = 0;
      } else if (top > chartContainerRef.current!.clientHeight - toolTipHeight) {
        top = chartContainerRef.current!.clientHeight - toolTipHeight;
      }

      toolTip.style.left = left + 'px';
      toolTip.style.top = top + 'px';
      toolTip.style.display = 'block';
    });

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [timeframe]);

  useEffect(() => {
    const fetchData = async () => {
      if (!seriesRef.current) return;

      const { binanceInterval, limit } = getChartInterval(timeframe);
      
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${binanceInterval}&limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const chartData: AreaData[] = data.map((d: any) => ({
          time: d[0] / 1000,
          value: parseFloat(d[4]), // Close price
        }));

        seriesRef.current.setData(chartData);
        chartRef.current?.timeScale().fitContent();
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };

    fetchData();
  }, [symbol, timeframe]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ChartTimeFrame value={timeframe} onValueChange={setTimeframe} />
      </div>
      <div className="relative min-w-[700px] w-full">
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
}