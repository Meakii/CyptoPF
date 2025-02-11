import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TimeFrame } from "@/lib/types/timeframe";
import { PriceChart } from '@/components/crypto/price-chart';
import { PortfolioHeader } from './portfolio/header';
// import { LineChart } from 'lucide-react';
import {
  ChartLineData01Icon
} from "hugeicons-react";

interface PortfolioChartProps {
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  performanceAmount: string;
  performancePercentage: number;
}

export function PortfolioChart({
  timeframe,
  onTimeframeChange,
  performanceAmount,
  performancePercentage
}: PortfolioChartProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-none space-y-0">
        <div className="flex items-center gap-2 text-[var(--foreground)]">
          <ChartLineData01Icon className="h-5 w-5" />
          <h3 className="btcm-heading-lg text-[var(--foreground)]">Portfolio</h3>
        </div>
        <PortfolioHeader
          timeframe={timeframe}
          onTimeframeChange={onTimeframeChange}
          performanceAmount={performanceAmount}
          performancePercentage={performancePercentage}
        />
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