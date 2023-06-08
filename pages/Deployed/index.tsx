import { useEffect } from 'react';

import PageLayout from '@/Organisms/Layout/PageLayout';
import HomePage from '@/Organisms/Events';

import { Page } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { subNavItems } from '@/config/navItems';
import { PageTitle } from '@/utils/GeneralFunctions';

const Events = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.AllEventsPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, []);

  return (
    <PageLayout navigationList={subNavItems}>
      <HomePage pageTitle={Page.AllEventsPage} />
    </PageLayout>
  );
};

export default Events;
