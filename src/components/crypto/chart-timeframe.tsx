import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type TimeFrame = '1D' | '1W' | '1M' | '6M' | '1Y';

interface ChartTimeFrameProps {
  value: TimeFrame;
  onValueChange: (value: TimeFrame) => void;
}

export function ChartTimeFrame({ value, onValueChange }: ChartTimeFrameProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => onValueChange(value as TimeFrame)}
      className="flex items-center space-x-2"
    >
      {(['1D', '1W', '1M', '6M', '1Y'] as const).map((timeframe) => (
        <div key={timeframe} className="flex items-center space-x-2">
          <RadioGroupItem value={timeframe} id={timeframe} className="peer sr-only" />
          <Label
            htmlFor={timeframe}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground hover:bg-muted cursor-pointer"
          >
            {timeframe}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}