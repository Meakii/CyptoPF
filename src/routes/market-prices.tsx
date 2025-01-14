import { createFileRoute } from '@tanstack/react-router';
import { MarketPricesPage } from '@/pages/market-prices';

export const Route = createFileRoute('/market-prices')({
  component: MarketPricesPage,
});
