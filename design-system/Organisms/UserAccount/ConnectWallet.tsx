import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

import { setWalletData } from '@/redux/action';
import { Button } from '@/Atoms/Button';
import { getWalletData } from '@/utils/web3';
import { getBloctoWalletData } from '@/utils/web3/Blocto';
import { addConnectedWallet } from '@/redux/wallet/walletSlice';
import { setSessionStorage } from '@/utils/GeneralFunctions';
import { useRouter } from 'next/router';

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
  const dispatch = useAppDispatch();
  const router = useRouter();

  const connectWallet = async () => {
    // const data = await getWalletData();
    const data = await getBloctoWalletData();

    if (data) {
      console.log(data);
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
