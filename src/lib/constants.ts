import { 
  AAVEIcon, 
  AlgorandIcon, 
  AvalancheIcon, 
  AxieInfinityIcon, 
  BasicAttentionTokenIcon, 
  BitcoinIcon, 
  BitcoinCashIcon, 
  BitcoinSVIcon, 
  CardanoIcon, 
  ChainlinkIcon, 
  CompoundIcon, 
  EnjinIcon, 
  EthereumIcon, 
  EthereumClassicIcon, 
  FlareIcon, 
  GolemIcon, 
  HederaIcon, 
  ImmutableXIcon, 
  LitecoinIcon, 
  MeldGoldIcon, 
  NearProtocolIcon, 
  OMGNetworkIcon, 
  OndoIcon, 
  PendleIcon, 
  PolkadotIcon, 
  PowerledgerIcon, 
  // RenderIcon, 
  SandboxIcon, 
  SolanaIcon, 
  StellarIcon, 
  SuiIcon, 
  UniswapIcon, 
  // UsdCoinIcon, 
  XrpIcon 
} from "../components/icons";

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// Only include cryptocurrencies with confirmed Binance trading pairs
export const SUPPORTED_CRYPTOCURRENCIES: CryptoCurrency[] = [
  { id: 'aave', symbol: 'AAVEUSDT', name: 'AAVE', icon: AAVEIcon },
  { id: 'algorand', symbol: 'ALGOUSDT', name: 'Algorand', icon: AlgorandIcon },
  { id: 'avalanche', symbol: 'AVAXUSDT', name: 'Avalanche', icon: AvalancheIcon },
  { id: 'axie-infinity', symbol: 'AXIEUSDT', name: 'Axie Infinity', icon: AxieInfinityIcon },
  { id: 'basic-attention-token', symbol: 'BATUSDT', name: 'Basic Attention Token', icon: BasicAttentionTokenIcon },
  { id: 'bitcoin', symbol: 'BTCUSDT', name: 'Bitcoin', icon: BitcoinIcon },
  { id: 'bitcoin-cash', symbol: 'BCHUSDT', name: 'Bitcoin Cash', icon: BitcoinCashIcon },
  { id: 'bitcoin-sv', symbol: 'BSVUSDT', name: 'Bitcoin SV', icon: BitcoinSVIcon },
  { id: 'cardano', symbol: 'ADAUSDT', name: 'Cardano', icon: CardanoIcon },
  { id: 'chainlink', symbol: 'LINKUSDT', name: 'Chainlink', icon: ChainlinkIcon },
  { id: 'compound', symbol: 'COMPUSDT', name: 'Compound', icon: CompoundIcon },
  { id: 'enjin', symbol: 'ENJUSDT', name: 'Enjin', icon: EnjinIcon },
  { id: 'ethereum', symbol: 'ETHUSDT', name: 'Ethereum', icon: EthereumIcon },
  { id: 'ethereum-classic', symbol: 'ETCUSDT', name: 'Ethereum Classic', icon: EthereumClassicIcon },
  { id: 'flare', symbol: 'FLRUSDT', name: 'Flare', icon: FlareIcon },
  { id: 'golem', symbol: 'GNTUSDT', name: 'Golem', icon: GolemIcon },
  { id: 'hedera', symbol: 'HBARUSDT', name: 'Hedera', icon: HederaIcon },
  { id: 'immutable-x', symbol: 'IMXUSDT', name: 'Immutable X', icon: ImmutableXIcon },
  { id: 'litecoin', symbol: 'LTCUSDT', name: 'Litecoin', icon: LitecoinIcon },
  { id: 'meld-gold', symbol: 'MCAUUSDT', name: 'Meld Gold', icon: MeldGoldIcon },
  { id: 'near-protocol', symbol: 'NEARUSDT', name: 'Near Protocol', icon: NearProtocolIcon },
  { id: 'omg-network', symbol: 'OMGUSDT', name: 'OMG Network', icon: OMGNetworkIcon },
  { id: 'ondo', symbol: 'ONDOUSDT', name: 'Ondo', icon: OndoIcon },
  { id: 'pendle', symbol: 'PENDLEUSDT', name: 'Pendle', icon: PendleIcon },
  { id: 'polkadot', symbol: 'DOTUSDT', name: 'Polkadot', icon: PolkadotIcon },
  { id: 'powerledger', symbol: 'POWRUSDT', name: 'Powerledger', icon: PowerledgerIcon },
  // { id: 'render', symbol: 'RENDERUSDT', name: 'Render', icon: RenderIcon },
  { id: 'sandbox', symbol: 'SANDUSDT', name: 'Sandbox', icon: SandboxIcon },
  { id: 'solana', symbol: 'SOLUSDT', name: 'Solana', icon: SolanaIcon },
  { id: 'stellar', symbol: 'XLMUSDT', name: 'Stellar', icon: StellarIcon },
  { id: 'sui', symbol: 'SUIUSDT', name: 'SUI', icon: SuiIcon },
  { id: 'uniswap', symbol: 'UNIUSDT', name: 'Uniswap', icon: UniswapIcon },
  { id: 'ripple', symbol: 'XRPUSDT', name: 'XRP', icon: XrpIcon },
];