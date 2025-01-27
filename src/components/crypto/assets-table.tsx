import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatedTabs,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsContent,
} from "@/components/ui/animated-tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants";
import { parseAndFormatCurrency } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";
import { skeleton } from "@/utils/skeleton";
import { useWatchlist } from "@/lib/context/watchlist";

interface AssetPrice {
  symbol: string;
  price: string;
  change: number;
}

interface AssetsTableProps {
  prices?: AssetPrice[];
  isLoading?: boolean;
}

export function AssetsTable({
  prices = [],
  isLoading = true,
}: AssetsTableProps) {
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const filteredCryptos = SUPPORTED_CRYPTOCURRENCIES.filter((crypto) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      crypto.name.toLowerCase().includes(search) ||
      crypto.symbol.toLowerCase().includes(search);

    if (tab === "watchlist") {
      return matchesSearch && isInWatchlist(crypto.symbol);
    }

    return matchesSearch;
  });

  return (
    <div className="rounded-[var(--radius-sm)] border-[(--border)] border bg-card">
      <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
        <AnimatedTabsList
          className="grid w-full grid-cols-2"
          variant="underlined"
          value={tab}
        >
          <AnimatedTabsTrigger value="all" variant="underlined">
            All assets
          </AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="watchlist" variant="underlined">
            Watchlist
          </AnimatedTabsTrigger>
        </AnimatedTabsList>

        <AnimatedTabsContent value={tab} className="mt-0">
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
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead className="text-right">Market Price</TableHead>
                  <TableHead className="text-right">Change (1D)</TableHead>
                  <TableHead className="text-center">Watchlist</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCryptos.map((crypto) => {
                  const priceData = prices.find(
                    (p) => p.symbol === crypto.symbol
                  );
                  const Icon = crypto.icon;

                  return (
                    <TableRow
                      key={crypto.id}
                      className="hover:bg-(--layer-high) transition-colors"
                    >
                      <TableCell>
                        <Link
                          to="/buy-sell/$cryptoId"
                          params={{ cryptoId: crypto.id }}
                          className="flex items-center gap-2"
                        >
                          <div className="shrink-0 w-8 h-8">
                            {isLoading ? (
                              <div
                                {...skeleton({ loading: true, image: true })}
                                className="h-8 w-8 rounded-full"
                              />
                            ) : (
                              <Icon width={32} height={32} />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span
                              className=""
                              {...skeleton({ loading: isLoading })}
                            >
                              {isLoading ? "Loading..." : crypto.name}
                            </span>
                            <span
                              className="text-sm text-[var(--muted-foreground)]"
                              {...skeleton({
                                loading: isLoading,
                                className: "h-4 w-12",
                              })}
                            >
                              {isLoading
                                ? "Loading..."
                                : crypto.symbol.replace("USDT", "")}
                            </span>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          to="/buy-sell/$cryptoId"
                          params={{ cryptoId: crypto.id }}
                          className="block"
                        >
                          <span {...skeleton({ loading: isLoading })}>
                            {isLoading
                              ? "Loading..."
                              : priceData?.price
                                ? parseAndFormatCurrency(priceData.price)
                                : "-"}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right btcm-label-sm">
                        <Link
                          to="/buy-sell/$cryptoId"
                          params={{ cryptoId: crypto.id }}
                          className="block"
                        >
                          {isLoading ? (
                            <span {...skeleton({ loading: true })}>
                              Loading...
                            </span>
                          ) : priceData ? (
                            <div
                              className={cn(
                                "flex items-center justify-end",
                                priceData.change >= 0
                                  ? "text-[var(--uptrend-foreground)]"
                                  : "text-[var(--downtrend-foreground)]"
                              )}
                            >
                              {priceData.change >= 0 ? (
                                <span>+</span>
                              ) : (
                                <span>-</span>
                              )}
                              {Math.abs(priceData.change)}%
                            </div>
                          ) : (
                            "-"
                          )}
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWatchlist(crypto.symbol);
                          }}
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
                {filteredCryptos.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center h-24 text-muted-foreground"
                    >
                      {tab === "watchlist"
                        ? "No assets in watchlist"
                        : "No assets found matching your search"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  );
}