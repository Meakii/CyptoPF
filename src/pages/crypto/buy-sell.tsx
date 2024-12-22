import { useParams } from '@tanstack/react-router';
import { CryptoSelector } from '@/components/crypto/crypto-selector';
import { PriceChart } from '@/components/crypto/price-chart';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { PageTransition } from "@/components/layout/page-transition";

export function BuySellPage() {
  const { cryptoId } = useParams({ from: '/buy-sell/$cryptoId' });
  const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.id === cryptoId);

  return (
    <PageTransition>
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {crypto ? `Trade ${crypto.name}` : 'Select Cryptocurrency'}
        </h1>
        <CryptoSelector />
      </div>
      
      {crypto && (
        <div className="rounded-lg border bg-card p-6 overflow-x-auto">
          <PriceChart symbol={crypto.symbol} />
        </div>
      )}
    </div>
    </PageTransition>
  );
}