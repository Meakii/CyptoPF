import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { TableHeader } from './holdings/table-header';
import { AssetRow } from './holdings/table-row';

export interface Holding {
  symbol: string;
  balance: number;
  price: string;
  change: number;
  value: string;
}

interface HoldingsTableProps {
  holdings: Holding[];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [search, setSearch] = useState('');
  const [showOnlyHoldings, setShowOnlyHoldings] = useState(true);

  const filteredHoldings = SUPPORTED_CRYPTOCURRENCIES
    .filter(crypto => {
      const hasBalance = holdings.some(h => h.symbol === crypto.symbol);
      if (showOnlyHoldings && !hasBalance) return false;
      return crypto.name.toLowerCase().includes(search.toLowerCase());
    })
    .map(crypto => {
      const holding = holdings.find(h => h.symbol === crypto.symbol);
      return {
        ...crypto,
        balance: holding?.balance || 0,
        price: holding?.price || '-',
        change: holding?.change || 0,
        value: holding?.value || '-'
      };
    });

  return (
    <Card>
      <CardHeader>
        <TableHeader
          search={search}
          onSearchChange={setSearch}
          showOnlyHoldings={showOnlyHoldings}
          onShowOnlyHoldingsChange={setShowOnlyHoldings}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead></TableHead>
          </TableRow>
          <TableBody>
            {filteredHoldings.map((asset) => (
              <AssetRow key={asset.id} {...asset} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}