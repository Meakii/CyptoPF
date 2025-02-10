export type CurrencySymbol = '$' | '€' | '£' | '¥' | 'A$'  | 'AUD';

interface CurrencyConfig {
  symbol: CurrencySymbol;
  position: 'prefix' | 'suffix';
}

// Can be expanded to include more currencies as needed
export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  USD: { symbol: '$', position: 'prefix' },
  AUD: { symbol: '$', position: 'prefix' },
  EUR: { symbol: '€', position: 'suffix' },
  GBP: { symbol: '£', position: 'prefix' },
  JPY: { symbol: '¥', position: 'prefix' },
};

// Default currency 
export const DEFAULT_CURRENCY = 'AUD';

function formatDecimals(value: number, decimals: number = 2): string {
  // Convert to string and split into whole and decimal parts
  const [whole, decimal] = value.toString().split('.');
  
  if (!decimal) {
    return `${whole}.${'0'.repeat(decimals)}`;
  }

  // If decimal is longer than desired places, round it
  if (decimal.length > decimals) {
    const nextDigit = parseInt(decimal[decimals]);
    const currentValue = parseInt(decimal.slice(0, decimals));
    
    // Round up or down based on the next digit
    if (nextDigit >= 5) {
      const rounded = (currentValue + 1).toString().padEnd(decimals, '0');
      return `${whole}.${rounded}`;
    }
    return `${whole}.${decimal.slice(0, decimals)}`;
  }

  // Pad with zeros if needed
  return `${whole}.${decimal.padEnd(decimals, '0')}`;
}

// Helper function to format currency
export function parseAndFormatCurrency(value: string | number, currency: string = DEFAULT_CURRENCY, decimals: number = 2): string {
  const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS[DEFAULT_CURRENCY];
  
  // Convert string to number if needed
  let numericValue: number;
  if (typeof value === 'string') {
    // Remove currency symbols and commas, then parse
    numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  } else {
    numericValue = value;
  }
  
  // Check if the value is a valid number
  if (isNaN(numericValue)) return "-";
  
  // Format the number with specified decimals
  const formatted = formatDecimals(numericValue, decimals);
  
  // Add thousand separators
  const [whole, decimal] = formatted.split('.');
  const withSeparators = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Add currency symbol in correct position
  return config.position === 'prefix'
    ? `${config.symbol}${withSeparators}.${decimal}`
    : `${withSeparators}.${decimal}${config.symbol}`;
}

export function stripCurrencySymbols(value: string): string {
  // Remove all non-numeric characters except decimal points and minus signs
  return value.replace(/[^\d.-]/g, '').trim();
}

export function formatShortCurrency(value: number): string {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    notation: 'compact',
    maximumFractionDigits: 1
  });
  return formatter.format(value);
}

// Format numbers in a compact way for chart axes
export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return parseAndFormatCurrency(value);
}

export function calculateChartYAxisTicks(min: number, max: number): number[] {
  const range = max - min;
  const step = calculateTickStep(max);
  
  // Calculate rounded min and max values
  const roundedMin = Math.floor(min / step) * step;
  const roundedMax = Math.ceil(max / step) * step;
  
  // Generate 5 evenly spaced ticks
  const ticks = [];
  for (let i = 0; i <= 4; i++) {
    const tick = roundedMin + (i * (roundedMax - roundedMin) / 4);
    ticks.push(tick);
  }
  
  return ticks;
}

function calculateTickStep(maxValue: number): number {
  if (maxValue < 10) {
    return 0.01; // Round to nearest cent for values under $10
  } else if (maxValue < 100) {
    return 10; // Round to nearest $10 for values under $100
  } else if (maxValue < 1000) {
    return 50; // Round to nearest $50 for values under $1000
  } else if (maxValue < 10000) {
    return 100; // Round to nearest $100 for values under $10000
  } else {
    return 1000; // Round to nearest $1000 for values over $10000
  }
}