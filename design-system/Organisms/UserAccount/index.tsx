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
          src={imgUrl}
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

const imgUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABQpJREFUWEetl3tMW3UUx89t1wdMO0ZnC2XQEQZCt4Asy0iTETVqhnHBTBed4jJk8jBOZU4dsk2jCEGNsigqY4IgoFPnHsQ4jC5xblllWUDIBrOMdOVRSl0BUaEta685l/3KffS2NeP+d3+/c8/5/M4999tvKZqmaQjjslldpp05PcZQodk50bBcLXO0t41r2LFP7VoJec/FCR6nFhPAeN9yeL02BZwOT1/Bph6Dx+VjCsrkFLT3bAjIvmgA67OjoKL+TqYIAvx6asJQX21l7sVOj3uLApCRpYLqpjT/CRFArZEb8u7uAp8X4Ktz60Tf3C0DGDJvh/e/NHAKEIDjzXbweWl4tCBWHKC1doQONBzsJ5zjHji43+K4eG6KM1jJa5ZCxFKpIPmr7yUxHbhu9wBFAai1cnGAnNTfaBySx4viBFOKhY812eFY0xgkpkROW8wzKpIpISkCDn2fDg+mdQqSN3RkmHR6pbGuygpyuQQKXo4PDkB2o9Qy2FoQC/c8pIaTLePwbYPN/yAbAIvXHFkDkbdJRQGkSyhj/v2/M8+3/pIp2gUKO0CqRGsQQAfZm6LhaOMYnGyxCwCweOVnqbAiZr6tYh04cshm/On4n0zMI/mxULg3IfBniABypQTyS+Nhy44YTtD4qBvaPh4FTIQd8HppVfnBZNCvjvDHBQKoPJzata/wCmf0xbpAfVJhGX+sSHedj+ee9f1F1uzDbsWJFrvh6T3xHn5cxfMD/RRFzSvOzSs+UZnpsLk5sWqN3PXsfv0g/3mqstRMl9ckc9b37uiH3gvTnDWdPsLU0JHul+I5jw/eKDEzMW/WpYBMLvHHW8wz09UvXVUNDc6KDh/ZYGaASChZDAVAineb5puUaVzGgUAAiYRSVZUOQCgI/xCypTQYAL84gWZDIEBiSqQKdWDfM1eCQnC+AiKpYgB17WuN2HZycn5/CcTINRcDgPsz/3hh97bLohAcAHwApXWJjBLMQGyCsjMmTpElVpzdicKyBD8AWX9h6yUYuPyvYCYEABiBEvvh0bWcYGzr4eohVTgA9lF359iQK4udIH2DCm7M0dDX/Tcnb0AAjGCrHd4jwMpVSlU4r6Ak95LJZp3lmBcEeKc5Dcry+6Gnc+ELEwUgEET1yGCFM4Q7c3pFATDvgaI/4OLZKaYTQQEIBKqfz0f732uozzAUAOZ9a5cZTKcnQwMQiLIPVnMGK5gQhQOAeat2DwA1em32PH80P33bmuR0eJTsdY1OIR+2uLrZazRNSw58lLxghW5uNteMyHPztH0x8Qo3iVdESJbx63xTb1sR0BGhgGy/l1MLAv3AYMJT/QvDbr06C6h+UinFeIcHttzBeAxtnIJT+8QXdvi8ZhjQtIpaMjSUaKnwwkTbinUBbTkBYKse37w8vD2G8RnnT0/C1/WjMOGY8wOJArC70PTzXeC9QYsC8NWOD4A/8+gJzvzgZHzGlDMMAETELvh8ACXlehD7Y4IdKN7cy5FaAkAKE/NCjo0eAzsx56GD23LsAl6YAJ3uu68MMvaX/V/KNeMVSOz6jVGOFysSNfzC/CFEkKC2/LvGMZApJJCbp2UA0Omyk+x5sk8grbhPTCm/YKD7oABPbOwCiRSg7cw6AQBfUtnJFwUA29NaO8LkLX5ND9k50f4OsKU00KkWBSA34wIzJHihaW38MYMBIBIarL23DMA+PSmUm6d1TDrnNGc7JkK+2v8D8B9t9P4aOjGQ2QAAAABJRU5ErkJggg==';
