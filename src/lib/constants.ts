import {
  AAVEIcon,
  AlgorandIcon,
  AvalancheIcon,
  AxieInfinityIcon,
  BasicAttentionTokenIcon,
  BitcoinIcon,
  BitcoinCashIcon,
  CardanoIcon,
  ChainlinkIcon,
  CompoundIcon,
  EnjinIcon,
  EthereumIcon,
  EthereumClassicIcon,
  GolemIcon,
  HederaIcon,
  LitecoinIcon,
  NearProtocolIcon,
  SolanaIcon,
  StellarIcon,
  UniswapIcon,
  XrpIcon,
} from "../components/icons";

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// Only include cryptocurrencies with confirmed Binance trading pairs
export const SUPPORTED_CRYPTOCURRENCIES: CryptoCurrency[] = [
  { id: "aave", symbol: "AAVEUSDT", name: "AAVE", icon: AAVEIcon },
  { id: "algorand", symbol: "ALGOUSDT", name: "Algorand", icon: AlgorandIcon },
  { id: "avalanche", symbol: "AVAXUSDT", name: "Avalanche", icon: AvalancheIcon },
  { id: "axie-infinity", symbol: "AXSUSDT", name: "Axie Infinity", icon: AxieInfinityIcon },
  { id: "basic-attention-token", symbol: "BATUSDT", name: "Basic Attention Token", icon: BasicAttentionTokenIcon },
  { id: "bitcoin", symbol: "BTCUSDT", name: "Bitcoin", icon: BitcoinIcon },
  { id: "bitcoin-cash", symbol: "BCHUSDT", name: "Bitcoin Cash", icon: BitcoinCashIcon },
  { id: "cardano", symbol: "ADAUSDT", name: "Cardano", icon: CardanoIcon },
  { id: "chainlink", symbol: "LINKUSDT", name: "Chainlink", icon: ChainlinkIcon },
  { id: "compound", symbol: "COMPUSDT", name: "Compound", icon: CompoundIcon },
  { id: "enjin", symbol: "ENJUSDT", name: "Enjin", icon: EnjinIcon },
  { id: "ethereum", symbol: "ETHUSDT", name: "Ethereum", icon: EthereumIcon },
  { id: "ethereum-classic", symbol: "ETCUSDT", name: "Ethereum Classic", icon: EthereumClassicIcon },
  { id: "golem", symbol: "GLMUSDT", name: "Golem", icon: GolemIcon },
  { id: "hedera", symbol: "HBARUSDT", name: "Hedera", icon: HederaIcon },
  { id: "litecoin", symbol: "LTCUSDT", name: "Litecoin", icon: LitecoinIcon },
  { id: "near-protocol", symbol: "NEARUSDT", name: "Near Protocol", icon: NearProtocolIcon },
  { id: "solana", symbol: "SOLUSDT", name: "Solana", icon: SolanaIcon },
  { id: "stellar", symbol: "XLMUSDT", name: "Stellar", icon: StellarIcon },
  { id: "uniswap", symbol: "UNIUSDT", name: "Uniswap", icon: UniswapIcon },
  { id: "ripple", symbol: "XRPUSDT", name: "XRP", icon: XrpIcon },
];