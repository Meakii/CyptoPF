import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0
  },
  exit: { 
    opacity: 0,
    y: 20
  }
};

const pageTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1.0],
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="p-0"
    >
      {children}
    </motion.div>
  );
}