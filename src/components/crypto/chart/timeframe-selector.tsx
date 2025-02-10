// import { TimeFrame } from "../chart-timeframe";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface TimeFrameSelectorProps {
  value: TimeFrame;
  onValueChange: (value: TimeFrame) => void;
}

 export type TimeFrame = '1D' | '1W' | '1M' | '6M' | '1Y';

export function TimeFrameSelector({
  value,
  onValueChange,
}: TimeFrameSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => onValueChange(value as TimeFrame)}
      className="flex 
      items-center 
      px-1 py-1 h-10 gap-x-1
      border-(--border) 
      border-1 bg-[var(--layer-high)] 
      rounded-(--radius-md)"
      >
      {(["1D", "1W", "1M", "6M", "1Y"] as const).map((timeframe) => (
        <div key={timeframe} className="flex items-center relative">
          <RadioGroupItem
            value={timeframe}
            id={timeframe}
            aria-checked={timeframe === value}
            className={cn(
              "sr-only peer "
            )}
          />
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
              "peer-[&[aria-checked='true']]:outline",
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

// import { TimeFrame } from "../chart-timeframe";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { cn } from "@/lib/utils";

// interface TimeFrameSelectorProps {
//   value: TimeFrame;
//   onValueChange: (value: TimeFrame) => void;
// }

// export function TimeFrameSelector({
//   value,
//   onValueChange,
// }: TimeFrameSelectorProps) {
//   return (
//     <RadioGroup
//       value={value}
//       onValueChange={(value) => onValueChange(value as TimeFrame)}
//       className="flex items-center px-1 py-1"
//     >
//       {(["1D", "1W", "1M", "6M", "1Y"] as const).map((timeframe) => (
//         <div key={timeframe} className="flex items-center space-x-2">
//           <RadioGroupItem
//             value={timeframe}
//             id={timeframe}
//             className="sr-only"
//           />
//           <label
//             htmlFor={timeframe}
//             aria-checked={timeframe === value}
//             className={cn(
//               "btcm-label-sm rounded-sm px-3 cursor-pointer h-8 flex items-center",
//               "rounded-(--radius-sm) shadow-sm",
//               "focus-visible:ring-1 focus-visible:ring-(--ring)",
//               "disabled:cursor-not-allowed",
//               "hover:bg-(--tab-background-hover)",
//               "[&[aria-checked='true']]:border-(--muted-border)",
//               "[&[aria-checked='true']]:bg-(--tab-background-active)",
//               "[&[aria-checked='true']]:text-(--tab-foreground-active)"
//             )}
//           >
//             {timeframe}
//           </label>
//         </div>
//       ))}
//     </RadioGroup>
//   );
// }
// import { TimeFrame } from "../chart-timeframe";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { cn } from "@/lib/utils";

// interface TimeFrameSelectorProps {
//   value: TimeFrame;
//   onValueChange: (value: TimeFrame) => void;
// }

// export function TimeFrameSelector({
//   value,
//   onValueChange,
// }: TimeFrameSelectorProps) {
//   return (
//     <RadioGroup
//       value={value}
//       onValueChange={(value) => onValueChange(value as TimeFrame)}
//       className="flex items-center px-1 py-1"
//     >
//       {(["1D", "1W", "1M", "6M", "1Y"] as const).map((timeframe) => (
//         <div key={timeframe} className="flex items-center space-x-2">
//           <label
//             htmlFor={timeframe}
//             className={cn(
//               "btcm-label-sm rounded-md py-2 px-3 cursor-pointer relative",
//               "rounded-(--radius-sm) shadow-sm",
//               "focus-visible:ring-1 focus-visible:ring-(--ring)",
//               "disabled:cursor-not-allowed",
//               "hover:bg-(--tab-background-hover)",
//               "&:has([aria-checked='true']):border-(--muted-border)",
//               "&:has([aria-checked='true']):bg-(--tab-background-active)",
//               "&:has([aria-checked='true']):text-(--tab-foreground-active)"
//             )}
//           >
//             <RadioGroupItem
//               value={timeframe}
//               id={timeframe}
//               className="sr-only absolute"
//             />
//             {timeframe}
//           </label>
//         </div>
//       ))}
//     </RadioGroup>
//   );
// }

// import { TimeFrame } from "../chart-timeframe";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { Label } from '@/components/ui/label';
// import { cn } from "@/lib/utils";

// interface TimeFrameSelectorProps {
//   value: TimeFrame;
//   onValueChange: (value: TimeFrame) => void;
// }

// export function TimeFrameSelector({
//   value,
//   onValueChange,
// }: TimeFrameSelectorProps) {
//   return (
//     <RadioGroup
//       value={value}
//       onValueChange={(value) => onValueChange(value as TimeFrame)}
//       className="flex items-center px-1 py-1"
//     >
//       {(["1D", "1W", "1M", "6M", "1Y"] as const).map((timeframe) => (
//         <div key={timeframe} className="flex items-center space-x-2">
//           <RadioGroupItem
//             value={timeframe}
//             id={timeframe}
//             className=" sr-only

//           "
//           />
//           <label
//             htmlFor={timeframe}
//             className={cn(
//               "btcm-label-sm rounded-md py-2 px-3  cursor-pointer",
//               "rounded-(--radius-sm) shadow-sm",
//               "focus-visible:ring-1 focus-visible:ring-(--ring)",
//               "disabled:cursor-not-allowed",
//               "hover:bg-(--tab-background-hover)",
//               // "bg-(--tab-background-active)",
//               // "disabled:opacity-50",
//               "&:has([aria-checked='true']):border-(--muted-border)",
//               "&:has([aria-checked='true']):bg-(--tab-background-active)",
//               "&:has([aria-checked='true']):text-(--tab-foreground-active)"
//             )}
//           >
//             {timeframe}
//           </label>
//         </div>
//       ))}
//     </RadioGroup>
//   );
// }
