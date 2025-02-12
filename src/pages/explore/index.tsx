import { useState } from 'react';
import {
  Coins02Icon,
  StarIcon,
} from "hugeicons-react";
import { PageTransition } from "@/components/layout/page-transition";
import { CryptoTable } from "@/components/crypto/crypto-table";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent } from "@/components/ui/animated-tabs";
import { useWatchlist } from "@/lib/context/watchlist";
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { useAssetPrices } from '@/hooks/useAssetPrices';

type SortDirection = 'none' | 'asc' | 'desc';

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('none');
  const { isInWatchlist } = useWatchlist();
  const { prices } = useAssetPrices();

  const handleSortClick = () => {
    setSortDirection(current => {
      switch (current) {
        case 'none': return 'asc';
        case 'asc': return 'desc';
        case 'desc': return 'none';
      }
    });
  };

  const getSortIcon = () => {
    switch (sortDirection) {
      case 'asc': return <ArrowUp className="h-4 w-4" />;
      case 'desc': return <ArrowDown className="h-4 w-4" />;
      default: return <ArrowUpDown className="h-4 w-4" />;
    }
  };

  const sortedCryptos = [...SUPPORTED_CRYPTOCURRENCIES].sort((a, b) => {
    if (sortDirection === 'none') return 0;
    
    const priceA = prices.find(p => p.symbol === a.symbol)?.change || 0;
    const priceB = prices.find(p => p.symbol === b.symbol)?.change || 0;
    
    return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const filteredCryptos = sortedCryptos.filter(crypto => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || (activeTab === 'watchlist' && isInWatchlist(crypto.symbol));
    return matchesSearch && matchesTab;
  });

  return (
    <PageTransition>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Explore</h1>
        
        <div className="space-y-6">
          <AnimatedTabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-[var(--border)]">
              <AnimatedTabsList className="w-full justify-start" variant="underlined" value={activeTab}>
                <AnimatedTabsTrigger value="all" variant="underlined" startIcon={<Coins02Icon className="h-5 w-5" />}>Asset prices</AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="watchlist" variant="underlined" startIcon={<StarIcon className="h-5 w-5" />}>Watchlist</AnimatedTabsTrigger>
              </AnimatedTabsList>
            </div>

            <AnimatedTabsContent value="all" className="mt-6">
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 max-w-sm h-[44px]"
                  />
                </div>
                <CryptoTable 
                  cryptos={filteredCryptos}
                  onSortChange={handleSortClick}
                  sortDirection={sortDirection}
                  sortIcon={getSortIcon()}
                />
              </div>
            </AnimatedTabsContent>

            <AnimatedTabsContent value="watchlist" className="mt-6">
              <CryptoTable 
                cryptos={filteredCryptos}
                onSortChange={handleSortClick}
                sortDirection={sortDirection}
                sortIcon={getSortIcon()}
              />
            </AnimatedTabsContent>
          </AnimatedTabs>
        </div>
      </div>
    </PageTransition>
  );
}