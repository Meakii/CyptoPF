import { useParams } from '@tanstack/react-router';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { PageTransition } from "@/components/layout/page-transition";
import { BuySellCard } from '@/components/crypto/buy-sell-card';
import { AssetsTable } from '@/components/crypto/assets-table';
import { useState } from 'react';
import { TimeFrame } from '@/components/crypto/chart-timeframe';
import { useAssetPrices } from '@/hooks/useAssetPrices';

export function BuySellPage() {
  const { cryptoId } = useParams({ from: '/buy-sell/$cryptoId' });
  const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.id === cryptoId);
  const [timeframe, setTimeframe] = useState<TimeFrame>('1D');
  const { prices, isLoading } = useAssetPrices();

  if (!crypto) {
    return (
      <PageTransition>
        <div className="container p-8">
          <div className="text-center text-muted-foreground">
            Please select a cryptocurrency to trade
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container space-y-8 p-8">
        {/* <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Trade {crypto.name}
          </h1>
        </div> */}

        <div className="grid gap-8 lg:grid-cols-2">
          <BuySellCard 
            symbol={crypto.symbol}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <AssetsTable prices={prices} isLoading={isLoading} />
        </div>
      </div>
    </PageTransition>
  );
}