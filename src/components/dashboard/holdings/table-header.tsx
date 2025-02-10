import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TableHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function TableHeader({
  search,
  onSearchChange,
}: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="text-(--muted-foreground)">Holdings Summary</CardTitle>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search assets..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[200px] h-[44px]"
        />
      </div>
    </div>
  );
}