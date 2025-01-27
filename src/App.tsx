import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { WatchlistProvider } from './lib/context/watchlist';

export default function App() {
  return (
    <WatchlistProvider>
      <RouterProvider router={router} />
    </WatchlistProvider>
  );
}