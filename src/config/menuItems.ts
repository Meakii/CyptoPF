import { 
  LayoutDashboard, 
  Coins, 
  DollarSign, 
  ArrowUpDown,
  Upload,
  Download,
  Clock
} from 'lucide-react';

export interface MenuItem {
  icon: any;
  label: string;
  href: string;
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
      { icon: Coins, label: "Crypto", href: "/crypto" }
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