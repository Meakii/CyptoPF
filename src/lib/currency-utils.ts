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

function formatDecimals(value: number): string {
  // Convert to string and split into whole and decimal parts
  const [whole, decimal] = value.toString().split('.');
  
  if (!decimal) {
    return `${whole}.00`;
  }

  // Handle decimal part based on the value
  let formattedDecimal = decimal;
  let decimalPlaces = 2; // default

  // Determine decimal places based on value
  if (value < 0.1) {
    decimalPlaces = 6;
  } else if (value < 1) {
    decimalPlaces = 4;
  }

  // If decimal is longer than desired places, round it based on the next digit
  if (decimal.length > decimalPlaces) {
    const nextDigit = parseInt(decimal[decimalPlaces]);
    const currentValue = parseInt(decimal.slice(0, decimalPlaces));
    
    // Round up or down based on the next digit
    if (nextDigit >= 5) {
      formattedDecimal = (currentValue + 1).toString().padEnd(decimalPlaces, '0');
    } else {
      formattedDecimal = decimal.slice(0, decimalPlaces);
    }
  }

  // Ensure correct number of decimal places
  if (formattedDecimal.length < decimalPlaces) {
    formattedDecimal = formattedDecimal.padEnd(decimalPlaces, '0');
  } else if (formattedDecimal.length > decimalPlaces) {
    formattedDecimal = formattedDecimal.slice(0, decimalPlaces);
  }

  return `${whole}.${formattedDecimal}`;
}

// Helper function to format currency
export function parseAndFormatCurrency(value: string | number, currency: string = DEFAULT_CURRENCY): string {
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
  
  // Format the number with our custom decimal handling
  const formatted = formatDecimals(numericValue);
  
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