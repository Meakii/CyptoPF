import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link, useRouter } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { Tooltip } from '@/components/ui/tooltip';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed: boolean;
  variants?: any;
  sectionTitle?: string;
  childRoutes?: string[];
}

const isRouteActive = (href: string, childRoutes: string[] | undefined, currentPath: string): boolean => {
  // Check direct match
  if (currentPath === href) return true;
  
  // Check child routes if they exist
  if (childRoutes) {
    return childRoutes.some(childRoute => {
      // Handle dynamic routes by replacing params with actual values
      if (childRoute.includes('$')) {
        const pattern = childRoute.replace('$cryptoId', '[^/]+');
        return new RegExp(`^${pattern}$`).test(currentPath);
      }
      return currentPath === childRoute;
    });
  }
  
  return false;
};

export const MenuItem = ({ 
  icon: Icon, 
  label, 
  href, 
  isCollapsed, 
  variants,
  sectionTitle,
  childRoutes 
}: MenuItemProps) => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const isActive = isRouteActive(href, childRoutes, currentPath);

  const content = (
    <Link
      to={href}
      className={cn(
        "flex items-center w-full rounded-[var(--radius-sm)] text-[var(--muted-foreground)] relative",
        "hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
        "focus-visible:ring-1 focus-visible:ring-(--ring) focus-visible:ring-offset-0",
        "focus-visible:outline-hidden focus-visible:bg-(--accent) focus-visible:text-(--accent-foreground)",
        "active:bg-[var(--accent)/90]",
        "[&[aria-current='page']]:bg-[var(--accent)] [&[aria-current='page']]:text-[var(--accent-foreground)] ",
        "[&[aria-current='page']]:after:absolute",
        "[&[aria-current='page']]:after:bottom-[0.1875rem] ",
        "[&[aria-current='page']]:after:right-0",
        "[&[aria-current='page']]:after:top-[0.1875rem]",
        "[&[aria-current='page']]:after:w-[0.125rem]",
        "[&[aria-current='page']]:after:rounded-full",
        "[&[aria-current='page']]:after:bg-[var(--primary-border)]",
        "[&[aria-current='page']]:after:content-['']",
        isCollapsed ? "justify-center px-3 py-3" : "space-x-4 px-3 py-3"
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="w-4 h-4" />
      {!isCollapsed && (
        <span className="btcm-label-sm">
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

// import { motion } from 'framer-motion';
// import { LucideIcon } from 'lucide-react';
// import { Link } from '@tanstack/react-router';
// import { cn } from "@/lib/utils";

// import { Tooltip } from '@/components/ui/tooltip';

// interface MenuItemProps {
//   icon: LucideIcon;
//   label: string;
//   href: string;
//   isCollapsed: boolean;
//   variants?: any;
//   sectionTitle?: string;
// }

// export const MenuItem = ({ 
//   icon: Icon, 
//   label, 
//   href, 
//   isCollapsed, 
//   variants,
//   sectionTitle 
// }: MenuItemProps) => {
//   const content = (
//     <Link
//       to={href}
//       className={cn(
//         "flex items-center w-full rounded-(--radius-sm) text-(--muted-foreground)",
//         "hover:bg-(--accent) hover:text-accent-foreground",
//         "focus-visible:outline-hidden focus-visible:bg-(--accent) focus-visible:text-(--accent-foreground)",
//         "active:bg-(--accent)/90",
//         "[&[aria-current='page']]:bg-(--accent)",
//         isCollapsed ? "justify-center px-3 py-3" : "space-x-4 px-3 py-3" // Increased vertical padding
//       )}
//     >
//       <Icon className="w-4 h-4" />
//       {!isCollapsed && (
//         <span className="btcm-label-sm">
//           {label}
//         </span>
//       )}
//     </Link>
//   );

//   if (isCollapsed) {
//     const tooltipContent = sectionTitle ? `${sectionTitle} ${label}` : label;
//     return (
//       <motion.div variants={variants}>
//         <Tooltip content={tooltipContent}>
//           {content}
//         </Tooltip>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div variants={variants}>
//       {content}
//     </motion.div>
//   );
// }