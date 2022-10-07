import { ethers } from 'ethers';
import { BigNumber } from 'ethers';
export interface IChainData {
  name: string;
  chain: string;
  chainId: number;
  nativeCurrencySymbol: string;
  rpc: string[];
  logoUrl: string;
  subgraphApiUrl: string;
  etherscan: string;
}
export interface IWalletData {
  currentAccount: string;
  accountBalance: string;
  isConnected: boolean;
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
}
