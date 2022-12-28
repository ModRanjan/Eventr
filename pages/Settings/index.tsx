import { useEffect } from 'react';

import SettingsPage from '@/Organisms/Settings';
import PageLayout from '@/Organisms/Layout/PageLayout';

import { Page } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { subNavItems } from '@/config/navItems';
import { PageTitle } from '@/utils/GeneralFunctions';

const Settings = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.SettingsPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, []);

  return (
    <PageLayout navigationList={subNavItems}>
      <SettingsPage />
    </PageLayout>
  );
};

export default Settings;
