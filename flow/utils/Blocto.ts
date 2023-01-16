import * as fcl from '@onflow/fcl';
import '@/flow/config';

import { ConnectionType, IWallet } from '@/redux/wallet/types';

export const getBloctoWalletData = async () => {
  try {
    const currentUser = await fcl.currentUser().snapshot();

    const account = await fcl
      .send([fcl.getAccount(currentUser.addr)])
      .then(fcl.decode);

    const balance = account.balance / 100000000;

    const currentWallet: IWallet = {
      currentAccount: account.address.toString(),
      accountBalance: balance,
    };
    const walletType = ConnectionType.BLOCTO;

    const walletData = {
      connectedWallet: currentWallet,
      connectionType: walletType,
      loggedIn: true,
    };

    return walletData;
  } catch (error) {
    console.log('Wallet Connection Error: ', error);
  }
};
