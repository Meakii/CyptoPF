import { TableRow, TableCell } from "@/components/ui/table";
import { SVGProps } from "react";

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
      <TableCell className="text-right">{balance.toFixed(2)}</TableCell>
      <TableCell className="text-right">{price}</TableCell>
      <TableCell className="text-right">
        <div
          className={
            change >= 0
              ? "text-(--uptrend-foreground)"
              : "text-(--downtrend-foreground)"
          }
        >
          {change >= 0 ? "+" : "-"}
          {Math.abs(change).toFixed(2)}%
        </div>
      </TableCell>
      <TableCell className="text-right">{value}</TableCell>
    </TableRow>
  );
}

// import { TableCell, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Plus, Minus } from "lucide-react";
// import { useNavigate } from "@tanstack/react-router";
// import { CryptoCurrency } from "@/lib/constants";

// interface AssetRowProps extends CryptoCurrency {
//   balance: number;
//   price: string;
//   change: number;
//   value: string;
// }

// export function AssetRow({
//   id,
//   name,
//   icon: Icon,
//   balance,
//   price,
//   change,
//   value
// }: AssetRowProps) {
//   const navigate = useNavigate();

//   return (
//     <TableRow>
//       <TableCell>
//         <div className="flex items-center gap-2">
//           <div className="shrink-0 w-6 h-6">
//             <Icon width={24} height={24} />
//           </div>
//           <span className="font-medium">{name}</span>
//         </div>
//       </TableCell>
//       <TableCell className="text-right">
//         {balance > 0 ? balance.toFixed(8) : '-'}
//       </TableCell>
//       <TableCell className="text-right">{price}</TableCell>
//       <TableCell className="text-right">
//         <div className={cn(
//           "flex items-center justify-end",
//           change >= 0 ? "text-green-500" : "text-red-500"
//         )}>
//           {change !== 0 && (
//             <>
//               {change >= 0 ? (
//                 <Plus className="mr-1 h-4 w-4" />
//               ) : (
//                 <Minus className="mr-1 h-4 w-4" />
//               )}
//               {Math.abs(change)}%
//             </>
//           )}
//         </div>
//       </TableCell>
//       <TableCell className="text-right">{value}</TableCell>
//       <TableCell className="text-right">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => navigate({ to: '/buy-sell/$cryptoId', params: { cryptoId: id }})}
//         >
//           Trade
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// }
