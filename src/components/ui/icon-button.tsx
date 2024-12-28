import { cn } from "@/lib/utils";
import { Button } from "./button";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconComponent;
  variant?: "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export function IconButton({ 
  icon: Icon,
  className,
  variant = "ghost",
  size = "icon",
  ...props 
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("", className)}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

// import { cn } from "@/lib/utils";
// import { Button } from "./button";
// import { LucideIcon } from "lucide-react";

// interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   icon: LucideIcon;
//   variant?: "ghost" | "outline";
//   size?: "default" | "sm" | "lg" | "icon";
// }

// export function IconButton({ 
//   icon: Icon,
//   className,
//   variant = "ghost",
//   size = "icon",
//   ...props 
// }: IconButtonProps) {
//   return (
//     <Button
//       variant={variant}
//       size={size}
//       className={cn("", className)}
//       {...props}
//     >
//       <Icon className="h-4 w-4" />
//     </Button>
//   );
// }