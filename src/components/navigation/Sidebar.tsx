import { motion, AnimatePresence } from 'framer-motion';
import { SidebarExpanded } from './SidebarExpanded';
import { SidebarCollapsed } from './SidebarCollapsed';
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8
};

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  onToggle: () => void;
  onAnimationComplete: () => void;
}

const Sidebar = ({ className, isCollapsed, onToggle, onAnimationComplete }: SidebarProps) => {
  return (
    <motion.div 
      className={cn(
        "sidebar min-h-screen bg-background border-r border-[var(--muted-border)]",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      initial={false}
      animate={{ 
        width: isCollapsed ? 64 : 256,
        transition: {
          ...transition,
          delay: 0.2
        }
      }}
    >
      <AnimatePresence mode="wait" onExitComplete={onAnimationComplete}>
        {isCollapsed ? (
          <SidebarCollapsed key="collapsed" onExpand={onToggle} />
        ) : (
          <SidebarExpanded key="expanded" onCollapse={onToggle} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;