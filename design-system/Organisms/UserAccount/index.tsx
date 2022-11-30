import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { setWalletData } from '@/redux/action';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

import { Button } from '@/Atoms/Button';
import { Image } from '@/Atoms/Image';
import { useRouter } from 'next/router';
import { UserDetails } from './UserDetails';
import { ConnectWallet } from './ConnectWallet';

import { shallowEqual } from 'react-redux';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { IWallet } from '@/redux/wallet/types';
import {
  addConnectedWallet,
  removeConnectedWallet,
} from '@/redux/wallet/walletSlice';

import { getSessionStorage, setSessionStorage } from '@/utils/GeneralFunctions';

export const UserAccount = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentAccount, setCurrentAccount] = useState<IWallet>();

  const chainData = useAppSelector((state) => state.ChainData);
  const walletsData = useAppSelector((state) => state.wallets);

  useEffect(() => {
    const windowSessionData = getSessionStorage('walletData');
    // setSessionData(windowSessionData);

    if (windowSessionData && windowSessionData.loggedIn) {
      const connectedWallet = windowSessionData.connectedWallet;
      setCurrentAccount(connectedWallet);
      dispatch(addConnectedWallet(windowSessionData));

      // fetchWalletData();
    }

    if (!windowSessionData?.loggedIn) {
      router.push('/');
    }
  }, [walletsData]);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', async () => {
        await fetchWalletData();
      });
      window.ethereum.on('chainChanged', async () => {
        await fetchWalletData();
      });
    }
  }, []);

  const fetchWalletData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    let accountbalance: ethers.BigNumber = await provider.getBalance(account);
    let balance: string = ethers.utils.formatEther(accountbalance);

    const data = {
      currentAccount: account,
      accountBalance: balance,
      isConnected: account && true,
      provider: provider,
      signer: signer,
    };
    window.sessionStorage.setItem(
      'walletData',
      JSON.stringify({
        currentAccount: account,
        accountBalance: balance,
        isConnected: account && true,
      }),
    );
    dispatch(setWalletData(data));
  };

  function handleDisconnect() {
    const connectedWallets = walletsData.connectedWallets;

    const session = getSessionStorage('walletData');

    const perviousWalletData = connectedWallets.filter((Account: any) => {
      const currentUserAddress = session.connectedWallet.currentAccount;
      return shallowEqual(Account.currentAccount, currentUserAddress);
    });

    const data = {
      connectedWallet: perviousWalletData,
      connectionType: null,
      loggedIn: false,
    };

    // * TO DISCONNECT BLOCTO WALLET
    fcl.unauthenticate();

    setSessionStorage('walletData', {});
    dispatch(removeConnectedWallet(data));
    router.push('/');
  }

  return walletsData.loggedIn && currentAccount ? (
    <div className="flex items-center gap-4 sm:mr-2">
      <UserDetails
        accountBalance={currentAccount?.accountBalance?.toString()}
        accountAddress={currentAccount?.currentAccount}
        currencySymbol={chainData?.nativeCurrencySymbol || '$'}
        etherscan={chainData?.etherscan || '-'}
      />

      <Button onClick={handleDisconnect} customClasses="cursor-pointer">
        <img
          className="border-2 border-gray-300 rounded-full cursor-pointer w-11 h-11 "
          src="images/walletAvtarLogo.png"
          onClick={handleDisconnect}
          title="Disconnect"
        />
      </Button>
    </div>
  ) : (
    <ConnectWallet
      bgColor="bg-black hover:bg-gray-900"
      textProperties="whitespace-nowrap text-white sm:text-base leading-4 ml-6"
      padding="px-3 py-2 sm:px-6 sm:py-3"
    />
  );
};
