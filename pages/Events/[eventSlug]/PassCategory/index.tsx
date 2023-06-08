import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { PreviousPage } from '@/Molecules/PreviousPage';

import PageLayout from '@/Organisms/Layout/PageLayout';
import PassCategories from '@/Organisms/PassCategory/View';

import { OverviewPages } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { ROUTES } from '@/config/routes';
import { PageTitle } from '@/utils/GeneralFunctions';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentEventSlug, setCurrentEventSlug] = useState<string>();
  const queryString = router.query;

  useEffect(() => {
    const slug = queryString.eventSlug;

    if (slug != undefined && typeof slug === 'string')
      setCurrentEventSlug(slug);

    if (document) {
      const currentPageTitle = OverviewPages.PassCategoryPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [queryString]);

  const prevPage = () => {
    if (currentEventSlug) router.push(ROUTES.events.view(currentEventSlug));
  };

  const createPassCategory = () => {
    if (currentEventSlug)
      router.push(ROUTES.passCategory.create(currentEventSlug));
  };
  const editPassCategory = () => {
    if (currentEventSlug)
      router.push(ROUTES.passCategory.edit(currentEventSlug));
  };

  return (
    <PageLayout>
      <PreviousPage onClick={prevPage} />

      <PassCategories
        createPassCategory={createPassCategory}
        editPassCategory={editPassCategory}
      />
    </PageLayout>
  );
};

export default index;
