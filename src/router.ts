import { createRouter, createRoute, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from './routes/__root';
import { Dashboard } from '@/pages/dashboard';
import { AssetsPage } from '@/pages/assets';
import { CryptoPage } from '@/pages/assets';
import { AssetDetailsPage } from '@/pages/assets/asset-details';
import { BuySellPage } from '@/pages/crypto/buy-sell';
import { DepositAUDPage } from '@/pages/deposit-aud';
import { DepositCryptoPage } from '@/pages/deposit-crypto';
import { TransactionsPage } from '@/pages/transactions';
import { WithdrawPage } from '@/pages/withdraw';

// Create routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard
});
const cryptoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/crypto',
   beforeLoad: () => {
    throw redirect({ to: '/buy-sell/bitcoin' });
  },
});

const assetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assets',
  component: AssetsPage
});

const assetDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/assets/$cryptoId',
  component: AssetDetailsPage
});

const buySellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/buy-sell/$cryptoId',
  component: BuySellPage
});

const depositAudRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deposit-aud',
  component: DepositAUDPage
});

const depositCryptoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deposit-crypto',
  component: DepositCryptoPage
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions',
  component: TransactionsPage
});

const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/withdraw',
  component: WithdrawPage
});

// Create router with all routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  cryptoRoute,
  assetsRoute,
  assetDetailsRoute,
  buySellRoute,
  depositAudRoute,
  depositCryptoRoute,
  transactionsRoute,
  withdrawRoute
]);

export const router = createRouter({ routeTree });

// Register router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}