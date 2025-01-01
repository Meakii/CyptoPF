import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

interface AssetPrice {
  symbol: string;
  price: string;
  change: number;
}

interface AssetsTableProps {
  prices?: AssetPrice[];
}

export function AssetsTable({ prices = [] }: AssetsTableProps) {
  const [tab, setTab] = useState('all');

  return (
    <div className="rounded-[var(--radius-sm)] border-[var(--muted-border)] border-1 bg-card">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All assets</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead className="text-right">Market Price</TableHead>
                  <TableHead className="text-right">Change (1D)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SUPPORTED_CRYPTOCURRENCIES.map((crypto) => {
                  const priceData = prices.find(p => p.symbol === crypto.symbol);
                  const Icon = crypto.icon;
                  
                  return (
                    <TableRow key={crypto.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="shrink-0 w-6 h-6">
                            <Icon width={24} height={24} />
                          </div>
                          <span className="font-medium">{crypto.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {priceData?.price || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {priceData && (
                          <div className={cn(
                            "flex items-center justify-end",
                            priceData.change >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {priceData.change >= 0 ? (
                              <Plus className="mr-1 h-4 w-4" />
                            ) : (
                              <Minus className="mr-1 h-4 w-4" />
                            )}
                            {Math.abs(priceData.change)}%
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="watchlist" className="mt-0">
          <div className="p-6 text-center text-muted-foreground">
            Watchlist functionality coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}