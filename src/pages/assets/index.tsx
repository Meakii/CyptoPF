import { useState, useEffect } from 'react';
import { PageTransition } from "@/components/layout/page-transition";
import { useAssetPrices } from '@/hooks/useAssetPrices';
import { AssetsTable } from '@/components/crypto/assets-table';

const FAVORITES_STORAGE_KEY = 'crypto-favorites';

export function AssetsPage() {
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

  return (
    <PageTransition>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Assets</h1>
        <AssetsTable 
          prices={prices} 
          isLoading={isLoading} 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          showTabs={false}
        />
      </div>
    </PageTransition>
  );
}

export default AssetsPage;