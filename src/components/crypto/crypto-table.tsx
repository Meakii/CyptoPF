import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { skeleton } from '@/utils/skeleton';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { useAssetPrices } from '@/hooks/useAssetPrices';
import { parseAndFormatCurrency } from '@/lib/currency-utils';

interface CryptoTableProps {
  searchQuery: string;
}

export function CryptoTable({ searchQuery }: CryptoTableProps) {
  const { prices, isLoading } = useAssetPrices();
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Filter cryptocurrencies based on search query
  const filteredCryptos = SUPPORTED_CRYPTOCURRENCIES.filter(crypto => {
    const search = searchQuery.toLowerCase();
    return crypto.name.toLowerCase().includes(search) || 
           crypto.symbol.toLowerCase().includes(search);
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(Array.from(favorites)));
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

  // Create skeleton rows while loading
  const skeletonRows = Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={`skeleton-${index}`}>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="shrink-0 w-6 h-6" {...skeleton({ loading: true, className: "rounded-full" })} />
          <div className="flex flex-col gap-1">
            <div {...skeleton({ loading: true, className: "h-4 w-24" })} />
            <div {...skeleton({ loading: true, className: "h-3 w-16" })} />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div {...skeleton({ loading: true, className: "h-4 w-24 ml-auto" })} />
      </TableCell>
      <TableCell className="text-right">
        <div {...skeleton({ loading: true, className: "h-4 w-16 ml-auto" })} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <div {...skeleton({ loading: true, className: "h-8 w-16 rounded-md" })} />
          <div {...skeleton({ loading: true, className: "h-8 w-16 rounded-md" })} />
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div {...skeleton({ loading: true, className: "h-8 w-8 mx-auto rounded-md" })} />
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="rounded-[var(--radius-sm)] border-[var(--border)] border-1 bg-[var(--card)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            <TableHead className="text-center">Watchlist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? skeletonRows : filteredCryptos.map((crypto) => {
            const price = prices.find(p => p.symbol === crypto.symbol);
            const Icon = crypto.icon;

            return (
              <TableRow key={crypto.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="shrink-0 w-8 h-8">
                      <Icon width={32} height={32} />
                    </div>
                    <div className="flex flex-col">
                      <span>{crypto.name}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {crypto.symbol.replace('USDT', '')}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {price?.price ? parseAndFormatCurrency(price.price) : '-'}
                </TableCell>
                <TableCell className="text-right">
                  {price && (
                    <div
                      className={cn(
                        "flex items-center justify-end",
                        price.change >= 0 ? "text-[var(--uptrend-foreground)]" : "text-[var(--downtrend-foreground)]"
                      )}
                    >
                      {price.change >= 0 ? '+' : ''}{price.change.toFixed(2)}%
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to="/buy-sell/$cryptoId"
                      params={{ cryptoId: crypto.id }}
                    >
                      <Button variant="outline" size="sm">
                        Trade
                      </Button>
                    </Link>
                    <Link
                      to="/assets/$cryptoId"
                      params={{ cryptoId: crypto.id }}
                    >
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(crypto.symbol)}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        favorites.has(crypto.symbol) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-[var(--muted-foreground)]"
                      )}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}