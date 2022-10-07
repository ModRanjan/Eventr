import { ActionTypes } from './action.type';
import { IChainData, IWalletData } from '../reducer/data.type';

export const setChainData = (data: IChainData) => {
  return {
    type: ActionTypes.SET_CHAIN_DATA,
    payload: data,
  };
};

export const setWalletData = (data: IWalletData) => {
  return {
    type: ActionTypes.SET_WALLET_DATA,
    payload: data,
  };
};
