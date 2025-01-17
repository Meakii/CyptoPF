import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type TimeFrame = "1D" | "1W" | "1M" | "6M" | "1Y";

interface ChartTimeFrameProps {
  value: TimeFrame;
  onValueChange: (value: TimeFrame) => void;
}

export function ChartTimeFrame({ value, onValueChange }: ChartTimeFrameProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => onValueChange(value as TimeFrame)}
      className="flex items-center
      px-1 py-1 h-10 gap-x-1
      border-(--border) 
      border-1 bg-(--layer-high) 
      rounded-(--radius-md)"
    >
      {(["1D", "1W", "1M", "6M", "1Y"] as const).map((timeframe) => (
        <div key={timeframe} className="flex items-center">
          <RadioGroupItem
            value={timeframe}
            id={timeframe}
            className="peer sr-only"
          />
          {/* <Label
            htmlFor={timeframe}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground hover:bg-muted cursor-pointer"
          >
            {timeframe}
          </Label> */}

          <label
            htmlFor={timeframe}
            className={cn(
              "btcm-label-sm rounded-sm px-3 cursor-pointer h-8 flex items-center outline-offset-0",
              "rounded-(--radius-sm)",
              "text-(--tab-foreground)",
              "disabled:cursor-not-allowed",
              "hover:outline-(--border) hover:outline-1 hover:text-(--tab-foreground-hover)",
              "peer-[&[aria-checked='true']]:outline-(--muted-border)",
              "peer-[&[aria-checked='true']]:outline-1",
              "peer-[&[aria-checked='true']]:bg-(--tab-background-active)",
              "peer-[&[aria-checked='true']]:text-(--tab-foreground-active)",
              "peer-focus-visible:ring-1 peer-focus-visible:ring-(--ring) peer-focus-visible:ring-offset-1"
            )}
          >
            {timeframe}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
