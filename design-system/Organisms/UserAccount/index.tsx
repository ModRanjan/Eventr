import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { UserDetails } from './UserDetails';
import { ConnectWallet } from './ConnectWallet';

import { useAppSelector } from '@/redux/hooks';
import { IWallet } from '@/redux/wallet/types';

import { ROUTES } from '@/config/routes';

export const UserAccount = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<IWallet>();

  const walletsData = useAppSelector((state) => state.wallets);

  useEffect(() => {
    const { loggedIn, connectedWallets, connectionType } = walletsData;

    if (loggedIn) {
      const firstWallet = connectedWallets[0];
      console.log(loggedIn);
      setAccount(firstWallet);
    }

    setIsConnected(loggedIn);

    if (loggedIn) {
      router.push(ROUTES.landingPage());
    }
  }, [walletsData.loggedIn]);

  const getConnectWalletClass = isConnected
    ? 'relative inline-flex items-center justify-center w-full text-sm font-medium text-black transition-colors duration-300 ease-in-out bg-white border border-gray-600 rounded-md shadow-sm cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black px-4 py-2 leading-4 text-white transition-colors hover:bg-gray-300'
    : 'px-3 py-2 leading-4 text-white transition-colors duration-300 ease-in-out bg-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-900 whitespace-nowrap sm:text-base sm:px-6 sm:py-3';

  return (
    <div className="flex items-center gap-x-4">
      {isConnected && account && (
        <UserDetails
          accountBalance={account?.accountBalance?.toString()}
          accountAddress={account?.currentAccount}
          currencySymbol={'flow'}
          etherscan={'chainData?.etherscan' || '-'}
        />
      )}

      <ConnectWallet customClasses={getConnectWalletClass} />
    </div>
  );
};
