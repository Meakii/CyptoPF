import {
  HelpCircleIcon,
  SecurityWifiIcon,
  Ticket01Icon,
  BubbleChatIcon,
} from "hugeicons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function HelpMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`
            p-2 rounded-lg
            hover:bg-(--accent)/80 transition-colors
            focus:outline-hidden focus:ring-2
            focus:ring-ring
          `}
        >
          <HelpCircleIcon className="w-5 h-5 text-(--muted-foreground)" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <HelpCircleIcon className="w-4 h-4 mr-2" />
          <span>Support center</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Ticket01Icon className="w-4 h-4 mr-2" />
          <span>Submit a ticket</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SecurityWifiIcon className="w-4 h-4 mr-2" />
          <span>Status page</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BubbleChatIcon className="w-4 h-4 mr-2" />
          <span>Give feedback</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
