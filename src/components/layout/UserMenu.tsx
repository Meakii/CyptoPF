import { LogOut, User, Monitor, Moon, Sun, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useHideFigures } from '@/lib/store/hide-figures';
// import { cn } from '@/lib/utils';

export function UserMenu() {
  const { theme, setTheme } = useTheme();
  const { isHidden, toggle } = useHideFigures();

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'light':
        return <Sun className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Dark';
      case 'light':
        return 'Light';
      default:
        return 'System';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`
            flex items-center justify-center
            w-8 h-8 rounded-full
            bg-[var(--primary)] text-[var(--primary-foreground)]
            hover:bg-[var(--primary)]/90 transition-colors
            focus:outline-hidden focus:ring-2
            focus:ring-ring
          `}
        >
          <span className="text-sm font-medium">J</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-4">
          <div className="border-b pb-4 border-[var(--border)]">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">Johnny Cash</p>
                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
          </div>
          <nav className="space-y-2">
            <Link
              to="/profile"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-(--accent)/80 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            
            <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm">
              <div className="flex items-center space-x-2">
                {getThemeIcon()}
                <span>Theme</span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{getThemeLabel()}</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem 
                    checked={theme === 'light'}
                    onCheckedChange={() => setTheme('light')}
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                    {theme === 'light' && <Check className="w-4 h-4 ml-auto" />}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme('dark')}
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                    {theme === 'dark' && <Check className="w-4 h-4 ml-auto" />}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={theme === 'system'}
                    onCheckedChange={() => setTheme('system')}
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    System
                    {theme === 'system' && <Check className="w-4 h-4 ml-auto" />}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              onClick={toggle}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-(--accent)/80 transition-colors"
            >
              <div className="flex items-center space-x-2">
                {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isHidden ? 'Show figures' : 'Hide figures'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted border">⇧</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted border">H</kbd>
              </div>
            </button>

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