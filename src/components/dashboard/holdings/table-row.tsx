import { TableRow, TableCell } from "@/components/ui/table";
import { SVGProps } from "react";
import { HiddenFigure } from '@/components/ui/hide-figures';

interface AssetRowProps {
  symbol: string;
  name: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  balance: number;
  price: string;
  change: number;
  value: string;
}

export function AssetRow({
  symbol,
  name,
  icon: Icon,
  balance,
  price,
  change,
  value,
}: AssetRowProps) {
  return (
    <TableRow key={symbol}>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="shrink-0 w-6 h-6">
            <Icon width={24} height={24} />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <HiddenFigure value={balance.toFixed(2)} />
      </TableCell>
      <TableCell className="text-right">{price}</TableCell>
      <TableCell className="text-right">
        <div
          className={
            change >= 0
              ? "text-[var(--uptrend-foreground)]"
              : "text-[var(--downtrend-foreground)]"
          }
        >
          {change >= 0 ? "+" : "-"}
          {Math.abs(change).toFixed(2)}%
        </div>
      </TableCell>
      <TableCell className="text-right">
        <HiddenFigure value={value} />
      </TableCell>
    </TableRow>
  );
}