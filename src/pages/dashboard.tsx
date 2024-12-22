import { PriceCard } from "@/components/dashboard/price-card";
import { Bitcoin, DollarSign, Gem } from "lucide-react";
import { EthereumIcon } from "@/components/icons/ethereum-icon";
import { PageTransition } from '@/components/layout/page-transition';

export function Dashboard() {
  return (
    <PageTransition>
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PriceCard
          title="Bitcoin (BTC)"
          price="$45,231.42"
          change={2.5}
          icon={Bitcoin}
        />
        <PriceCard
          title="Ethereum (ETH)"
          price="$2,354.21"
          change={-1.2}
          icon={EthereumIcon}
        />
        <PriceCard
          title="Total Balance"
          price="$12,456.78"
          change={4.3}
          icon={DollarSign}
        />
        <PriceCard
          title="Total Assets"
          price="5"
          change={0}
          icon={Gem}
        />
      </div>
    </div>
    </PageTransition>
  );
}