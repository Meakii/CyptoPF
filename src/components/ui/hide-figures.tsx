import { useHideFigures } from '@/lib/store/hide-figures';
// import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
// import { IconButton } from '@/components/ui/icon-button';
// import { Tooltip } from '@/components/ui/tooltip';

interface HideFiguresProps {
  value: string | number;
  className?: string;
}

// export function HideFiguresToggle() {
//   const { isHidden, toggle } = useHideFigures();
  
//   return (
//     <Tooltip content={isHidden ? "Show figures" : "Hide figures"}>
//       <IconButton
//         icon={isHidden ? ViewIcon : ViewOffSlashIcon}
//         onClick={toggle}
//         className="h-6 w-6"
//         aria-label={isHidden ? "Show figures" : "Hide figures"}
//       />
//     </Tooltip>
//   );
// }

export function HiddenFigure({ value, className }: HideFiguresProps) {
  const { isHidden } = useHideFigures();

  // Convert value to string to ensure correct character count
  const valueStr = String(value);

  // Replace each visible character with a dot
  const hiddenValue = valueStr.replace(/\S/g, "•");

  return (
    <span className={className}>
      {isHidden ? hiddenValue : valueStr}
    </span>
  );
}