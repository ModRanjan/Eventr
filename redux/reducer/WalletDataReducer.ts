import { IWalletData } from './data.type';
import { ActionTypes, IActionType } from '../action/action.type';
const initialState: IWalletData = {
  currentAccount: '',
  accountBalance: '',
  isConnected: false,
};

type Props = {
  payload: IWalletData;
  type: IActionType;
};
export const WalletDataReducer = (
  state = initialState,
  { payload, type }: Props,
) => {
  switch (type) {
    case ActionTypes.SET_WALLET_DATA:
      state = {
        ...payload,
      };

      return state;
    default:
      return state;
  }
};
