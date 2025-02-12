import {
  ChartLineData01Icon,
  DiscoverCircleIcon,
  CoinsSwapIcon,
  MoneyReceiveCircleIcon,
  WalletAdd01Icon,
  CircleArrowUpRightIcon,
  SquareArrowDataTransferDiagonalIcon
} from "hugeicons-react";

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
      { icon: ChartLineData01Icon, label: "Dashboard", href: "/" },
      {
        icon: DiscoverCircleIcon,
        label: "Explore",
        href: "/explore",
        childRoutes: ["/explore/$cryptoId"],
      },
      {
        icon: CoinsSwapIcon,
        label: "Buy / Sell",
        href: "/crypto",
        childRoutes: ["/buy-sell/bitcoin", "/buy-sell/$cryptoId"],
      },
      {
        icon: MoneyReceiveCircleIcon,
        label: "Deposit cash",
        href: "/deposit-aud",
      },
      { icon: CircleArrowUpRightIcon, label: "Withdraw", href: "/withdraw" },
      { icon: WalletAdd01Icon, label: "Deposit Crypto", href: "/deposit-crypto" },
      { icon: SquareArrowDataTransferDiagonalIcon, label: "Transactions", href: "/transactions" },
    ],
  },
];
