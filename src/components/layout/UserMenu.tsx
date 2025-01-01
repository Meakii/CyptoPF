import { User, LogOut } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export function UserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`
            p-2 rounded-lg
            hover:bg-(--accent)/80 transition-colors
            focus:outline-hidden focus:ring-2
            focus:ring-ring
          `}
        >
          <User className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-2">
          <div className="border-b pb-2 border-[var(--muted-border)]">
            <p className="text-sm font-medium">john.doe@example.com</p>
          </div>
          <nav className="space-y-1">
            <Link
              to="/profile"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-(--accent)/80 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <button
              onClick={() => console.log('Logout clicked')}
              className="w-full flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </nav>
        </div>
      </PopoverContent>
    </Popover>
  );
}