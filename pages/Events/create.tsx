import { useEffect } from 'react';
import { useRouter } from 'next/router';

import CreateEvent from '@/Organisms/Event/CreateEvent';
import PageLayout from '@/Organisms/Layout/PageLayout';

import { OverviewPages } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { subNavItems } from '@/config/navItems';
import { PageTitle } from '@/utils/GeneralFunctions';

const CreateEvents = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = OverviewPages.CreateEventPage;

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

export default CreateEvents;
