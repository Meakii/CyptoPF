const BINANCE_API_URL = 'https://api.binance.com/api/v3';

interface KlineData {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
}

export async function fetchBinanceAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BINANCE_API_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Binance API error (${endpoint}):`, error);
    throw error;
  }
}

export async function fetchKlines(
  symbol: string,
  interval: string,
  limit: number
): Promise<KlineData[]> {
  try {
    const data = await fetchBinanceAPI<any[]>(
      `/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    
    return data.map(k => ({
      openTime: k[0],
      open: k[1],
      high: k[2],
      low: k[3],
      close: k[4],
      volume: k[5],
      closeTime: k[6]
    }));
  } catch (error) {
    console.error('Failed to fetch klines:', error);
    throw error;
  }
}

export async function fetchPrice(symbol: string): Promise<string> {
  try {
    const data = await fetchBinanceAPI<{ price: string }>(`/ticker/price?symbol=${symbol}`);
    const audRate = await fetchAUDRate();
    const priceInAUD = parseFloat(data.price) * audRate;
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(priceInAUD);
  } catch (error) {
    console.error('Failed to fetch price:', error);
    return '-';
  }
}

export async function fetch24hChange(symbol: string): Promise<number> {
  try {
    const data = await fetchBinanceAPI<{ priceChangePercent: string }>(`/ticker/24hr?symbol=${symbol}`);
    return parseFloat(data.priceChangePercent);
  } catch (error) {
    console.error('Failed to fetch 24h change:', error);
    return 0;
  }
}

let cachedAUDRate: number | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchAUDRate(): Promise<number> {
  const now = Date.now();
  
  if (cachedAUDRate && now - lastFetchTime < CACHE_DURATION) {
    return cachedAUDRate;
  }

  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=AUD');
    const data = await response.json();
    cachedAUDRate = data.rates.AUD;
    lastFetchTime = now;
    return cachedAUDRate;
  } catch (error) {
    console.error('Failed to fetch AUD rate:', error);
    return cachedAUDRate || 1.5; // Use cached rate or fallback
  }
}