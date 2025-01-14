import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger } from "@/components/ui/animated-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants";
import { parseAndFormatCurrency } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";
import { skeleton } from "@/utils/skeleton";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface AssetPrice {
  symbol: string;
  price: string;
  change: number;
}

interface AssetsTableProps {
  prices?: AssetPrice[];
  isLoading?: boolean;
  favorites?: Set<string>;
  onToggleFavorite?: (symbol: string) => void;
  showTabs?: boolean;
  showActions?: boolean;
}

export function AssetsTable({ 
  prices = [], 
  isLoading = true,
  favorites = new Set(),
  onToggleFavorite = () => {},
  showTabs = false,
  showActions = true
}: AssetsTableProps) {
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCryptos = SUPPORTED_CRYPTOCURRENCIES.filter(crypto => {
    if (showTabs && tab === "watchlist" && !favorites.has(crypto.symbol)) {
      return false;
    }
    
    const search = searchQuery.toLowerCase();
    return crypto.name.toLowerCase().includes(search) || 
           crypto.symbol.toLowerCase().includes(search);
  });

  const handleRowClick = (cryptoId: string) => {
    if (showTabs) {
      navigate({ to: '/buy-sell/$cryptoId', params: { cryptoId } });
    } else {
      navigate({ to: '/assets/$cryptoId', params: { cryptoId } });
    }
  };

  const TableContent = () => (
    <Table>
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead className="text-right">Market Price</TableHead>
          <TableHead className="text-right">Change (1D)</TableHead>
          {showActions && (
            <TableHead className="text-center">Actions</TableHead>
          )}
          <TableHead className="text-center">Watchlist</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCryptos.map((crypto) => {
          const priceData = prices.find((p) => p.symbol === crypto.symbol);
          const Icon = crypto.icon;

          return (
            <TableRow 
              key={crypto.id} 
              className="cursor-pointer hover:bg-(--layer-high) transition-colors"
              onClick={() => handleRowClick(crypto.id)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="shrink-0 w-6 h-6">
                    {isLoading ? (
                      <div {...skeleton({ loading: true, image: true })} className="h-6 w-6 rounded-full" />
                    ) : (
                      <Icon width={24} height={24} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="" {...skeleton({ loading: isLoading })}>
                      {isLoading ? "Loading..." : crypto.name}
                    </span>
                    <span 
                      className="text-sm text-muted-foreground" 
                      {...skeleton({ loading: isLoading, className: "h-4 w-12" })}
                    >
                      {isLoading ? "Loading..." : crypto.symbol.replace('USDT', '')}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span {...skeleton({ loading: isLoading })}>
                  {isLoading
                    ? "Loading..."
                    : priceData?.price
                    ? parseAndFormatCurrency(priceData.price)
                    : "-"}
                </span>
              </TableCell>
              <TableCell className="text-right btcm-label-sm">
                {isLoading ? (
                  <span {...skeleton({ loading: true })}>Loading...</span>
                ) : priceData ? (
                  <div
                    className={cn(
                      "flex items-center justify-end",
                      priceData.change >= 0 ? "text-(--uptrend-foreground)" : "text-(--downtrend-foreground)"
                    )}
                  >
                    {priceData.change >= 0 ? <span>+</span> : <span>-</span>}
                    {Math.abs(priceData.change).toFixed(2)}%
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>
              {showActions && (
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Trade
                    </Button>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </TableCell>
              )}
              <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleFavorite(crypto.symbol);
                  }}
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
        {filteredCryptos.length === 0 && (
          <TableRow>
            <TableCell colSpan={showActions ? 5 : 4} className="text-center h-24 text-muted-foreground">
              {showTabs && tab === "watchlist" 
                ? "No assets in your watchlist" 
                : "No assets found matching your search"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const content = (
    <div className="relative overflow-x-auto">
      <TableContent />
    </div>
  );

  return (
    <div className="rounded-[var(--radius-sm)] border-[var(--border)] border-1 bg-card">
      {showTabs ? (
        <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
          <AnimatedTabsList className="grid w-full grid-cols-2" variant="underlined" value={tab}>
            <AnimatedTabsTrigger value="all" variant="underlined">
              All assets
            </AnimatedTabsTrigger>
            <AnimatedTabsTrigger value="watchlist" variant="underlined">
              Watchlist
            </AnimatedTabsTrigger>
          </AnimatedTabsList>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>
          {content}
        </AnimatedTabs>
      ) : (
        <>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>
          {content}
        </>
      )}
    </div>
  );
}