export enum ActionTypes {
  SET_WALLET_DATA = 'SetWalletData',
  SET_CHAIN_DATA = 'SetChainData',
}

export type IActionType =
  | ActionTypes.SET_CHAIN_DATA
  | ActionTypes.SET_WALLET_DATA;
