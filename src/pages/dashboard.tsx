import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { TimeFrame } from "@/components/crypto/chart-timeframe";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { HoldingsTable, Holding } from "@/components/dashboard/holdings-table";
import { PageTransition } from "@/components/layout/page-transition";
import { useAssetPrices } from "@/hooks/useAssetPrices";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { parseAndFormatCurrency, stripCurrencySymbols } from "@/lib/currency-utils";
import { StatsCard } from "@/components/dashboard/StatsCard";

const PORTFOLIO_HOLDINGS = [
  { symbol: "BTCUSDT", initialValue: 15000 },
  { symbol: "ETHUSDT", initialValue: 10500 },
  { symbol: "AVAXUSDT", initialValue: 6800 },
  { symbol: "SOLUSDT", initialValue: 4960 },
  { symbol: "LINKUSDT", initialValue: 4350 },
];

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

  // Calculate total portfolio value from the properly calculated holding values
  const totalValue = holdings.reduce((sum, holding) => {
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
          {/* Grid layout for Stats Cards and PortfolioChart */}
          <div className="grid grid-cols-12 gap-4">
            {/* Stats Cards Column */}
            <div className="col-span-3 space-y-4 grid grid-flow-col grid-rows-3">
              <StatsCard 
                icon={ArrowUpRight}
                label="24h Profit/Loss"
                value={parseAndFormatCurrency(1234.56)}
                info="Your total profit or loss over the last 24 hours across all assets"
              />
              <StatsCard 
                icon={ArrowDownRight}
                label="Total Invested"
                value={parseAndFormatCurrency(50000)}
                info="The total amount you've invested in cryptocurrency"
              />
              <StatsCard 
                icon={Wallet}
                label="Available Balance"
                value={parseAndFormatCurrency(2500)}
                info="Your current available balance for trading or withdrawals"
              />
            </div>

            {/* Chart Column */}
            <div className="col-span-9">
              <PortfolioChart
                portfolioValue={parseAndFormatCurrency(totalValue)}
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