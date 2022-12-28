import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PreviousPage } from '@/Molecules/PreviousPage';

import PageLayout from '@/Organisms/Layout/PageLayout';
import EditEvent from '@/Organisms/Event/EditEvent';

import { useAppDispatch } from '@/redux/hooks';
import { OverviewPages } from '@/redux/user/types';
import { PageTitle } from '@/utils/GeneralFunctions';
import { setCurrentPage } from '@/redux/user/userSlice';

import { ROUTES } from '@/config/routes';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryString = router.query;

  useEffect(() => {
    if (document) {
      const currentPageTitle = OverviewPages.EditEventPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [queryString]);

  const prevPage = () => {
    const slug = router.query.eventSlug;

    if (slug != undefined && typeof slug === 'string')
      router.push(ROUTES.events.view(slug));
  };

  return (
    <PageLayout>
      <PreviousPage onClick={prevPage} />

      <EditEvent prevPage={prevPage} />
    </PageLayout>
  );
};

export default index;
