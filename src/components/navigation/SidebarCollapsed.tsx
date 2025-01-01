import { motion } from 'framer-motion';
import { MenuSection } from './MenuSection';
import { menuSections } from '@/config/menuItems';

interface SidebarCollapsedProps {
  onExpand: () => void;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
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
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: { 
    opacity: 0,
    y: 8,
    transition: { 
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const SidebarCollapsed = ({ onExpand }: SidebarCollapsedProps) => {
  return (
    <motion.div
      className="mt-8 sticky top-0"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {menuSections.map((section, index) => (
        <MenuSection
          key={index}
          section={section}
          isCollapsed={true}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
};