import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CryptoSelector } from './crypto-selector';
import { TimeFrame } from './chart-timeframe';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { PriceChart } from './price-chart';
import { useCryptoPrice } from '@/hooks/useCryptoPrice';
import { Skeleton } from '../ui/skeleton';

interface BuySellCardProps {
  symbol: string;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
}

export function BuySellCard({ symbol, timeframe, onTimeframeChange }: BuySellCardProps) {
  const [tab, setTab] = useState('buy');
  const { price, priceChange, isLoading, error } = useCryptoPrice(symbol);

  return (
    <div className="rounded-[var(--radius-sm)] border-[var(--muted-border)] border-1 bg-card">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>
        
        <div className="p-6">
          <TabsContent value="buy" className="mt-0 space-y-4">
            <div className="space-y-4">
              <CryptoSelector />
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Market Price</div>
                {isLoading ? (
                  <Skeleton className="h-6 w-32" />
                ) : error ? (
                  <div className="text-sm text-destructive">Failed to load price</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{price}</span>
                    <div className={cn(
                      "flex items-center text-sm",
                      priceChange >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {priceChange >= 0 ? (
                        <ArrowUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4" />
                      )}
                      {Math.abs(priceChange).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <PriceChart 
                  symbol={symbol} 
                  timeframe={timeframe}
                  onTimeframeChange={onTimeframeChange}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="mt-0">
            <div className="text-center text-muted-foreground">
              Sell functionality coming soon
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}