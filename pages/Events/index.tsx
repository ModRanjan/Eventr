import { useEffect } from 'react';
import { useRouter } from 'next/router';

import CreateEvent from '@/Organisms/Event/CreateEvent';
import PageLayout from '@/Organisms/Layout/PageLayout';

import { Page } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { subNavItems } from '@/config/navItems';
import { PageTitle } from '@/utils/GeneralFunctions';

const Events = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.CreateEventPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [router.query]);

  return (
    <PageLayout navigationList={subNavItems}>
      <CreateEvent />
    </PageLayout>
  );
};

export default Events;
