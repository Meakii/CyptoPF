import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { skeleton } from '@/utils/skeleton';
import { useAssetPrices } from '@/hooks/useAssetPrices';
import { parseAndFormatCurrency } from '@/lib/currency-utils';
import { useWatchlist } from '@/lib/context/watchlist';
import { CryptoCurrency } from '@/lib/constants';

interface CryptoTableProps {
  cryptos: CryptoCurrency[];
  onSortChange: () => void;
  sortDirection: 'none' | 'asc' | 'desc';
  sortIcon: React.ReactNode;
}

export function CryptoTable({ cryptos, onSortChange, sortDirection, sortIcon }: CryptoTableProps) {
  const { prices, isLoading } = useAssetPrices();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

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
    <div className="rounded-[var(--radius-sm)] border-[var(--border)] border bg-[var(--card)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end gap-2">
                24h Change
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSortChange}
                  className="-mr-2"
                  aria-label={`Sort by 24h change ${
                    sortDirection === 'none' 
                      ? '' 
                      : sortDirection === 'asc' 
                        ? 'ascending' 
                        : 'descending'
                  }`}
                  aria-pressed={sortDirection !== 'none'}
                >
                  {sortIcon}
                </Button>
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
            <TableHead className="text-center">Watchlist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? skeletonRows : cryptos.map((crypto) => {
            const price = prices.find(p => p.symbol === crypto.symbol);
            if (!price) return null;
            const Icon = crypto.icon;

            return (
              <TableRow key={crypto.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="shrink-0 w-6 h-6">
                      <Icon width={24} height={24} />
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
                  {parseAndFormatCurrency(price.price)}
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={cn(
                      "flex items-center justify-end",
                      price.change >= 0 ? "text-[var(--uptrend-foreground)]" : "text-[var(--downtrend-foreground)]"
                    )}
                  >
                    {price.change >= 0 ? '+' : ''}{price.change.toFixed(2)}%
                  </div>
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
                    onClick={() => toggleWatchlist(crypto.symbol)}
                    aria-label={isInWatchlist(crypto.symbol) ? "Remove from watchlist" : "Add to watchlist"}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        isInWatchlist(crypto.symbol) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-[var(--muted-foreground)]"
                      )}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
          {!isLoading && cryptos.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No assets found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}