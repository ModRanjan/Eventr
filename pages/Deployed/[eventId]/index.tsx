import { useEffect } from 'react';

import DeployedEventDetails from '@/Organisms/Deployed/EventDetails';

import { EventsPages } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { PageTitle } from '@/utils/GeneralFunctions';

const EventDetails = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = EventsPages.PurchasePage;

      PageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  });

  return <DeployedEventDetails />;
};

export default EventDetails;
