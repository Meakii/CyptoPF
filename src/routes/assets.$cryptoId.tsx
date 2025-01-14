import { createFileRoute } from '@tanstack/react-router';
import { AssetDetailPage } from '@/pages/assets/asset-detail';

export const Route = createFileRoute('/assets/$cryptoId')({
  component: AssetDetailPage,
});