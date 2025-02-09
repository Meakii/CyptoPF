import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TimeFrame } from "@/lib/types/timeframe";
import { PriceChart } from '@/components/crypto/price-chart';
import { PortfolioHeader } from './portfolio/header';

interface PortfolioChartProps {
  portfolioValue: string;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  performanceAmount: string;
  performancePercentage: number;
}

export function PortfolioChart({
  portfolioValue,
  timeframe,
  onTimeframeChange,
  performanceAmount,
  performancePercentage
}: PortfolioChartProps) {
  return (
    <Card className="h-[420px]">
      <CardHeader className="space-y-0">
        <PortfolioHeader
          timeframe={timeframe}
          onTimeframeChange={onTimeframeChange}
          value={portfolioValue}
          performanceAmount={performanceAmount}
          performancePercentage={performancePercentage}
        />
      </CardHeader>
      <CardContent>
        <div className="h-full">
          <PriceChart
            symbol="BTCUSDT" // This will be replaced with portfolio data
            timeframe={timeframe}
            showTimeframeSelector={false}
            onTimeframeChange={onTimeframeChange}
            showAxes={true}
          />
        </div>
      </CardContent>
    </Card>
  );
}