import { useState } from "react";
import { InformationCircleIcon, PieChartIcon } from "hugeicons-react";
import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { parseAndFormatCurrency } from "@/lib/currency-utils";
import { HiddenFigure } from "@/components/ui/hide-figures";

export interface Holding {
  symbol: string;
  balance: number;
  price: string;
  change: number;
  value: string;
  unrealizedPnL: string;
}

interface HoldingsTableProps {
  holdings: Holding[];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [search, setSearch] = useState("");

  const formatBalance = (balance: number) => {
    return balance.toFixed(8);
  };

  const filteredHoldings = SUPPORTED_CRYPTOCURRENCIES.filter((crypto) => {
    const hasBalance = holdings.some(
      (h) => h.symbol === crypto.symbol && h.balance > 0
    );
    if (!hasBalance) return false;
    return crypto.name.toLowerCase().includes(search.toLowerCase());
  }).map((crypto) => {
    const holding = holdings.find((h) => h.symbol === crypto.symbol);
    return {
      ...crypto,
      balance: holding?.balance || 0,
      price: holding?.price || "-",
      change: holding?.change || 0,
      value: holding?.value || "-",
      unrealizedPnL: holding?.unrealizedPnL || "-",
    };
  });

  return (
    <Card className="mt-8">
      <CardHeader className="space-y-6">
        <div className="w-full justify-between flex flex-row items-start">
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-[var(--foreground)]" />
              <h2 className="text-lg font-semibold">Crypto holdings</h2>
            </div>
            {/* <div className="flex items-center gap-3">
              <span className="btcm-heading-lg text-[var(--muted-foreground)]">P&L</span>
              <div className="h-4 w-px bg-border" />
              <span className="btcm-heading-lg text-[var(--uptrend-foreground)]">
                {parseAndFormatCurrency("2254.24")}
              </span>
              <div className="h-4 w-px bg-border" />
              <span className="btcm-heading-lg text-[var(--uptrend-foreground)]">+68.32%</span>
    
            </div> */}
          </div>
          <Input
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[200px] h-[44px]"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end gap-2">
                  Unrealised P&L
                  <TooltipProvider delayDuration={20}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="p-1 rounded-[var(--radius-md)] hover:bg-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          aria-label={`More information about unrealised profit and loss`}
                        >
                          <InformationCircleIcon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                        Unrealized P&L is the paper gain or loss on assets you haven't sold yet.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHoldings.map((asset) => {
              const Icon = asset.icon;
              return (
                <TableRow key={asset.symbol}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="shrink-0 w-7 h-7">
                        <Icon width={28} height={28} />
                      </div>
                      <div className="flex flex-col">
                        <span>{asset.name}</span>
                        <span className="text-sm text-[var(--muted-foreground)]">
                          {asset.symbol.replace("USDT", "")}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <HiddenFigure value={formatBalance(asset.balance)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <HiddenFigure value={parseAndFormatCurrency(asset.value)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={cn(
                        "flex items-center justify-end",
                        Number(asset.unrealizedPnL) >= 0
                          ? "text-[var(--uptrend-foreground)]"
                          : "text-[var(--downtrend-foreground)]"
                      )}
                    >
                      {parseAndFormatCurrency(asset.unrealizedPnL)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to="/buy-sell/$cryptoId"
                        params={{ cryptoId: asset.id }}
                      >
                        <Button variant="outline" size="sm">
                          Trade
                        </Button>
                      </Link>
                      <Link
                        to="/assets/$cryptoId"
                        params={{ cryptoId: asset.id }}
                      >
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredHoldings.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No holdings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
