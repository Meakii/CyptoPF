import { useEffect, useState, useRef } from 'react';
import { useLocation } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const FOCUSABLE_ELEMENTS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTabbed, setHasTabbed] = useState(false);
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Reset state on route change
  useEffect(() => {
    setHasTabbed(false);
    setIsVisible(false);
  }, [location.pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab' && !e.shiftKey && !hasTabbed) {
        e.preventDefault(); // Prevent default tab behavior
        setHasTabbed(true);
        setIsVisible(true);
      }
    }

    document.addEventListener('keydown', handleKeyDown, true); // Use capture phase
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [hasTabbed]);

  // Focus the button when it becomes visible
  useEffect(() => {
    if (isVisible && buttonRef.current) {
      requestAnimationFrame(() => {
        buttonRef.current?.focus();
      });
    }
  }, [isVisible]);

  const handleBlur = () => {
    requestAnimationFrame(() => {
      const activeElement = document.activeElement;
      if (activeElement?.id !== 'main-content') {
        setIsVisible(false);
      }
    });
  };

  const handleClick = () => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Find the first focusable element after the header
    const header = document.querySelector('header');
    const focusableElements = mainContent.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
    
    let firstFocusableElement: HTMLElement | null = null;
    
    // Find the first focusable element that comes after the header
    for (const element of focusableElements) {
      if (header && element.getBoundingClientRect().top > header.getBoundingClientRect().bottom) {
        firstFocusableElement = element;
        break;
      }
    }

    if (firstFocusableElement) {
      requestAnimationFrame(() => {
        firstFocusableElement?.focus();
        setIsVisible(false);
      });
    } else {
      // Fallback to focusing main content if no focusable element is found
      mainContent.focus();
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={buttonRef}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          onBlur={handleBlur}
          className={cn(
            "fixed top-0 left-1/2 -translate-x-1/2 z-50",
            "px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)]",
            "rounded-b-md shadow-md",
            "focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          )}
        >
          Skip to content
        </motion.button>
      )}
    </AnimatePresence>
  );
}