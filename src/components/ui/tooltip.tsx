import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "../../lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "btcm-label-sm z-50 overflow-hidden rounded-sm border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };


// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface TooltipProps {
//   content: string;
//   children: React.ReactNode;
// }

// export function Tooltip({ content, children }: TooltipProps) {
//   const [isVisible, setIsVisible] = React.useState(false);

//   return (
//     <div 
//       className="relative"
//       onMouseEnter={() => setIsVisible(true)}
//       onMouseLeave={() => setIsVisible(false)}
//     >
//       {children}
//       <AnimatePresence>
//         {isVisible && (
//           <motion.div
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -10 }}
//             className="absolute left-full ml-2 px-2 py-1 text-sm whitespace-nowrap
//                      bg-[var(--popover)] text-[var(--popover-foreground)] rounded-md shadow-lg
//                      border z-10"
//             style={{ top: '50%', transform: 'translateY(-50%)' }}
//           >
//             {content}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }