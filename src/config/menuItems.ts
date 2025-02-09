import { 
  LayoutDashboard, 
  Coins, 
  DollarSign, 
  ArrowUpDown,
  Upload,
  Clock,
  LineChart
} from 'lucide-react';

export interface MenuItem {
  icon: any;
  label: string;
  href: string;
  childRoutes?: string[]; 
}

export interface MenuSectionType {
  items: MenuItem[];
}

export const menuSections: MenuSectionType[] = [
  {
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      { 
        icon: LineChart, 
        label: "Assets", 
        href: "/assets",
        childRoutes: ['/assets/$cryptoId']
      },
      { 
        icon: Coins, 
        label: "Buy / Sell", 
        href: "/crypto",
        childRoutes: ['/buy-sell/bitcoin', '/buy-sell/$cryptoId'] 
      },
      { icon: DollarSign, label: "Deposit AUD", href: "/deposit-aud" },
      { icon: ArrowUpDown, label: "Withdraw", href: "/withdraw" },
      { icon: Upload, label: "Deposit Crypto", href: "/deposit-crypto" },
      { icon: Clock, label: "Transactions", href: "/transactions" }
    ]
  }
];