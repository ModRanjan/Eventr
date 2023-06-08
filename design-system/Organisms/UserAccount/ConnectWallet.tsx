'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { toast } from 'react-toastify';
import { shallowEqual } from 'react-redux';

import { Button } from '@/Atoms/Button';

import { IWallet } from '@/redux/wallet/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addConnectedWallet,
  removeConnectedWallet,
} from '@/redux/wallet/walletSlice';
import { getSessionStorage, setSessionStorage } from '@/utils/GeneralFunctions';

import { ROUTES } from '@/config/routes';

import { getBloctoWalletData } from '@/flow/utils/Blocto';
import { signInOrSignUp } from '@/services/authentication';

type ConnectWalletProps = {
  bgColor?: string;
  textProperties?: string;
  padding?: string;
  customClasses?: string;
  blocked?: boolean;
};

export const ConnectWallet = ({
  bgColor,
  textProperties,
  padding,
  blocked,
  customClasses,
}: ConnectWalletProps) => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [Connected, setConnected] = useState(false);
  const dispatch = useAppDispatch();

  const [currentAccount, setCurrentAccount] = useState<IWallet>();
  const walletsData = useAppSelector((state) => state.wallets);

  useEffect(() => {
    const windowSessionData = getSessionStorage('walletData');
    const tempWalletConnected = walletsData.loggedIn;
    setConnected(tempWalletConnected);

    if (windowSessionData && windowSessionData.loggedIn) {
      const connectedWallet = windowSessionData.connectedWallet;
      setCurrentAccount(connectedWallet);
      dispatch(addConnectedWallet(windowSessionData));
    }
  }, [walletsData]);

  const connectWallet = async () => {
    setLoading(true);

    try {
      const { addr, cid, expiresAt, f_type, f_vsn, loggedIn } =
        await fcl.authenticate();

      if (loggedIn && addr) {
        const walletData = await getBloctoWalletData(addr);
        if ('error' in walletData) {
          toast.error(`Wallet Connection Error: ${walletData.error}`);
          return;
        }

        const address = walletData.connectedWallet.currentAccount;
        const signInResponse: any = await signInOrSignUp(address);
        const { message, data } = signInResponse.data;

        if (message === 'success') {
          const { jwtToken, user } = data;
          console.log('jwtToken', jwtToken);

          // * STORE jwtToken INTO LOCALSTORAGE
          localStorage.setItem('jwtToken', jwtToken);

          // * SAVE WALLETDATA INTO REDUX
          dispatch(addConnectedWallet(walletData));

          // * STORE walletData INTO SESSION
          setSessionStorage('walletData', walletData);

          if (Router.pathname == '/') Router.push(ROUTES.home());

          setConnected(true);
          setLoading(false);
        } else {
          throw new Error(message);
        }
      } else {
        throw new Error('Failed to authenticate user');
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  function handleDisconnect() {
    const connectedWallets = walletsData.connectedWallets;

    const perviousWalletData = connectedWallets.filter((Account: any) => {
      const currentUserAddress = currentAccount?.currentAccount;

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
    setConnected(false);
    Router.push(ROUTES.landingPage());
  }

  return (
    <Button
      bgColor={bgColor}
      textProperties={textProperties}
      padding={padding}
      customClasses={customClasses}
      disabled={loading}
      loading={loading}
      onClick={Connected ? handleDisconnect : connectWallet}
    >
      {Connected ? 'Disconnect' : 'Connect Wallet'}
    </Button>
  );
};
