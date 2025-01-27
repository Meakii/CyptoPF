import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
  watchlist: Set<string>;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: new Set<string>(),
      addToWatchlist: (symbol) => set((state) => ({
        watchlist: new Set([...state.watchlist, symbol])
      })),
      removeFromWatchlist: (symbol) => set((state) => {
        const newWatchlist = new Set(state.watchlist);
        newWatchlist.delete(symbol);
        return { watchlist: newWatchlist };
      }),
      isInWatchlist: (symbol) => get().watchlist.has(symbol),
    }),
    {
      name: 'watchlist-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              watchlist: new Set(state.watchlist)
            }
          };
        },
        setItem: (name, value) => {
          const { state } = value;
          const serializedState = {
            state: {
              ...state,
              watchlist: Array.from(state.watchlist)
            }
          };
          localStorage.setItem(name, JSON.stringify(serializedState));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);