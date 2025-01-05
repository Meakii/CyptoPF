export type CurrencySymbol = '$' | '€' | '£' | '¥' | 'A$'  | 'AUD';

interface CurrencyConfig {
  symbol: CurrencySymbol;
  position: 'prefix' | 'suffix';
}

// Can be expanded to include more currencies as needed
export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  USD: { symbol: '$', position: 'prefix' },
  AUD: { symbol: 'A$', position: 'prefix' },
  EUR: { symbol: '€', position: 'suffix' },
  GBP: { symbol: '£', position: 'prefix' },
  JPY: { symbol: '¥', position: 'prefix' },
};

// Default currency 
export const DEFAULT_CURRENCY = 'AUD';

// Helper function to format currency
export function parseAndFormatCurrency(value: string | number, currency: string = DEFAULT_CURRENCY): string {
  const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS[DEFAULT_CURRENCY];
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value;
  
  // Check if the value is a valid number
  if (isNaN(numericValue)) return "-"; // Return fallback if invalid
  
  // Format the number with appropriate decimal places
  const formattedValue = numericValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  // Return formatted currency value with symbol
  return config.position === 'prefix'
    ? `${config.symbol}${formattedValue}`
    : `${formattedValue}${config.symbol}`;
}

export function stripCurrencySymbols(value: string): string {
    // Remove symbols while preserving numeric formatting (e.g., commas, decimals)
    return value.replace(/[^\d.-]/g, '').trim();
  }