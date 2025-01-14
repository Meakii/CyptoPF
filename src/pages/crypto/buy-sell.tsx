import { useParams } from '@tanstack/react-router';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { PageTransition } from "@/components/layout/page-transition";
import { BuySellCard } from '@/components/crypto/buy-sell-card';
import { AssetsTable } from '@/components/crypto/assets-table';
import { useState, useEffect } from 'react';
import { TimeFrame } from '@/components/crypto/chart-timeframe';
import { useAssetPrices } from '@/hooks/useAssetPrices';

const FAVORITES_STORAGE_KEY = 'crypto-favorites';

export function BuySellPage() {
  const { cryptoId } = useParams({ from: '/buy-sell/$cryptoId' });
  const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.id === cryptoId);
  const [timeframe, setTimeframe] = useState<TimeFrame>('1D');
  const { prices, isLoading } = useAssetPrices();
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(symbol)) {
        newFavorites.delete(symbol);
      } else {
        newFavorites.add(symbol);
      }
      return newFavorites;
    });
  };

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
      <div className="">
        <div className="grid gap-8 lg:grid-cols-2 mx-10 py-8">
          <BuySellCard 
            symbol={crypto.symbol}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
          <AssetsTable 
            prices={prices} 
            isLoading={isLoading} 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            showTabs={true}
            showActions={false}
          />
        </div>
      </div>
    </PageTransition>
  );
}