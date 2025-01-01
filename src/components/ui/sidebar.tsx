import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Coins,
  Settings,
  Wallet,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { gsap } from "gsap";

interface SidebarItem {
  icon: typeof BarChart3;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: BarChart3, label: "Dashboard", href: "/" },
  { icon: Coins, label: "Markets", href: "/markets" },
  { icon: Wallet, label: "Portfolio", href: "/portfolio" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (expanded) {
      // Collapse sequence
      const tl = gsap.timeline();
      
      // 1. Stagger fade out both icons and labels
      tl.to([".menu-icon", ".menu-label"], {
        opacity: 0,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "start"
        }
      })
      // 2. After fade out completes, collapse sidebar
      .to(sidebarRef.current, {
        width: "5rem",
        duration: 0.3,
        ease: "power2.inOut"
      })
      // Adjust link container styles
      .to(linksRef.current, {
        justifyContent: "center",
        duration: 0
      })
      // 3. After collapse completes, stagger fade in icons only
      .to(".menu-icon", {
        opacity: 1,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "start"
        }
      });
    } else {
      // Expand sequence
      const tl = gsap.timeline();

      // 1. Stagger fade out icons
      tl.to(".menu-icon", {
        opacity: 0,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "start"
        }
      })
      // 2. After fade out completes, expand sidebar
      .to(sidebarRef.current, {
        width: "16rem",
        duration: 0.3,
        ease: "power2.inOut"
      })
      // Adjust link container styles
      .to(linksRef.current, {
        justifyContent: "flex-start",
        duration: 0
      })
      // 3. After expand completes, stagger fade in both icons and labels
      .to([".menu-icon", ".menu-label"], {
        opacity: 1,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "start"
        }
      });
    }

    setExpanded(!expanded);
  };

  return (
    <aside
      ref={sidebarRef}
      className="relative flex h-screen flex-col border-r bg-card px-3 py-4 w-64"
    >
      <div className="flex items-center justify-end py-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleToggle}
        >
          {expanded ? (
            <ChevronFirst className="h-4 w-4" />
          ) : (
            <ChevronLast className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 space-y-2">
        {sidebarItems.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            ref={linksRef}
            className="flex items-center rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-(--accent) hover:text-accent-foreground"
          >
            <Icon className="menu-icon h-5 w-5 shrink-0" />
            <span className="menu-label ml-3 text-sm font-medium">
              {label}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}