import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HiddenFigure } from "@/components/ui/hide-figures";
import { Tooltip } from "@/components/ui/tooltip";
import { ElementType, ComponentProps } from "react";

interface StatsCardProps {
  icon: ElementType;
  label: string;
  value: string;
  info: string;
  className?: string;
  iconProps?: ComponentProps<ElementType>;
}

export function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  info, 
  className,
  iconProps 
}: StatsCardProps) {
  return (
    <div className="p-[1px] rounded-[var(--radius-md)] relative 
    bg-[linear-gradient(71deg,var(--border),var(--color-blue-900),var(--border))]">

      <Card className={cn(
        "relative rounded-[var(--radius-md)]  p-4 h-full border-0 flex flex-col",
        className
      )}>
        <div className="flex justify-between items-start">
          <div className="flex items-center justify-center size-7 relative">
            <Icon className="relative z-10 text-[var(--primary)] h-7 w-7" {...iconProps} />
          </div>
          <Tooltip content={info}>
            <button className="text-muted-foreground hover:text-foreground focus:text-foreground transition-colors">
              <Info className="h-4 w-4" />
              <span className="sr-only">More information about {label}</span>
            </button>
          </Tooltip>
        </div>
        <div className="mt-auto space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <HiddenFigure 
            value={value} 
            className="btcm-heading-xl"
          />
        </div>
      </Card>
    </div>
  );
}

// import { cn } from "@/lib/utils";
// import { Info } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { HiddenFigure } from "@/components/ui/hide-figures";
// import { Tooltip } from "@/components/ui/tooltip";
// import { ElementType, ComponentProps } from "react";

// interface StatsCardProps {
//   icon: ElementType;
//   label: string;
//   value: string;
//   info: string;
//   className?: string;
//   iconProps?: ComponentProps<ElementType>;
// }

// export function StatsCard({ 
//   icon: Icon, 
//   label, 
//   value, 
//   info, 
//   className,
//   iconProps 
// }: StatsCardProps) {
//   return (
//     <Card className={cn("h-full p-4 relative border-transparent border-2 flex flex-col bg-clip-padding",
//     "after:absolute after:-top-[1px] after:-bottom-[1px] after:-left-[1px] after:-right-[1px] after:content-['']",
//     "after:bg-[linear-gradient(71deg,#0c0a0e,[var(--color-blue-500)],#0c0a0e)] after:-z-[1]",

        
//       className)}>
//       <div className="flex justify-between items-start">
//         <Icon className="h-5 w-5 text-muted-foreground" {...iconProps} />
//         <Tooltip content={info}>
//           <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] focus:text-[var(--foreground)]transition-colors">
//             <Info className="h-4 w-4" />
//             <span className="sr-only">More information about {label}</span>
//           </button>
//         </Tooltip>
//       </div>
//       <div className="mt-auto space-y-1">
//         <p className="text-sm text-muted-foreground">{label}</p>
//         <HiddenFigure 
//           value={value} 
//           className="btcm-heading-xl"
//         />
//       </div>
//     </Card>
//   );
// }