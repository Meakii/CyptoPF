import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Sidebar from '@/components/navigation/Sidebar'
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/navigation/MobileMenu';

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
          <AnimatePresence mode="wait" initial={false}>
            <div key={location.pathname}>
              <Outlet />
            </div>
          </AnimatePresence>
        </main>
        <MobileMenu />
      </div>
    );
  },
});

// import { createRootRoute, Outlet } from '@tanstack/react-router';
// import { ThemeProvider } from '@/components/theme-provider';
// import { DesktopNav } from '@/components/navigation/desktop-nav';
// import { MobileNav } from '@/components/navigation/mobile-nav';
// import { PageTransition } from '@/components/layout/page-transition';

// export const Route = createRootRoute({
//   component: () => (
//     <ThemeProvider defaultTheme="dark" storageKey="crypto-theme">
//       <div className="flex min-h-screen">
//         <DesktopNav />
//         <main className="flex-1 overflow-y-auto bg-background pb-[4.5rem] lg:pb-0">
//           <PageTransition>
//             <Outlet />
//           </PageTransition>
//         </main>
//         <MobileNav />
//       </div>
//     </ThemeProvider>
//   ),
// });