import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PreviousPage } from '@/Molecules/PreviousPage';

import CreatePassCategory from '@/Organisms/PassCategory/CreatePassCategory';
import PageLayout from '@/Organisms/Layout/PageLayout';

import { Page } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { PageTitle } from '@/utils/GeneralFunctions';
import { ROUTES } from '@/config/routes';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.CreatePassCategoryPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [router.query]);

  const prevPage = () => {
    const slug = router.query.eventSlug;

    if (slug != undefined && typeof slug === 'string')
      router.push(ROUTES.passCategory.view(slug));
  };

  return (
    <PageLayout>
      <PreviousPage onClick={prevPage} />

      <CreatePassCategory prevPage={prevPage} />
    </PageLayout>
  );
};

export default index;
