import { useState } from "react";
import {
  ChartLineData01Icon,
  // PieChartIcon,
  Wallet02Icon,
  DollarCircleIcon,
} from "hugeicons-react";
import { TimeFrame } from "@/components/crypto/chart-timeframe";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { HoldingsTable, Holding } from "@/components/dashboard/holdings-table";
import { PageTransition } from "@/components/layout/page-transition";
import { useAssetPrices } from "@/hooks/useAssetPrices";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import {
  parseAndFormatCurrency,
  stripCurrencySymbols,
} from "@/lib/currency-utils";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { HiddenFigure } from "@/components/ui/hide-figures";

const PORTFOLIO_HOLDINGS = [
  { symbol: "BTCUSDT", initialValue: 15000 },
  { symbol: "ETHUSDT", initialValue: 10500 },
  { symbol: "AVAXUSDT", initialValue: 6800 },
  { symbol: "SOLUSDT", initialValue: 4960 },
  { symbol: "LINKUSDT", initialValue: 4350 },
];

export const CASH_AVAILABLE = 2500;

export function Dashboard() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1D");
  const { prices } = useAssetPrices();

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
      unrealizedPnL: parseAndFormatCurrency("2254.24"),
    };
  }).filter((holding): holding is Holding => holding !== null);

  const totalCryptoValue = holdings.reduce((sum, holding) => {
    return sum + parseFloat(stripCurrencySymbols(holding.value));
  }, 0);

  const totalPortfolioValue = totalCryptoValue + CASH_AVAILABLE;
  const performanceAmount = parseAndFormatCurrency(490.0);
  const performancePercentage = 1.85;

  return (
    <PageTransition>
      <div>
        <WelcomeBanner />

        <div className="mx-10 space-y-8">
          <div className="flex flex-row gap-x-6 h-[420px]">
            <div className="min-w-[18rem] grid grid-rows-3 gap-4">
              <StatsCard
                icon={DollarCircleIcon}
                label="Cash available"
                value={
                  <HiddenFigure
                    value={parseAndFormatCurrency(CASH_AVAILABLE)}
                  />
                }
                info="Your current available cash balance for trading"
              />
              <StatsCard
                icon={Wallet02Icon}
                label="Crypto holdings value"
                value={
                  <HiddenFigure
                    value={parseAndFormatCurrency(totalCryptoValue)}
                  />
                }
                info="Total value of your cryptocurrency holdings"
              />
              <StatsCard
                icon={ChartLineData01Icon}
                label="Portfolio profit & loss"
                value={
                  <HiddenFigure
                    value={`+${parseAndFormatCurrency("2254.24")}`}
                  />
                }
                valueClassName="text-[var(--uptrend-foreground)]"
                info="Your total profit/loss across all holdings"
              />
            </div>

            <div className="w-full">
              <PortfolioChart
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                performanceAmount={performanceAmount}
                performancePercentage={performancePercentage}
                totalPortfolioValue={totalPortfolioValue}
              />
            </div>
          </div>

          <HoldingsTable holdings={holdings} />
        </div>
      </div>
    </PageTransition>
  );
}

// import { useState } from "react";
// import {
//   BriefcaseDollarIcon,
//   PieChartIcon,
//   DollarCircleIcon
// } from "hugeicons-react";
// import { TimeFrame } from "@/components/crypto/chart-timeframe";
// import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
// import { HoldingsTable, Holding } from "@/components/dashboard/holdings-table";
// import { PageTransition } from "@/components/layout/page-transition";
// import { useAssetPrices } from "@/hooks/useAssetPrices";
// import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
// import {
//   parseAndFormatCurrency,
//   stripCurrencySymbols,
// } from "@/lib/currency-utils";
// import { StatsCard } from "@/components/dashboard/StatsCard";
// // import { HiddenFigure } from '@/components/ui/hide-figures';

// const PORTFOLIO_HOLDINGS = [
//   { symbol: "BTCUSDT", initialValue: 15000 },
//   { symbol: "ETHUSDT", initialValue: 10500 },
//   { symbol: "AVAXUSDT", initialValue: 6800 },
//   { symbol: "SOLUSDT", initialValue: 4960 },
//   { symbol: "LINKUSDT", initialValue: 4350 },
// ];

// // Cash available constant - used in both header and dashboard
// export const CASH_AVAILABLE = 2500;

// export function Dashboard() {
//   const [timeframe, setTimeframe] = useState<TimeFrame>("1D");
//   const { prices } = useAssetPrices();

//   // Calculate current holdings based on latest prices with proper typing
//   const holdings: Holding[] = PORTFOLIO_HOLDINGS.map((holding) => {
//     const price = prices.find((p) => p.symbol === holding.symbol);
//     if (!price) return null;

//     const numericPrice = parseFloat(stripCurrencySymbols(price.price));
//     const balance = holding.initialValue / numericPrice;
//     const currentValue = balance * numericPrice;

//     return {
//       symbol: holding.symbol,
//       balance,
//       price: parseAndFormatCurrency(price.price),
//       change: price.change,
//       value: parseAndFormatCurrency(currentValue),
//     };
//   }).filter((holding): holding is Holding => holding !== null);

//   // Calculate total portfolio value from the holdings
//   const totalCryptoValue = holdings.reduce((sum, holding) => {
//     return sum + parseFloat(stripCurrencySymbols(holding.value));
//   }, 0);

//   // Mock performance data - this should come from real data
//   const performanceAmount = parseAndFormatCurrency(490.0);
//   const performancePercentage = 1.85;

//   return (
//     <PageTransition>
//       <div>
//         <WelcomeBanner />

//         <div className="mx-10 space-y-8  ">
//           <div className="flex flex-row gap-x-6 h-[420px]">
//             <div className="min-w-[18rem] grid grid-rows-3 gap-4">
//             <StatsCard
//                 icon={DollarCircleIcon}
//                 label="Cash available"
//                 value={parseAndFormatCurrency(CASH_AVAILABLE)}
//                 info="Your current available cash balance for trading"
//               />
//               <StatsCard
//                 icon={BriefcaseDollarIcon}
//                 label="Portfolio value"
//                 value={parseAndFormatCurrency(
//                   totalCryptoValue + CASH_AVAILABLE
//                 )}
//                 info="Your total portfolio value across all assets"
//               />
//               <StatsCard
//                 icon={PieChartIcon}
//                 label="Crypto holdings value"
//                 value={parseAndFormatCurrency(totalCryptoValue)}
//                 info="Total value of your cryptocurrency holdings"
//               />
//             </div>

//             <div className="w-full">
//               <PortfolioChart
//                 timeframe={timeframe}
//                 onTimeframeChange={setTimeframe}
//                 performanceAmount={performanceAmount}
//                 performancePercentage={performancePercentage}
//               />
//             </div>
//           </div>

//           <HoldingsTable holdings={holdings} />
//         </div>
//       </div>
//     </PageTransition>
//   );
// }
