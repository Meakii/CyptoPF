import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { SkipToContent } from '@/components/layout/SkipToContent';

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
      if (!isAnimating) {
        setIsAnimating(true);
        setIsCollapsed(!isCollapsed);
      }
    };

    const handleAnimationComplete = () => {
      setIsAnimating(false);
    };
    
    return (
      <div className="flex bg-background text-foreground">
        <SkipToContent />
        <Sidebar 
          className="hidden lg:block" 
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
          onAnimationComplete={handleAnimationComplete}
        />
        <main className="flex-1 min-h-screen pb-20 lg:pb-0">
          <Header 
            isCollapsed={isCollapsed}
            onToggle={handleToggle}
            isAnimating={isAnimating}
          />
          <div id="main-content" tabIndex={-1} className="outline-none">
            <AnimatePresence mode="wait" initial={false}>
              <div key={location.pathname}>
                <Outlet />
              </div>
            </AnimatePresence>
          </div>
        </main>
        <MobileMenu />
      </div>
    );
  },
});