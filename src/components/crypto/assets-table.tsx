import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent } from "@/components/ui/animated-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants";
import { parseAndFormatCurrency } from "@/lib/currency-utils";
import { cn } from "@/lib/utils";
import { skeleton } from "@/utils/skeleton";

interface AssetPrice {
  symbol: string;
  price: string;
  change: number;
}

interface AssetsTableProps {
  prices?: AssetPrice[];
  isLoading?: boolean;
}

export function AssetsTable({ prices = [], isLoading = true }: AssetsTableProps) {
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCryptos = SUPPORTED_CRYPTOCURRENCIES.filter(crypto => {
    const search = searchQuery.toLowerCase();
    return crypto.name.toLowerCase().includes(search) || 
           crypto.symbol.toLowerCase().includes(search);
  });

  return (
    <div className="rounded-[var(--radius-sm)] border-[var(--border)] border-1 bg-card">
      <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
        <AnimatedTabsList className="grid w-full grid-cols-2" variant="underlined" value={tab}>
          <AnimatedTabsTrigger value="all" variant="underlined">
            All assets
          </AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="watchlist" variant="underlined">
            Watchlist
          </AnimatedTabsTrigger>
        </AnimatedTabsList>

        <AnimatedTabsContent value="all" className="mt-0">
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
                      role="link"
                    >
                      <Link 
                        to="/buy-sell/$cryptoId" 
                        params={{ cryptoId: crypto.id }}
                        className="contents"
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
                      </Link>
                    </TableRow>
                  );
                })}
                {filteredCryptos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                      No assets found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </AnimatedTabsContent>

        <AnimatedTabsContent value="watchlist" className="mt-0">
          <div className="p-6 text-center text-muted-foreground">Watchlist functionality coming soon</div>
        </AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  );
}

// import { useState } from "react";
// import {  AnimatedTabs,  AnimatedTabsList,  AnimatedTabsTrigger,  AnimatedTabsContent,} from "@/components/ui/animated-tabs";
// import {  Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow,} from "@/components/ui/table";
// import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants";
// import { parseAndFormatCurrency } from "@/lib/currency-utils";
// import { cn } from "@/lib/utils";
// import { Skeleton } from '@/components/ui/skeleton';

// interface AssetPrice {
//   symbol: string;
//   price: string;
//   change: number;
// }

// interface AssetsTableProps {
//   prices?: AssetPrice[];
// }

// export function AssetsTable({ prices = [] }: AssetsTableProps) {
//   const [tab, setTab] = useState("all");

//   return (
//     <div className="rounded-[var(--radius-sm)] border-[var(--border)] border-1 bg-card">
//       <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
//         <AnimatedTabsList
//           className="grid w-full grid-cols-2"
//           variant="underlined"
//           value={tab}
//         >
//           <AnimatedTabsTrigger value="all" variant="underlined">
//             All assets
//           </AnimatedTabsTrigger>
//           <AnimatedTabsTrigger value="watchlist" variant="underlined">
//             Watchlist
//           </AnimatedTabsTrigger>
//         </AnimatedTabsList>

//         <AnimatedTabsContent value="all" className="mt-0">
//           <div className="relative overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Asset</TableHead>
//                   <TableHead className="text-right">Market Price</TableHead>
//                   <TableHead className="text-right">Change (1D)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {SUPPORTED_CRYPTOCURRENCIES.map((crypto) => {
//                   const priceData = prices.find(
//                     (p) => p.symbol === crypto.symbol
//                   );
//                   const Icon = crypto.icon;

//                   return (
//                     <TableRow key={crypto.id}>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <div className="shrink-0 w-6 h-6">
//                             <Icon width={24} height={24} />
//                           </div>
//                           <span className="font-medium">{crypto.name}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         {priceData?.price
//                           ? parseAndFormatCurrency(priceData.price)
//                           : "-"}
//                       </TableCell>
//                       <TableCell className="text-right btcm-label-sm">
//                         {priceData && (
//                           <div
//                             className={cn(
//                               "flex items-center justify-end",
//                               priceData.change >= 0
//                                 ? "text-(--uptrend-foreground)"
//                                 : "text-(--downtrend-foreground)"
//                             )}
//                           >

//                             {priceData.change >= 0 ? (
//                               <span>+</span>
//                             ) : (
//                               <span>-</span>
//                             )}
//                             {Math.abs(priceData.change).toFixed(2)}%
//                           </div>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </AnimatedTabsContent>

//         <AnimatedTabsContent value="watchlist" className="mt-0">
//           <div className="p-6 text-center text-muted-foreground">
//             Watchlist functionality coming soon
//           </div>
//         </AnimatedTabsContent>
//       </AnimatedTabs>
//     </div>
//   );
// }

// import { useState } from "react";
// import {
//   AnimatedTabs,
//   AnimatedTabsList,
//   AnimatedTabsTrigger,
//   AnimatedTabsContent,
// } from "@/components/ui/animated-tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { SUPPORTED_CRYPTOCURRENCIES } from "@/lib/constants";
// import { formatCurrency } from "@/lib/currency-utils";

// import { cn } from "@/lib/utils";
// import { Plus, Minus } from "lucide-react";

// interface AssetPrice {
//   symbol: string;
//   price: string;
//   change: number;
// }

// interface AssetsTableProps {
//   prices?: AssetPrice[];
// }

// export function AssetsTable({ prices = [] }: AssetsTableProps) {
//   const [tab, setTab] = useState("all");

//   return (
//     <div className="rounded-[var(--radius-sm)] border-[var(--muted-border)] border-1 bg-card">
//       <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
//         <AnimatedTabsList
//           className="grid w-full grid-cols-2"
//           variant="underlined"
//           value={tab}
//         >
//           <AnimatedTabsTrigger value="all" variant="underlined">
//             All assets
//           </AnimatedTabsTrigger>
//           <AnimatedTabsTrigger value="watchlist" variant="underlined">
//             Watchlist
//           </AnimatedTabsTrigger>
//         </AnimatedTabsList>

//         <AnimatedTabsContent value="all" className="mt-0">
//           <div className="relative overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Asset</TableHead>
//                   <TableHead className="text-right">Market Price</TableHead>
//                   <TableHead className="text-right">Change (1D)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {SUPPORTED_CRYPTOCURRENCIES.map((crypto) => {
//                   const priceData = prices.find(
//                     (p) => p.symbol === crypto.symbol
//                   );
//                   const Icon = crypto.icon;

//                   return (
//                     <TableRow key={crypto.id}>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <div className="shrink-0 w-6 h-6">
//                             <Icon width={24} height={24} />
//                           </div>
//                           <span className="font-medium">{crypto.name}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         {priceData?.price
//                           ? formatCurrency(parseFloat(priceData.price), "AUD") // Use parseFloat
//                           : "-"}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         {priceData && (
//                           <div
//                             className={cn(
//                               "flex items-center justify-end",
//                               priceData.change >= 0
//                                 ? "text-green-500"
//                                 : "text-red-500"
//                             )}
//                           >
//                             {priceData.change >= 0 ? (
//                               <Plus className="mr-1 h-4 w-4" />
//                             ) : (
//                               <Minus className="mr-1 h-4 w-4" />
//                             )}
//                             {Math.abs(priceData.change)}%
//                           </div>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </AnimatedTabsContent>

//         <AnimatedTabsContent value="watchlist" className="mt-0">
//           <div className="p-6 text-center text-muted-foreground">
//             Watchlist functionality coming soon
//           </div>
//         </AnimatedTabsContent>
//       </AnimatedTabs>
//     </div>
//   );
// }
