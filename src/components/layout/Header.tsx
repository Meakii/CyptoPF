import { motion } from "framer-motion";
import { UserMenu } from "./UserMenu";
import { HelpMenu } from "./HelpMenu";
import { cn } from "@/lib/utils";
import { HiddenFigure } from "@/components/ui/hide-figures";
import { parseAndFormatCurrency } from "@/lib/currency-utils";
import { CASH_AVAILABLE } from "@/pages/dashboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft03Icon, ArrowRight03Icon } from "hugeicons-react";

interface HeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isAnimating: boolean;
}

export function Header({ isCollapsed, onToggle, isAnimating }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 h-16 border-b border-(--muted-border)",
        "bg-(--background)/60 backdrop-blur-lg"
      )}
    >
      <div className="h-full flex items-center justify-between px-4">
        <TooltipProvider delayDuration={20}>
          <Tooltip>
            <TooltipTrigger asChild>
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
                  <ArrowRight03Icon className="w-5 h-5" />
                ) : (
                  <ArrowLeft03Icon className="w-5 h-5" />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">
              Cash available
            </span>
            <HiddenFigure
              value={parseAndFormatCurrency(CASH_AVAILABLE)}
              className="text-sm font-medium"
            />
          </div>
          {/* <HideFiguresToggle /> */}
          <HelpMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

// import { motion } from 'framer-motion';
// import { UserMenu } from './UserMenu';
// import { HelpMenu } from './HelpMenu';
// import { cn } from "@/lib/utils";
// import { HideFiguresToggle, HiddenFigure } from '@/components/ui/hide-figures';
// import { parseAndFormatCurrency } from '@/lib/currency-utils';
// import { CASH_AVAILABLE } from '@/pages/dashboard';
// import {
//   ArrowLeft03Icon,
//   ArrowRight03Icon,
// } from "hugeicons-react";
// interface HeaderProps {
//   isCollapsed: boolean;
//   onToggle: () => void;
//   isAnimating: boolean;
// }

// export function Header({ isCollapsed, onToggle, isAnimating }: HeaderProps) {
//   return (
//     <header className={cn(
//       "sticky top-0 z-10 h-16 border-b border-(--muted-border)",
//       "bg-(--background)/60 backdrop-blur-lg"
//     )}>
//       <div className="h-full flex items-center justify-between px-4">
//         <motion.button
//           onClick={onToggle}
//           disabled={isAnimating}
//           className={cn(
//             "p-2 rounded-lg text-(--muted-foreground)",
//             "hover:bg-(--accent)/80 transition-colors",
//             "disabled:opacity-50 focus:outline-hidden focus:ring-2",
//             "focus:ring-ring"
//           )}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           {isCollapsed ? (
//             <ArrowRight03Icon className="w-5 h-5" />
//           ) : (
//             <ArrowLeft03Icon className="w-5 h-5" />
//           )}
//         </motion.button>

//         <div className="flex items-center gap-6">
//           <div className="flex flex-col items-end">
//             <span className="text-xs text-muted-foreground">Cash available</span>
//             <HiddenFigure
//               value={parseAndFormatCurrency(CASH_AVAILABLE)}
//               className="text-sm font-medium"
//             />
//           </div>
//           {/* <HideFiguresToggle /> */}
//           <HelpMenu />
//           <UserMenu />
//         </div>
//       </div>
//     </header>
//   );
// }
