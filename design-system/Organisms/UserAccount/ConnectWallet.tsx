import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

import { Button } from '@/Atoms/Button';

import { getBloctoWalletData } from '@/flow/utils/Blocto';
import { useAppDispatch } from '@/redux/hooks';
import { addConnectedWallet } from '@/redux/wallet/walletSlice';
import { setSessionStorage } from '@/utils/GeneralFunctions';

import { signInOrSignUp } from '@/services/authentication';
import { ROUTES } from '@/config/routes';

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
    await fcl.authenticate();
    getBloctoWalletData().then((walletData) => {
      if ('error' in walletData) {
        // ${walletData.error}
        toast.error(`Wallet Connection Error: `);
      } else if ('loggedIn' in walletData) {
        const address = '0x' + walletData.connectedWallet.currentAccount;

        signInOrSignUp(address)
          .then((response: any) => {
            const { message, data } = response.data;

            if (message === 'success') {
              const { jwtToken, user } = data;
              console.log('jwtToken', jwtToken);

              // * STORE jwtToken INTO LOCALSTORAGE
              localStorage.setItem('jwtToken', jwtToken);

              // * SAVE WALLETDATA INTO REDUX
              dispatch(addConnectedWallet(walletData));

              // * STORE walletData INTO SESSION
              setSessionStorage('walletData', walletData);
              router.push(ROUTES.home());
            } else {
              throw new Error(message);
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
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
