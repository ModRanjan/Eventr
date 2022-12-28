import { useEffect } from 'react';
import { useRouter } from 'next/router';

import PageLayout from '@/Organisms/Layout/PageLayout';
import { PreviousPage } from '@/Molecules/PreviousPage';
import EditPassCategory from '@/Organisms/PassCategory/EditPassCategory';

import { Page } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { ROUTES } from '@/config/routes';
import { PageTitle } from '@/utils/GeneralFunctions';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.UpdatePassCategoryPage;

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

      <EditPassCategory prevPage={prevPage} />
    </PageLayout>
  );
};

export default index;
