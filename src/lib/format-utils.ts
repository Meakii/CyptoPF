import { TimeFrame } from "@/components/crypto/chart-timeframe";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function formatChartTime(timestamp: number, timeframe: TimeFrame): string {
  const date = utcToZonedTime(timestamp * 1000, "Australia/Sydney");
  
  switch (timeframe) {
    case "1D":
      return format(date, "h:mma");
    default:
      return format(date, "h:mma, MMM d");
  }
}

export async function formatUSDToAUD(usdPrice: number): Promise<string> {
  const formatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=AUD");
    const data = await response.json();
    const audPrice = usdPrice * data.rates.AUD;
    return formatter.format(audPrice);
  } catch (error) {
    console.error("Failed to convert currency:", error);
    // Use the same formatter in the error case for consistency
    return formatter.format(usdPrice);
  }
}