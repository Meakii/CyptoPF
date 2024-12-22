import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-2 px-2 py-1 text-sm whitespace-nowrap
                     bg-popover text-popover-foreground rounded-md shadow-lg
                     border border-border/50"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}