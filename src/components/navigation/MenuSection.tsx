import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import { MenuSectionType } from '@/config/menuItems';
import { cn } from "@/lib/utils";

interface MenuSectionProps {
  section: MenuSectionType;
  isCollapsed: boolean;
  variants: any;
}

export const MenuSection = ({ section, isCollapsed, variants }: MenuSectionProps) => {
  return (
    <motion.div 
      variants={variants} 
      className={cn(
        "py-4",
        "border-b border-[var(--border)] last:border-b-0"
      )}
    >
      {!isCollapsed && (
        <motion.h3 
          variants={variants}
          className="mb-3 btcm-label-xs-semibold text-(--muted-foreground) px-3"
        >
          {section.title}
        </motion.h3>
      )}
      <div className="space-y-1">
        {section.items.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            childRoutes={item.childRoutes}
            isCollapsed={isCollapsed}
            variants={variants}
            sectionTitle={section.title}
          />
        ))}
      </div>
    </motion.div>
  );
}

// import { motion } from 'framer-motion';
// import { MenuItem } from './MenuItem';
// import { MenuSectionType } from '@/config/menuItems';
// import { cn } from "@/lib/utils";

// interface MenuSectionProps {
//   section: MenuSectionType;
//   isCollapsed: boolean;
//   variants: any;
// }

// export const MenuSection = ({ section, isCollapsed, variants }: MenuSectionProps) => {
//   return (
//     <motion.div 
//       variants={variants} 
//       className={cn(
//         "py-4", // Increased vertical padding
//         "border-b border-[var(--border)] last:border-b-0"
//       )}
//     >
//       {!isCollapsed && (
//         <motion.h3 
//           variants={variants}
//           className="mb-3 btcm-label-xs-semibold text-(--muted-foreground) px-3"
//         >
//           {section.title}
//         </motion.h3>
//       )}
//       <div className="space-y-1"> {/* Added gap between menu items */}
//         {section.items.map((item, index) => (
//           <MenuItem
//             key={index}
//             icon={item.icon}
//             label={item.label}
//             href={item.href}
//             isCollapsed={isCollapsed}
//             variants={variants}
//             sectionTitle={section.title}
//           />
//         ))}
//       </div>
//     </motion.div>
//   );
// }