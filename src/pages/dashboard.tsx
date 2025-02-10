import { useState } from "react";
import {
  BriefcaseDollarIcon, MoneySecurityIcon, PieChartIcon
} from "hugeicons-react";
import { TimeFrame } from "@/components/crypto/chart-timeframe";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { HoldingsTable, Holding } from "@/components/dashboard/holdings-table";
import { PageTransition } from "@/components/layout/page-transition";
import { useAssetPrices } from "@/hooks/useAssetPrices";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { parseAndFormatCurrency, stripCurrencySymbols } from "@/lib/currency-utils";
import { StatsCard } from "@/components/dashboard/StatsCard";
// import { HiddenFigure } from '@/components/ui/hide-figures';

const PORTFOLIO_HOLDINGS = [
  { symbol: "BTCUSDT", initialValue: 15000 },
  { symbol: "ETHUSDT", initialValue: 10500 },
  { symbol: "AVAXUSDT", initialValue: 6800 },
  { symbol: "SOLUSDT", initialValue: 4960 },
  { symbol: "LINKUSDT", initialValue: 4350 },
];

// Cash available constant - used in both header and dashboard
export const CASH_AVAILABLE = 2500;

export function Dashboard() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1D");
  const { prices } = useAssetPrices();

  // Calculate current holdings based on latest prices with proper typing
  const holdings: Holding[] = PORTFOLIO_HOLDINGS.map((holding) => {
    const price = prices.find((p) => p.symbol === holding.symbol);
    if (!price) return null;

    const numericPrice = parseFloat(stripCurrencySymbols(price.price));
    const balance = holding.initialValue / numericPrice;
    const currentValue = balance * numericPrice;

    return {
      symbol: holding.symbol,
      balance,
      price: parseAndFormatCurrency(price.price),
      change: price.change,
      value: parseAndFormatCurrency(currentValue),
    };
  }).filter((holding): holding is Holding => holding !== null);

  // Calculate total portfolio value from the holdings
  const totalCryptoValue = holdings.reduce((sum, holding) => {
    return sum + parseFloat(stripCurrencySymbols(holding.value));
  }, 0);

  // Mock performance data - this should come from real data
  const performanceAmount = parseAndFormatCurrency(490.0);
  const performancePercentage = 1.85;

  return (
    <PageTransition>
      <div>
        <WelcomeBanner />

        <div className="mx-10 space-y-8">
          <div className="grid grid-cols-12 gap-4 h-[420px]">
            <div className="col-span-3 grid grid-rows-3 gap-4">
            <StatsCard 
                icon={BriefcaseDollarIcon}
                label="Portfolio value"
                value={parseAndFormatCurrency(totalCryptoValue + CASH_AVAILABLE)}
                info="Your total portfolio value across all assets"
              />
              <StatsCard 
                icon={MoneySecurityIcon}
                label="Cash available"
                value={parseAndFormatCurrency(CASH_AVAILABLE)}
                info="Your current available cash balance for trading"
              />
              <StatsCard 
                icon={PieChartIcon}
                label="Crypto holdings value"
                value={parseAndFormatCurrency(totalCryptoValue)}
                info="Total value of your cryptocurrency holdings"
              />
            </div>

            <div className="col-span-9">
              <PortfolioChart
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                performanceAmount={performanceAmount}
                performancePercentage={performancePercentage}
              />
            </div>
          </div>

          <HoldingsTable holdings={holdings} />
        </div>
      </div>
    </PageTransition>
  );
}