// src/pages/market-prices.tsx
import { useState } from 'react';
import { PageTransition } from "@/components/layout/page-transition";
import { useAssetPrices } from '@/hooks/useAssetPrices';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { skeleton } from '@/utils/skeleton';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';

export function MarketPricesPage() {
  const { prices, isLoading } = useAssetPrices();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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
          <div className="shrink-0 w-7 h-7" {...skeleton({ loading: true, className: "rounded-full" })} />
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
      <TableCell className="text-center">
        <div {...skeleton({ loading: true, className: "h-8 w-16 mx-auto rounded-md" })} />
      </TableCell>
      <TableCell className="text-center">
        <div {...skeleton({ loading: true, className: "h-8 w-8 mx-auto rounded-md" })} />
      </TableCell>
    </TableRow>
  ));

  return (
    <PageTransition>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Market Prices</h1>
        
        <div className="rounded-[var(--radius-sm)] border-[var(--border)] border-1 bg-[var(--card)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-center">Actions</TableHead>
                <TableHead className="text-center">Watchlist</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? skeletonRows : prices.map((price) => {
                const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.symbol === price.symbol);
                if (!crypto) return null;
                const Icon = crypto.icon;

                return (
                  <TableRow key={crypto.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="shrink-0 w-7 h-7">
                          <Icon width={28} height={28} />
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
                      {price.price}
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
                    <TableCell className="text-center">
                      <Link
                        to="/buy-sell/$cryptoId"
                        params={{ cryptoId: crypto.id }}
                      >
                        <Button variant="outline" size="sm">
                          Trade
                        </Button>
                      </Link>
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
      </div>
    </PageTransition>
  );
}


// // src/pages/market-prices.tsx
// import { useState } from 'react';
// import { PageTransition } from "@/components/layout/page-transition";
// import { useAssetPrices } from '@/hooks/useAssetPrices';
// import { Button } from '@/components/ui/button';
// import { Star } from 'lucide-react';
// import { Link } from '@tanstack/react-router';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { cn } from '@/lib/utils';
// import { skeleton } from '@/utils/skeleton';
// import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';


// export function MarketPricesPage() {
//   const { prices, isLoading } = useAssetPrices();
//   const [favorites, setFavorites] = useState<Set<string>>(new Set());

//   const toggleFavorite = (symbol: string) => {
//     setFavorites(prev => {
//       const newFavorites = new Set(prev);
//       if (newFavorites.has(symbol)) {
//         newFavorites.delete(symbol);
//       } else {
//         newFavorites.add(symbol);
//       }
//       return newFavorites;
//     });
//   };

//   return (
//     <PageTransition>
//       <div className="container mx-auto p-8">
//         <h1 className="text-3xl font-bold tracking-tight mb-8">Market Prices</h1>
        
//         <div className="rounded-[var(--radius-sm)] border-[var(--border)] border-1 bg-[var(--card)]">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Asset</TableHead>
//                 <TableHead className="text-right">Price</TableHead>
//                 <TableHead className="text-right">24h Change</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//                 <TableHead className="text-center">Watchlist</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {prices.map((price) => {
//                 const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.symbol === price.symbol);
//                 if (!crypto) return null;
//                 const Icon = crypto.icon;

//                 return (
//                   <TableRow key={crypto.id}>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <div className="shrink-0 w-6 h-6" {...skeleton({ loading: isLoading, image: true })}>
//                           <Icon width={24} height={24} />
//                         </div>
//                         <div className="flex flex-col">
//                           <span {...skeleton({ loading: isLoading })}>{crypto.name}</span>
//                           <span className="text-sm text-[var(--muted-foreground)]" {...skeleton({ loading: isLoading })}>
//                             {crypto.symbol.replace('USDT', '')}
//                           </span>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-right" {...skeleton({ loading: isLoading })}>
//                       {price.price}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div
//                         className={cn(
//                           "flex items-center justify-end",
//                           price.change >= 0 ? "text-[var(--uptrend-foreground)]" : "text-[var(--downtrend-foreground)]"
//                         )}
//                         {...skeleton({ loading: isLoading })}
//                       >
//                         {price.change >= 0 ? '+' : ''}{price.change.toFixed(2)}%
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Link
//                         to="/buy-sell/$cryptoId"
//                         params={{ cryptoId: crypto.id }}
//                       >
//                         <Button variant="outline" size="sm">
//                           Trade
//                         </Button>
//                       </Link>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => toggleFavorite(crypto.symbol)}
//                       >
//                         <Star
//                           className={cn(
//                             "h-4 w-4",
//                             favorites.has(crypto.symbol) 
//                               ? "fill-yellow-400 text-yellow-400" 
//                               : "text-[var(--muted-foreground)]"
//                           )}
//                         />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </PageTransition>
//   );
// }
