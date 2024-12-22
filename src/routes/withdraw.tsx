import { createFileRoute } from '@tanstack/react-router';
import { WithdrawPage } from '@/pages/withdraw';

export const Route = createFileRoute('/withdraw')({
  component: WithdrawPage,
});