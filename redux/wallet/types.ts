export interface IWallet {
  currentAccount: string;
  accountBalance: number;
}

export enum ConnectionType {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
  BLOCTO = 'BLOCTO',
}
