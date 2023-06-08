import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { PreviousPage } from '@/Molecules/PreviousPage';

import EditPass from '@/Organisms/Passes/EditPass';
import PageLayout from '@/Organisms/Layout/PageLayout';

import { OverviewPages } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { ROUTES } from '@/config/routes';
import { PageTitle } from '@/utils/GeneralFunctions';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentEventSlug, setCurrentEventSlug] = useState<string>();

  useEffect(() => {
    const slug = router.query.eventSlug;

    if (slug != undefined && typeof slug === 'string') {
      setCurrentEventSlug(slug);
    }

    if (document) {
      const currentPageTitle = OverviewPages.EditPassPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [router.query]);

  const prevPage = () => {
    if (currentEventSlug) router.push(ROUTES.events.edit(currentEventSlug));
  };

  const EventDetails = () => {
    if (currentEventSlug)
      router.push(ROUTES.events.viewDetails(currentEventSlug));
  };

  return (
    <PageLayout>
      <PreviousPage onClick={prevPage} />

      <EditPass prevPage={EventDetails} />
    </PageLayout>
  );
};

export default index;
