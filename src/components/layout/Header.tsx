import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { cn } from "@/lib/utils";

interface HeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isAnimating: boolean;
}

export function Header({ isCollapsed, onToggle, isAnimating }: HeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-10 h-16 border-b border-(--muted-border)",
      "bg-(--background)/60 backdrop-blur-lg"
    )}>
      <div className="h-full flex items-center justify-between px-4">
        <motion.button
          onClick={onToggle}
          disabled={isAnimating}
          className={cn(
            "p-2 rounded-lg",
            "hover:bg-(--accent)/80 transition-colors",
            "disabled:opacity-50 focus:outline-hidden focus:ring-2",
            "focus:ring-ring"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </motion.button>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}