import React from 'react';
import { Link } from '@tanstack/react-router';
import { LayoutDashboard, Coins, DollarSign, Menu } from 'lucide-react';

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Coins, label: 'Buy/Sell', href: '/crypto' },
  { icon: DollarSign, label: 'Deposit', href: '/deposit-aud' },
];

interface BottomNavProps {
  onOpenMenu: () => void;
}

export function BottomNav({ onOpenMenu }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t lg:hidden border-(--muted-border) z-50">
      <div className="flex items-center justify-between px-4">
        {mainMenuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex flex-col items-center py-3 flex-1"
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center py-3 flex-1"
        >
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-xs">Menu</span>
        </button>
      </div>
    </nav>
  );
}