import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface PriceCardProps {
  title: string;
  price: string;
  change: number;
  icon: React.ElementType;
}

export function PriceCard({ title, price, change, icon: Icon }: PriceCardProps) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{price}</div>
        <div className="flex items-center text-xs">
          {isPositive ? (
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span
            className={cn(
              "font-medium",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground ml-1">from last 24h</span>
        </div>
      </CardContent>
    </Card>
  );
}