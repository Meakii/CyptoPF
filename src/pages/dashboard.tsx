import { useState } from "react";
import { TimeFrame } from "@/components/crypto/chart-timeframe";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { HoldingsTable, Holding } from "@/components/dashboard/holdings-table";
import { PageTransition } from "@/components/layout/page-transition";
import { useAssetPrices } from "@/hooks/useAssetPrices";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";

const PORTFOLIO_HOLDINGS = [
  { symbol: "BTCUSDT", initialValue: 15000 },
  { symbol: "ETHUSDT", initialValue: 10500 },
  { symbol: "AVAXUSDT", initialValue: 6800 },
  { symbol: "SOLUSDT", initialValue: 4960 },
  { symbol: "LINKUSDT", initialValue: 4350 },
];

// Create a reusable formatter
const currencyFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export function Dashboard() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1D");
  const { prices } = useAssetPrices();

  // Calculate current holdings based on latest prices with proper typing
  const holdings: Holding[] = PORTFOLIO_HOLDINGS.map((holding) => {
    const price = prices.find((p) => p.symbol === holding.symbol);
    if (!price) return null;

    const numericPrice = parseFloat(price.price.replace(/[^0-9.-]+/g, ""));
    const balance = holding.initialValue / numericPrice;
    const currentValue = balance * numericPrice;

    return {
      symbol: holding.symbol,
      balance,
      price: price.price,
      change: price.change,
      value: currencyFormatter.format(currentValue),
    };
  }).filter((holding): holding is Holding => holding !== null);

  // Calculate total portfolio value from the properly calculated holding values
  const totalValue = holdings.reduce((sum, holding) => {
    return sum + parseFloat(holding.value.replace(/[^0-9.-]+/g, ""));
  }, 0);

  // Mock performance data - this should come from real data
  // Format these values consistently as well
  const performanceAmount = currencyFormatter.format(490.0);
  const performancePercentage = 1.85;

  return (
    <PageTransition>
      <div className="container space-y-8 p-8">
      <WelcomeBanner />

        <PortfolioChart
          portfolioValue={currencyFormatter.format(totalValue)}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          performanceAmount={performanceAmount}
          performancePercentage={performancePercentage}
        />
        <HoldingsTable holdings={holdings} />
      </div>
    </PageTransition>
  );
}