import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PreviousPage } from '@/Molecules/PreviousPage';

import EventDetail from '@/Organisms/EventDetail';
import PageLayout from '@/Organisms/Layout/PageLayout';

import { useAppDispatch } from '@/redux/hooks';
import { OverviewPages } from '@/redux/user/types';
import { setCurrentPage } from '@/redux/user/userSlice';

import { ROUTES } from '@/config/routes';
import { PageTitle } from '@/utils/GeneralFunctions';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryString = router.query;

  useEffect(() => {
    if (document) {
      const currentPageTitle = OverviewPages.EventDetailPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [queryString]);

  return (
    <PageLayout>
      <PreviousPage onClick={() => router.push(ROUTES.home())} />

      <EventDetail />
    </PageLayout>
  );
};

export default index;
