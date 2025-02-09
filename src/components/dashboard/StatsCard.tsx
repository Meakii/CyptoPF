import { cn } from "@/lib/utils";
import { DivideIcon as LucideIcon, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HiddenFigure } from "@/components/ui/hide-figures";
import { Tooltip } from "@/components/ui/tooltip";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  info: string;
  className?: string;
}

export function StatsCard({ icon: Icon, label, value, info, className }: StatsCardProps) {
  return (
    <Card className={cn("p-4 border-[var(--border)] bg-[var(--background)] border", className)}>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <Tooltip content={info}>
            <button className="text-muted-foreground hover:text-foreground focus:text-foreground transition-colors">
              <Info className="h-4 w-4" />
              <span className="sr-only">More information about {label}</span>
            </button>
          </Tooltip>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <HiddenFigure 
            value={value} 
            className="btcm-heading-xl"
          />
        </div>
      </div>
    </Card>
  );
}