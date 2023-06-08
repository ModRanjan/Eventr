import * as fcl from '@onflow/fcl';
import '@/flow/config';

import { ConnectionType, IWallet } from '@/redux/wallet/types';

export const getBloctoWalletData = async (userAddress: string) => {
  try {
    const userAccount = await fcl
      .send([fcl.getAccount(userAddress)])
      .then(fcl.decode);

    const balance = userAccount.balance / 100000000;

    const currentWallet: IWallet = {
      currentAccount: '0x' + userAccount.address.toString(),
      accountBalance: balance,
    };

    const walletData = {
      connectedWallet: currentWallet,
      connectionType: ConnectionType.BLOCTO,
      loggedIn: true,
    };

    return walletData;
  } catch (error: any) {
    return { error: error };
  }
};
