import { useEffect, useState } from 'react';
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
  const [currentEventSlug, setCurrentEventSlug] = useState<string>();
  const queryString = router.query;

  useEffect(() => {
    const slug = queryString.eventSlug;

    if (slug != undefined && typeof slug === 'string') {
      setCurrentEventSlug(slug);
    }

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

  const reDirectToPage = (page: String) => {
    if (currentEventSlug) {
      switch (page) {
        case 'EventDetailPage':
          router.push(ROUTES.events.view(currentEventSlug));
          break;
        case 'CreatePassPage':
          router.push(ROUTES.passes.create(currentEventSlug));
          break;
        case 'EditPassPage':
          router.push(ROUTES.passes.edit(currentEventSlug));
          break;
        case 'CreatePassCategoryPage':
          router.push(ROUTES.passCategory.create(currentEventSlug));
          break;
        default:
          router.push(ROUTES.home());
          break;
      }
    }
  };

  return (
    <PageLayout>
      <PreviousPage onClick={prevPage} />

      <EditEvent reDirectToPage={reDirectToPage} />
    </PageLayout>
  );
};

export default index;
