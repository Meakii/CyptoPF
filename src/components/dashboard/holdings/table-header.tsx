import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface TableHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  showOnlyHoldings: boolean;
  onShowOnlyHoldingsChange: (checked: boolean) => void;
}

export function TableHeader({
  search,
  onSearchChange,
  showOnlyHoldings,
  onShowOnlyHoldingsChange
}: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <CardTitle>Holdings Summary</CardTitle>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="holdings"
            checked={showOnlyHoldings}
            onCheckedChange={(checked) => onShowOnlyHoldingsChange(!!checked)}
          />
          <label
            htmlFor="holdings"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Current holdings
          </label>
        </div>
        <Input
          placeholder="Search assets..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[200px]"
        />
      </div>
    </div>
  );
}