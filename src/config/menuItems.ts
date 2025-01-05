import { 
  LayoutDashboard, 
  Coins, 
  DollarSign, 
  ArrowUpDown,
  Upload,
  Clock
} from 'lucide-react';

export interface MenuItem {
  icon: any;
  label: string;
  href: string;
  childRoutes?: string[]; 
}

export interface MenuSectionType {
  title: string;
  items: MenuItem[];
}

export const menuSections: MenuSectionType[] = [
  {
    title: "Explore",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" }
    ]
  },
  {
    title: "Buy / sell assets",
    items: [
      { 
        icon: Coins, 
        label: "Crypto", 
        href: "/crypto",
        childRoutes: ['/buy-sell/bitcoin', '/buy-sell/$cryptoId'] 
      }
    ]
  },
  
  {
    title: "Deposit",
    items: [
      { icon: DollarSign, label: "AUD", href: "/deposit-aud" }
    ]
  },
  {
    title: "Advanced platform",
    items: [
      { icon: ArrowUpDown, label: "Withdraw", href: "/withdraw" },
      { icon: Upload, label: "Deposit crypto", href: "/deposit-crypto" },
      { icon: Clock, label: "Transactions", href: "/transactions" }
    ]
  }
];

// Utility function to check if a route is active
export const isRouteActive = (menuItem: MenuItem, currentPath: string): boolean => {
  // Check direct match
  if (currentPath === menuItem.href) return true;
  
  // Check child routes if they exist
  if (menuItem.childRoutes) {
    return menuItem.childRoutes.some(childRoute => {
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

// import { 
//   LayoutDashboard, 
//   Coins, 
//   DollarSign, 
//   ArrowUpDown,
//   Upload,
//   Clock
// } from 'lucide-react';

// export interface MenuItem {
//   icon: any;
//   label: string;
//   href: string;
// }

// export interface MenuSectionType {
//   title: string;
//   items: MenuItem[];
// }

// export const menuSections: MenuSectionType[] = [
//   {
//     title: "Explore",
//     items: [
//       { icon: LayoutDashboard, label: "Dashboard", href: "/" }
//     ]
//   },
//   {
//     title: "Buy / sell assets",
//     items: [
//       { icon: Coins, label: "Crypto", href: "/crypto" }
//     ]
//   },
//   {
//     title: "Deposit",
//     items: [
//       { icon: DollarSign, label: "AUD", href: "/deposit-aud" }
//     ]
//   },
//   {
//     title: "Advanced platform",
//     items: [
//       { icon: ArrowUpDown, label: "Withdraw", href: "/withdraw" },
//       { icon: Upload, label: "Deposit crypto", href: "/deposit-crypto" },
//       { icon: Clock, label: "Transactions", href: "/transactions" }
//     ]
//   }
// ];