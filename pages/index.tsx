import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Eventr from '@/Organisms/Eventr';

import { Page } from '@/redux/user/types';
import { setCurrentPage } from '@/redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { PageTitle } from '@/utils/GeneralFunctions';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const walletData = useAppSelector((state) => state.wallets);

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.LandingPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, []);

  useEffect(() => {
    if (walletData.loggedIn) {
      router.push('/Home');
    }
  }, [walletData]);

  return !walletData.loggedIn && <Eventr />;
};

export default index;
