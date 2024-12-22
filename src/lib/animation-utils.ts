import { stagger } from "framer-motion";

export const SIDEBAR_DURATION = 0.3;

export const menuStaggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (isReverse: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: isReverse ? -1 : 1,
      ease: (p: number) => Math.sin(p * Math.PI / 2), // Smooth sine easing
    },
  }),
  exit: (isReverse: boolean) => ({
    opacity: 0,
    y: isReverse ? -20 : 20,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: isReverse ? -1 : 1,
      ease: (p: number) => Math.sin(p * Math.PI / 2),
    },
  }),
};

export const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
      ease: (p: number) => Math.sin(p * Math.PI / 2),
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.2,
      ease: (p: number) => Math.sin(p * Math.PI / 2),
    }
  },
};