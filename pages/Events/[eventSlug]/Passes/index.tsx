import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PreviousPage } from '@/Molecules/PreviousPage';

import PageLayout from '@/Organisms/Layout/PageLayout';
import CreatePasses from '@/Organisms/Passes/CreatePass';

import { useAppDispatch } from '@/redux/hooks';
import { OverviewPages } from '@/redux/user/types';
import { setCurrentPage } from '@/redux/user/userSlice';

import { ROUTES } from '@/config/routes';
import { PageTitle } from '@/utils/GeneralFunctions';

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = OverviewPages.CreatePassPage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [router.query]);

  const prevPage = () => {
    const slug = router.query.eventSlug;

    if (slug != undefined && typeof slug === 'string')
      router.push(ROUTES.events.view(slug));
  };

  return (
    <PageLayout>
      <PreviousPage onClick={prevPage} />

      <CreatePasses prevPage={prevPage} />
    </PageLayout>
  );
};

export default index;

// useEffect(() => {
//   let passesData: PassTableRows[] = [];

//   const getDeployedIcon = (value: boolean) => {
//     if (value) {
//       return <Icon className="h-6 text-green-600 w-9" icon={BsCheck} />;
//     } else {
//       return <Icon className="h-6 text-red-600 w-9" icon={FaTimes} />;
//     }
//   };

//   const passes = passDetail.passes;
//   const eventId = passDetail.eventId;

//   if (eventId && passes) {
//     passes.map((pass, index: number) => {
//       const tempPasses: PassTableRows = {
//         id: index + 1,
//         passId: pass.id,
//         title: pass.title,
//         eventId: eventId,
//         slug: pass.slug,
//         contractAddress: pass.contractAddress,
//         claimListHash: pass.claimListHash,
//         dropType: pass.dropType,
//         contractType: pass.contractType,
//         deployed: getDeployedIcon(pass.deployed),
//       };

//       passesData.push(tempPasses);
//     });

//     setAllPasses(passesData);
//   }
// }, [passDetail]);
