import { createFileRoute } from '@tanstack/react-router';
import { BuySellPage } from '@/pages/crypto/buy-sell';

export const Route = createFileRoute('/buy-sell/$cryptoId')({
  component: BuySellPage,
});