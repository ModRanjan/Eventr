import { ActionTypes, IActionType } from '../action/action.type';
import { IChainData } from './data.type';

const initialState: IChainData = {
  name: 'Ethereum Mainnet',
  chain: 'ETH',
  chainId: 1,
  nativeCurrencySymbol: 'ETH',
  rpc: [
    `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
  ],
  logoUrl: '/images/chainLogo/ethereum.png',
  subgraphApiUrl: '',
};

type Props = {
  payload: IChainData;
  type: IActionType;
};
export const ChainDataReducer = (
  state = initialState,
  { payload, type }: Props,
) => {
  switch (type) {
    case ActionTypes.SET_CHAIN_DATA:
      state = {
        ...payload,
      };

      return state;
    default:
      return state;
  }
};
