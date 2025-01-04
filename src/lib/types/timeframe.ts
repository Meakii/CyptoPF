export type TimeFrame = '1D' | '1W' | '1M' | '6M' | '1Y';

export type ChartTimeFrameProps = {
  value: TimeFrame;
  onValueChange: (value: TimeFrame) => void;
}