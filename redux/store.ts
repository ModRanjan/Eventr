import { createStore } from 'redux';
import reducers from './reducer';
import { IChainData, IWalletData } from './reducer/data.type';
const store = createStore(reducers, {});

export default store;

export interface IRootState {
  WalletDataReducer: IWalletData;
  ChainDataReducer: IChainData;
}
