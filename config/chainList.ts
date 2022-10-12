import { IChainData } from '../redux/reducer/data.type';

export const chainList: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    chain: 'ETH',
    chainId: 1,
    nativeCurrencySymbol: 'ETH',
    rpc: [
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    logoUrl: '/images/chainLogo/ethereum.png',
    subgraphApiUrl:
      'https://api.thegraph.com/subgraphs/name/tushar-simform/web3-goerli',
    etherscan: 'https://etherscan.io/address/',
  },
  {
    name: 'Görli',
    chain: 'ETH',
    chainId: 5,
    nativeCurrencySymbol: 'ETH',
    rpc: [
      `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    logoUrl: '/images/chainLogo/ethereum.png',
    subgraphApiUrl:
      'https://api.thegraph.com/subgraphs/name/tushar-simform/web3-goerli',
    etherscan: 'https://goerli.etherscan.io/address/',
  },

  {
    name: 'Polygon Mainnet',
    chain: 'Polygon',
    chainId: 137,
    nativeCurrencySymbol: 'MATIC',
    rpc: [
      `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    logoUrl: '/images/chainLogo/polygon.png',
    subgraphApiUrl:
      'https://api.thegraph.com/subgraphs/name/tushar-simform/web3-polygon',
    etherscan: 'https://polygonscan.com/address/',
  },
  {
    name: 'Mumbai',
    chain: 'Polygon',
    chainId: 80001,
    nativeCurrencySymbol: 'MATIC',
    rpc: [
      `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    ],
    logoUrl: '/images/chainLogo/polygon.png',
    subgraphApiUrl:
      'https://api.thegraph.com/subgraphs/name/tushar-simform/web3-polygon',
    etherscan: 'https://mumbai.polygonscan.com/address/',
  },
  {
    name: 'Binance Mainnet',
    chain: 'BSC',
    chainId: 56,
    nativeCurrencySymbol: 'BNB',
    rpc: ['https://bsc-dataseed1.binance.org'],
    logoUrl: '/images/chainLogo/binance.png',
    subgraphApiUrl:
      'https://api.thegraph.com/subgraphs/name/tushar-simform/web3-chapel',
    etherscan: 'https://bscscan.com/address/',
  },
  {
    name: 'Binance Testnet',
    chain: 'BSC',
    chainId: 97,
    nativeCurrencySymbol: 'tBNB',
    rpc: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    logoUrl: '/images/chainLogo/binance.png',
    subgraphApiUrl:
      'https://api.thegraph.com/subgraphs/name/tushar-simform/web3-chapel',
    etherscan: 'https://testnet.bscscan.com/address/',
  },
];
