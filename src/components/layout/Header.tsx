import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, HelpCircle, Ticket, Network, MessageSquare } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { HelpMenu } from './HelpMenu';
import { cn } from "@/lib/utils";
import { HideFiguresToggle, HiddenFigure } from '@/components/ui/hide-figures';
import { useAssetPrices } from '@/hooks/useAssetPrices';
import { parseAndFormatCurrency } from '@/lib/currency-utils';

interface HeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isAnimating: boolean;
}

export function Header({ isCollapsed, onToggle, isAnimating }: HeaderProps) {
  const { prices } = useAssetPrices();
  
  // Calculate total portfolio value
  const totalValue = prices.reduce((sum, price) => {
    return sum + parseFloat(price.price);
  }, 0);

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
            "p-2 rounded-lg text-(--muted-foreground)",
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

        <div className="flex items-center gap-2">
          <HiddenFigure 
            value={parseAndFormatCurrency(totalValue)} 
            className="btcm-heading-xl text-(--foreground)"
          />
          <HideFiguresToggle />
        </div>

        <div className="flex items-center space-x-2">
          <HelpMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}