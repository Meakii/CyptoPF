import { Drawer as VaulDrawer } from 'vaul';
import { Link } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { menuSections } from '@/config/menuItems';

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuDrawer({ open, onOpenChange }: MenuDrawerProps) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content className="bg-[var(--background)] flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-[var(--background)]  rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted mb-8" />
            <div className="max-w-md mx-auto">
              <VaulDrawer.Title className="font-medium mb-4">Advanced Platform</VaulDrawer.Title>
              <nav className="space-y-4">
                {menuSections
                  .find(section => section.title === "Advanced platform")
                  ?.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg",
                        "hover:bg-(--accent)/80 transition-colors"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
              </nav>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}