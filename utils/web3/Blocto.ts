import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

import { ConnectionType, IWallet } from '@/redux/wallet/types';

// ! from video
// fcl
//   .config()
//   .put('accessNode.api', 'https://testnet.onflow.org')
//   .put('discovery.wallet', 'https://flow-wallet-testnet.blocto.app/authn');
fcl.config({
  'accessNode.api': 'https://rest-testnet.onflow.org',
  // Mainnet: "https://rest-mainnet.onflow.org"
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  // Mainnet: "https://fcl-discovery.onflow.org/authn"
});

export const getBloctoWalletData = async () => {
  try {
    await fcl.authenticate();

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

    const user = {
      walletAddress: account.address,
    };

    return walletData;
  } catch (error) {
    console.log('Wallet Connection Error: ', error);
  }
};
