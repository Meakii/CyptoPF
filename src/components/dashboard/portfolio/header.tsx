import { CardTitle } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { TimeFrame, ChartTimeFrame } from "@/components/crypto/chart-timeframe";

interface PortfolioHeaderProps {
  isValueHidden: boolean;
  onToggleHide: () => void;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
}

export function PortfolioHeader({
  isValueHidden,
  onToggleHide,
  timeframe,
  onTimeframeChange
}: PortfolioHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <CardTitle>Portfolio value</CardTitle>
      <div className="flex items-center gap-4">
        <IconButton
          icon={isValueHidden ? ViewIcon : ViewOffSlashIcon}
          onClick={onToggleHide}
          aria-label={isValueHidden ? "Show portfolio value" : "Hide portfolio value"}
        />
        <ChartTimeFrame value={timeframe} onValueChange={onTimeframeChange} />
      </div>
    </div>
  );
}