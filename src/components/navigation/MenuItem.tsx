import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from "@/lib/utils";

import { Tooltip } from '@/components/ui/tooltip';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed: boolean;
  variants?: any;
  sectionTitle?: string;
}

export const MenuItem = ({ 
  icon: Icon, 
  label, 
  href, 
  isCollapsed, 
  variants,
  sectionTitle 
}: MenuItemProps) => {
  const content = (
    <Link
      to={href}
      className={cn(
        "flex items-center w-full transition-colors rounded-md",
        "hover:bg-accent/80 hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground",
        "active:bg-accent/90",
        isCollapsed ? "justify-center px-3 py-3" : "space-x-4 px-3 py-3" // Increased vertical padding
      )}
    >
      <Icon className="w-4 h-4" />
      {!isCollapsed && (
        <span className="text-sm font-medium">
          {label}
        </span>
      )}
    </Link>
  );

  if (isCollapsed) {
    const tooltipContent = sectionTitle ? `${sectionTitle} ${label}` : label;
    return (
      <motion.div variants={variants}>
        <Tooltip content={tooltipContent}>
          {content}
        </Tooltip>
      </motion.div>
    );
  }

  return (
    <motion.div variants={variants}>
      {content}
    </motion.div>
  );
}