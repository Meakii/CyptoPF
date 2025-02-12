import { createFileRoute } from '@tanstack/react-router';
import { AssetDetailsPage } from '@/pages/explore/asset-details';

export const Route = createFileRoute('/assets/details')({
  component: AssetDetailsPage,
  validateSearch: (search: Record<string, unknown>) => {
    // This ensures the id search param exists and is a string
    return {
      id: search.id as string
    }
  }
});