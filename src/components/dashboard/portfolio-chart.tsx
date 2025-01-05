import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TimeFrame } from "@/lib/types/timeframe";
import { PriceChart } from '@/components/crypto/price-chart';
import { PortfolioHeader } from './portfolio/header';
// import { ValueDisplay } from './portfolio/value-display';
// import { TimeFrame } from '@/components/crypto/chart-timeframe';

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
  const [isValueHidden, setIsValueHidden] = useState(false);

  return (
    <Card className="">
      <CardHeader className="space-y-0">
        <PortfolioHeader
          isValueHidden={isValueHidden}
          onToggleHide={() => setIsValueHidden(!isValueHidden)}
          timeframe={timeframe}
          onTimeframeChange={onTimeframeChange}
          value={portfolioValue}
          performanceAmount={performanceAmount}
          performancePercentage={performancePercentage}
        />
        {/* <ValueDisplay
          value={portfolioValue}
          isHidden={isValueHidden}
          timeframe={timeframe}
          performanceAmount={performanceAmount}
          performancePercentage={performancePercentage}
        /> */}
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <PriceChart
            symbol="BTCUSDT" // This will be replaced with portfolio data
            timeframe={timeframe}
            showTimeframeSelector={false} // Hide the timeframe selector
            onTimeframeChange={onTimeframeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}