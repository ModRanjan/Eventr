import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Eventr from '../design-system/Organisms/Eventr';

import { useAppSelector } from '@/redux/hooks';

const index = () => {
  const router = useRouter();

  const walletData = useAppSelector((state) => state.wallets);

  useEffect(() => {
    if (walletData.loggedIn) {
      router.push('/Home');
    }
  }, [walletData]);

  return !walletData.loggedIn && <Eventr />;
};

export default index;
