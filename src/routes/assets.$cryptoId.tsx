import { createFileRoute } from '@tanstack/react-router'
import { AssetDetailsPage } from '@/pages/explore/asset-details'

export const Route = createFileRoute('/assets/$cryptoId')({
  component: AssetDetailsPage,
})
