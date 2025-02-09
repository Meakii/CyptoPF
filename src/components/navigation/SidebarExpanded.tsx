import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import { menuSections } from '@/config/menuItems';

interface SidebarExpandedProps {
  onCollapse: () => void;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.03
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  initial: { 
    opacity: 0, 
    y: -8 
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.1,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: { 
    opacity: 0,
    y: 8,
    transition: { 
      duration: 0.1,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const SidebarExpanded = ({ onCollapse }: SidebarExpandedProps) => {
  return (
    <motion.div
      className="p-4 mt-8 sticky top-0"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {menuSections[0].items.map((item, index) => (
        <motion.div key={item.href} variants={itemVariants}>
          <MenuItem
            icon={item.icon}
            label={item.label}
            href={item.href}
            childRoutes={item.childRoutes}
            isCollapsed={false}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};