import { useState } from 'react';
import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent } from "@/components/ui/animated-tabs"
import { CryptoSelector } from './crypto-selector';
import { TimeFrame } from './chart-timeframe';
import { cn } from '@/lib/utils';
import { PriceChart } from './price-chart';
import { useCryptoPrice } from '@/hooks/useCryptoPrice';
import { Skeleton } from '@/components/ui/skeleton';

interface BuySellCardProps {
  symbol: string;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  currency?: string; 
}

export function BuySellCard({ 
  symbol, 
  timeframe, 
  onTimeframeChange,
  // currency = '' 
}: BuySellCardProps) {
  const [tab, setTab] = useState('buy');
  const { price, priceChange, isLoading, error } = useCryptoPrice(symbol, {
    // currency: currency
  });

  return (
    <div className="rounded-(--radius-sm) border-(--border) border-1 bg-card">
      <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
        <AnimatedTabsList className="grid w-full grid-cols-2" variant="underlined" value={tab}>
          <AnimatedTabsTrigger value="buy" variant="underlined">Buy</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="sell" variant="underlined">Sell</AnimatedTabsTrigger>
        </AnimatedTabsList>
        
        <div className="p-6">
          <AnimatedTabsContent value="buy" className="mt-0 space-y-4">
            <div className="space-y-4">
              <CryptoSelector />
              
              <div className="flex items-center justify-between">
                {isLoading ? (
                  <Skeleton className="h-6 w-32" />
                ) : error ? (
                  <div className="text-sm text-destructive">Failed to load price</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="btcm-heading-2xl text-(--foreground)">{price}</span>
                    <div className={cn(
                      "flex items-center text-sm",
                      priceChange >= 0 ? "text-(--uptrend-foreground)" : "text-(--downtrend-foreground)"
                    )}>
                      {priceChange >= 0 ? (
                      <span>+</span>
                      ) : (
                        <span>-</span>
                      )}
                      {Math.abs(priceChange).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <PriceChart 
                  symbol={symbol} 
                  timeframe={timeframe}
                  height="h-[300px] md:h-[400px] lg:h-[128px]"
                  onTimeframeChange={onTimeframeChange}
                />
              </div>
            </div>
          </AnimatedTabsContent>

          <AnimatedTabsContent value="sell" className="mt-0">
            <div className="text-center text-muted-foreground">
              Sell functionality coming soon
            </div>
          </AnimatedTabsContent>
        </div>
      </AnimatedTabs>
    </div>
  );
}

// import { useState } from 'react';
// import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent } from "@/components/ui/animated-tabs"

// import { CryptoSelector } from './crypto-selector';
// import { TimeFrame } from './chart-timeframe';
// import { cn } from '@/lib/utils';
// import { ArrowDown, ArrowUp } from 'lucide-react';
// import { PriceChart } from './price-chart';
// import { useCryptoPrice } from '@/hooks/useCryptoPrice';
// import { Skeleton } from '@/components/ui/skeleton';

// interface BuySellCardProps {
//   symbol: string;
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
// }

// export function BuySellCard({ symbol, timeframe, onTimeframeChange }: BuySellCardProps) {
//   const [tab, setTab] = useState('buy');
//   const { price, priceChange, isLoading, error } = useCryptoPrice(symbol);

//   return (
//     <div className="rounded-[var(--radius-sm)] border-[var(--muted-border)] border-1 bg-card">
//       <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
//         <AnimatedTabsList className="grid w-full grid-cols-2" variant="underlined" value={tab}>
//           <AnimatedTabsTrigger value="buy" variant="underlined">Buy</AnimatedTabsTrigger>
//           <AnimatedTabsTrigger value="sell" variant="underlined">Sell</AnimatedTabsTrigger>
//         </AnimatedTabsList>
        
//         <div className="p-6">
//           <AnimatedTabsContent value="buy" className="mt-0 space-y-4">
//             <div className="space-y-4">
//               <CryptoSelector />
              
//               <div className="flex items-center justify-between">
//                 {/* <div className="text-sm text-muted-foreground">Market Price</div> */}
//                 {isLoading ? (
//                   <Skeleton className="h-6 w-32" />
//                 ) : error ? (
//                   <div className="text-sm text-destructive">Failed to load price</div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <span className="btcm-heading-2xl text-(--foreground)">{price}</span>
//                     <div className={cn(
//                       "flex items-center text-sm",
//                       priceChange >= 0 ? "text-green-500" : "text-red-500"
//                     )}>
//                       {priceChange >= 0 ? (
//                         <ArrowUp className="mr-1 h-4 w-4" />
//                       ) : (
//                         <ArrowDown className="mr-1 h-4 w-4" />
//                       )}
//                       {Math.abs(priceChange).toFixed(2)}%
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-4">
//                 <PriceChart 
//                   symbol={symbol} 
//                   timeframe={timeframe}
//                   onTimeframeChange={onTimeframeChange}
//                 />
//               </div>
//             </div>
//           </AnimatedTabsContent>

//           <AnimatedTabsContent value="sell" className="mt-0">
//             <div className="text-center text-muted-foreground">
//               Sell functionality coming soon
//             </div>
//           </AnimatedTabsContent>
//         </div>
//       </AnimatedTabs>
//     </div>
//   );
// }



// import { useState, useRef, useEffect } from 'react';
// import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent } from "@/components/ui/animated-tabs"

// import { CryptoSelector } from './crypto-selector';
// import { TimeFrame } from './chart-timeframe';
// import { cn } from '@/lib/utils';
// import { ArrowDown, ArrowUp } from 'lucide-react';
// import { PriceChart } from './price-chart';
// import { useCryptoPrice } from '@/hooks/useCryptoPrice';
// import { Skeleton } from '../ui/skeleton';

// interface BuySellCardProps {
//   symbol: string;
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
// }

// export function BuySellCard({ symbol, timeframe, onTimeframeChange }: BuySellCardProps) {
//   const [tab, setTab] = useState('buy');
//   const { price, priceChange, isLoading, error } = useCryptoPrice(symbol);
//   const underlineRef = useRef<HTMLDivElement>(null);
//   const tabsRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const tabElement = tabsRef.current?.querySelector(`[data-state="active"]`) as HTMLElement;
//     if (tabElement && underlineRef.current) {
//       underlineRef.current.style.width = `${tabElement.offsetWidth}px`;
//       underlineRef.current.style.left = `${tabElement.offsetLeft}px`;
//     }
//   }, [tab]);

//   return (
//     <div className="rounded-[var(--radius-sm)] border-[var(--muted-border)] border-1 bg-card">
//       <AnimatedTabs value={tab} onValueChange={setTab} className="w-full">
//         <div ref={tabsRef} className="relative">
//           <AnimatedTabsList className="grid w-full grid-cols-2">
//             <AnimatedTabsTrigger value="buy" variant="underlined">Buy</AnimatedTabsTrigger>
//             <AnimatedTabsTrigger value="sell" variant="underlined">Sell</AnimatedTabsTrigger>
//           </AnimatedTabsList>
//           <AnimatedUnderline ref={underlineRef} />
//         </div>
        
//         <div className="p-6">
//           <AnimatedTabsContent value="buy" className="mt-0 space-y-4">
//             <div className="space-y-4">
//               <CryptoSelector />
              
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-muted-foreground">Market Price</div>
//                 {isLoading ? (
//                   <Skeleton className="h-6 w-32" />
//                 ) : error ? (
//                   <div className="text-sm text-destructive">Failed to load price</div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-semibold">{price}</span>
//                     <div className={cn(
//                       "flex items-center text-sm",
//                       priceChange >= 0 ? "text-green-500" : "text-red-500"
//                     )}>
//                       {priceChange >= 0 ? (
//                         <ArrowUp className="mr-1 h-4 w-4" />
//                       ) : (
//                         <ArrowDown className="mr-1 h-4 w-4" />
//                       )}
//                       {Math.abs(priceChange).toFixed(2)}%
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-4">
//                 <PriceChart 
//                   symbol={symbol} 
//                   timeframe={timeframe}
//                   onTimeframeChange={onTimeframeChange}
//                 />
//               </div>
//             </div>
//           </AnimatedTabsContent>

//           <AnimatedTabsContent value="sell" className="mt-0">
//             <div className="text-center text-muted-foreground">
//               Sell functionality coming soon
//             </div>
//           </AnimatedTabsContent>
//         </div>
//       </AnimatedTabs>
//     </div>
//   );
// }



// import { useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { CryptoSelector } from './crypto-selector';
// import { TimeFrame } from './chart-timeframe';
// import { cn } from '@/lib/utils';
// import { ArrowDown, ArrowUp } from 'lucide-react';
// import { PriceChart } from './price-chart';
// import { useCryptoPrice } from '@/hooks/useCryptoPrice';
// import { Skeleton } from '../ui/skeleton';

// interface BuySellCardProps {
//   symbol: string;
//   timeframe: TimeFrame;
//   onTimeframeChange: (timeframe: TimeFrame) => void;
// }

// export function BuySellCard({ symbol, timeframe, onTimeframeChange }: BuySellCardProps) {
//   const [tab, setTab] = useState('buy');
//   const { price, priceChange, isLoading, error } = useCryptoPrice(symbol);

//   return (
//     <div className="rounded-[var(--radius-sm)] border-[var(--muted-border)] border-1 bg-card">
//       <Tabs value={tab} onValueChange={setTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="buy">Buy</TabsTrigger>
//           <TabsTrigger value="sell">Sell</TabsTrigger>
//         </TabsList>
        
//         <div className="p-6">
//           <TabsContent value="buy" className="mt-0 space-y-4">
//             <div className="space-y-4">
//               <CryptoSelector />
              
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-muted-foreground">Market Price</div>
//                 {isLoading ? (
//                   <Skeleton className="h-6 w-32" />
//                 ) : error ? (
//                   <div className="text-sm text-destructive">Failed to load price</div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-semibold">{price}</span>
//                     <div className={cn(
//                       "flex items-center text-sm",
//                       priceChange >= 0 ? "text-green-500" : "text-red-500"
//                     )}>
//                       {priceChange >= 0 ? (
//                         <ArrowUp className="mr-1 h-4 w-4" />
//                       ) : (
//                         <ArrowDown className="mr-1 h-4 w-4" />
//                       )}
//                       {Math.abs(priceChange).toFixed(2)}%
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="mt-4">
//                 <PriceChart 
//                   symbol={symbol} 
//                   timeframe={timeframe}
//                   onTimeframeChange={onTimeframeChange}
//                 />
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="sell" className="mt-0">
//             <div className="text-center text-muted-foreground">
//               Sell functionality coming soon
//             </div>
//           </TabsContent>
//         </div>
//       </Tabs>
//     </div>
//   );
// }