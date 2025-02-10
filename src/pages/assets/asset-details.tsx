import { useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { PageTransition } from "@/components/layout/page-transition";
import { SUPPORTED_CRYPTOCURRENCIES } from '@/lib/constants';
import { TimeFrame } from '@/components/crypto/chart-timeframe';
import { PriceChart } from '@/components/crypto/price-chart';
import { Card } from '@/components/ui/card';
import { useCryptoPrice } from '@/hooks/useCryptoPrice';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export function AssetDetailsPage() {
  const { cryptoId } = useParams({ from: '/assets/$cryptoId' });
  const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.id === cryptoId);
  const [timeframe, setTimeframe] = useState<TimeFrame>('1D');
  const { price, priceChange } = useCryptoPrice(crypto?.symbol || '');

  if (!crypto) {
    return (
      <PageTransition>
        <div className="container p-8">
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
      <div className="container p-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/assets">Assets</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>{crypto.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-4 mb-8">
          <Icon className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{crypto.name}</h1>
            <p className="text-muted-foreground">{crypto.symbol.replace('USDT', '')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="h-[400px] w-full">
                <PriceChart 
                  symbol={crypto.symbol}
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                  showAxes={true}
                  height="100%"
                />
              </div>
            </Card>

            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold">About {crypto.name}</h2>
              <div className="space-y-4">
                {crypto.id === 'bitcoin' && (
                  <>
                    <p>Bitcoin is the world's first decentralized cryptocurrency, created in 2009 by an anonymous person or group known as Satoshi Nakamoto. It introduced blockchain technology and operates on a peer-to-peer network without the need for intermediaries.</p>
                    <p>As a digital currency, Bitcoin enables secure, borderless transactions and is often referred to as "digital gold" due to its store of value properties. It has a fixed supply of 21 million coins, making it a deflationary asset.</p>
                  </>
                )}
                {crypto.id === 'ethereum' && (
                  <>
                    <p>Ethereum is a decentralized computing platform that enables smart contracts and decentralized applications (dApps). Created by Vitalik Buterin, it launched in 2015 and has become the foundation for much of the decentralized finance (DeFi) ecosystem.</p>
                    <p>Unlike Bitcoin, Ethereum's primary purpose extends beyond digital currency. Its native token, Ether (ETH), fuels the network's operations and is used to pay for computational services and transaction fees.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Market Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">{price}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-muted-foreground">24h Change</span>
                  <span className={priceChange >= 0 ? "text-[var(--uptrend-foreground)]" : "text-[var(--downtrend-foreground)]"}>
                    {priceChange >= 0 ? '+' : ''}{priceChange?.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">$725.4B</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-muted-foreground">Circulating Supply</span>
                  <span className="font-medium">19.6M</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--border)]">
                  <span className="text-muted-foreground">RSI (14d)</span>
                  <span className="font-medium">65.4</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}