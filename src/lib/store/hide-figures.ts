import { create } from 'zustand';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface HideFiguresState {
  isHidden: boolean;
  toggle: () => void;
}

export const useHideFigures = create<HideFiguresState>((set) => ({
  isHidden: false,
  toggle: () => set((state) => {
    const newState = { isHidden: !state.isHidden };
    
    // Show toast only when transitioning to hidden state
    if (newState.isHidden) {
      toast.message("Figures hidden", {
        description: "Use Ctrl/Cmd + H keys at any time to hide and show sensitive figures",
        action: {
          label: "Got it",
          onClick: () => toast.dismiss(),
        },
      });
    }
    
    return newState;
  }),
}));

// Hook to handle keyboard shortcuts
export function useHideFiguresShortcut() {
  const toggle = useHideFigures(state => state.toggle);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for either Control or Command key (metaKey for Mac)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault(); // Prevent browser's default behavior
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);
}