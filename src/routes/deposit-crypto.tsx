import { createFileRoute } from '@tanstack/react-router';
import { DepositCryptoPage } from '@/pages/deposit-crypto';

export const Route = createFileRoute('/deposit-crypto')({
  component: DepositCryptoPage,
});