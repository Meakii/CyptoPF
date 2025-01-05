import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/crypto')({
  beforeLoad: () => {
    throw redirect({ to: '/buy-sell/bitcoin' })
  },
})

// export const Route = createFileRoute('/crypto')({
//   component: BuySellPage,
// });
