import { createFileRoute } from '@tanstack/react-router';
import { DepositAUDPage } from '@/pages/deposit-aud';

export const Route = createFileRoute('/deposit-aud')({
  component: DepositAUDPage,
});