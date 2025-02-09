import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { WatchlistProvider } from './lib/context/watchlist';
import { Toaster } from 'sonner';
import { useHideFiguresShortcut } from '@/lib/store/hide-figures';

export default function App() {
  // Initialize keyboard shortcuts
  useHideFiguresShortcut();

  return (
    <WatchlistProvider>
      <RouterProvider router={router} />
      <Toaster 
        position="bottom-right"
        closeButton
        richColors
        expand={false}
        theme="system"
      />
    </WatchlistProvider>
  );
}