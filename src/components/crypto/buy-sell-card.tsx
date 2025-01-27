import { useState } from "react";
import {
  AnimatedTabs,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsContent,
} from "@/components/ui/animated-tabs";
import { CryptoSelector } from "./crypto-selector";
import { TimeFrame } from "./chart-timeframe";
import { cn } from "@/lib/utils";
import { PriceChart } from "./price-chart";
import { useCryptoPrice } from "@/hooks/useCryptoPrice";
import { Skeleton } from "@/components/ui/skeleton";

interface BuySellCardProps {
  symbol: string;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  currency?: string;
}

export function BuySellCard({
  symbol,
  timeframe,
  onTimeframeChange,
  // currency = ''
}: BuySellCardProps) {
  const [tab, setTab] = useState("buy");
  const { price, priceChange, isLoading, error } = useCryptoPrice(symbol, {
    // currency: currency
  });

  return (
    <div className="rounded-[var(--radius-sm)] border-[var(--border)] border bg-card">
      <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
        <AnimatedTabsList
          className="grid w-full grid-cols-2"
          variant="underlined"
          value={tab}
        >
          <AnimatedTabsTrigger value="buy" variant="underlined">
            Buy
          </AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="sell" variant="underlined">
            Sell
          </AnimatedTabsTrigger>
        </AnimatedTabsList>

        <div className="p-6">
          <AnimatedTabsContent
            value="buy"
            className="mt-0 space-y-4"
            tabIndex={0}
          >
            <div className="space-y-4">
              <CryptoSelector />

              <div className="flex items-center justify-between">
                {isLoading ? (
                  <Skeleton className="h-6 w-32" />
                ) : error ? (
                  <div className="text-sm text-destructive">
                    Failed to load price
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="btcm-heading-2xl text-[var(--foreground)]">
                      {price}
                    </span>
                    <div
                      className={cn(
                        "flex items-center justify-end",
                        priceChange >= 0
                          ? "text-[var(--uptrend-foreground)]"
                          : "text-[var(--downtrend-foreground)]"
                      )}
                    >
                      {priceChange >= 0 ? <span>+</span> : <span>-</span>}
                      {Math.abs(priceChange).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <PriceChart
                  symbol={symbol}
                  timeframe={timeframe}
                  height="h-[300px] md:h-[400px] lg:h-[128px]"
                  onTimeframeChange={onTimeframeChange}
                />
              </div>
            </div>
          </AnimatedTabsContent>

          <AnimatedTabsContent value="sell" className="mt-0">
            <div className="text-center text-muted-foreground">
              Sell functionality coming soon
            </div>
          </AnimatedTabsContent>
        </div>
      </AnimatedTabs>
    </div>
  );
}
