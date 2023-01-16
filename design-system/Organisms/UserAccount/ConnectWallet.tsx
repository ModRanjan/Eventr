import { useRouter } from 'next/router';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

import { Button } from '@/Atoms/Button';

import { getBloctoWalletData } from '@/flow/utils/Blocto';
import { useAppDispatch } from '@/redux/hooks';
import { addConnectedWallet } from '@/redux/wallet/walletSlice';
import { setSessionStorage } from '@/utils/GeneralFunctions';

import { signInOrSignUp } from '@/services/authentication';
import { useEffect, useState } from 'react';

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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const connectWallet = async () => {
    // const data = await getWalletData();
    await fcl.authenticate();
    const data = await getBloctoWalletData();

    if (data) {
      // const address = data.connectedWallet.currentAccount;
      // signInOrSignUp(address);

      // * SAVE WALLETDATA INTO REDUX
      dispatch(addConnectedWallet(data));

      // * STORE walletData INTO SESSION
      setSessionStorage('walletData', data);
    }

    if (router.pathname == '/') {
      router.push('/Home');
    }
  };

  return (
    <Button
      bgColor={bgColor}
      textProperties={textProperties}
      padding={padding}
      customClasses={customClasses}
      onClick={connectWallet}
    >
      Connect Wallet
    </Button>
  );
};
