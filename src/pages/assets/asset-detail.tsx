import { useParams, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { PageTransition } from "@/components/layout/page-transition";
import { TimeFrame } from '@/components/crypto/chart-timeframe';
import { PriceChart } from '@/components/crypto/price-chart';
import { useCryptoPrice } from '@/hooks/useCryptoPrice';
import { cn } from '@/lib/utils';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

// This would ideally come from an API or database
const CRYPTO_DESCRIPTIONS: Record<string, { description: string, marketCap: string, circulatingSupply: string }> = {
  bitcoin: {
    description: "Bitcoin is the first decentralized cryptocurrency. Created in 2009 by the pseudonymous Satoshi Nakamoto, it introduced blockchain technology and has become the world's most valuable cryptocurrency by market capitalization. Bitcoin operates on a peer-to-peer network without the need for intermediaries.\n\nAs a pioneering digital currency, Bitcoin has sparked a revolution in finance and technology, leading to the creation of thousands of other cryptocurrencies. It's known for its fixed supply of 21 million coins and its halving events every four years.",
    marketCap: "$880B",
    circulatingSupply: "19.6M BTC"
  },
  ethereum: {
    description: "Ethereum is a decentralized computing platform that enables smart contracts and decentralized applications (dApps). Created by Vitalik Buterin and launched in 2015, it extends beyond simple value transfer to become a platform for complex financial services, games, and applications.\n\nEthereum's native currency is Ether (ETH), which is used to pay for computational services on the network. The platform recently transitioned to a Proof of Stake consensus mechanism, significantly reducing its energy consumption.",
    marketCap: "$350B",
    circulatingSupply: "120.2M ETH"
  }
  // Add more crypto descriptions as needed
};

export function AssetDetailPage() {
  const { cryptoId } = useParams({ from: '/assets/$cryptoId' });
  const [timeframe, setTimeframe] = useState<TimeFrame>('1D');
  
  const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.id === cryptoId);
  const cryptoInfo = CRYPTO_DESCRIPTIONS[cryptoId];
  const { price, priceChange } = useCryptoPrice(crypto?.symbol || '');

  if (!crypto) {
    return (
      <PageTransition>
        <div className="container mx-auto p-8">
          <div className="text-center text-muted-foreground">
            Asset not found
          </div>
        </div>
      </PageTransition>
    );
  }

  const Icon = crypto.icon;

  return (
    <PageTransition>
      <div className="container mx-auto p-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/assets">Assets</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{crypto.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-4 mt-4 mb-8">
          <Icon className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{crypto.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-xl">{price}</span>
              <span className={cn(
                "text-sm",
                priceChange >= 0 ? "text-[var(--uptrend-foreground)]" : "text-[var(--downtrend-foreground)]"
              )}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg border bg-card">
            <PriceChart
              symbol={crypto.symbol}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              height="h-[500px]"
              className="p-4"
            />
          </div>

          {cryptoInfo && (
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="lg:col-span-3 space-y-4">
                <h2 className="text-2xl font-semibold">About {crypto.name}</h2>
                {cryptoInfo.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground">{paragraph}</p>
                ))}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Market Cap</h3>
                  <p className="text-lg font-medium">{cryptoInfo.marketCap}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Circulating Supply</h3>
                  <p className="text-lg font-medium">{cryptoInfo.circulatingSupply}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">RSI (14d)</h3>
                  <p className="text-lg font-medium">65.4</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}