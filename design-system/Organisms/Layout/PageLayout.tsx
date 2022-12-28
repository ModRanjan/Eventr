import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import { Navigation } from '@/Molecules/Navigation';

import { Pass } from '@/redux/pass/type';
import { setCurrent } from '@/redux/event/eventSlice';
import { IPass, setPass } from '@/redux/pass/passSlice';
import { Event, CurrentEvent } from '@/redux/event/types';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { getEventBySlug } from '@/services/event';
import { getPassesByEventId } from '@/services/Pass';

import { INavItemsData, subNavItems } from '@/config/navItems';

type PageLayoutProps = {
  children: React.ReactNode;
  navigationList?: INavItemsData;
};

const PageLayout = ({
  children,
  navigationList = subNavItems,
}: PageLayoutProps) => {
  const router = useRouter();
  const queryString = router.query;
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.user.currentPage);
  const [event, setEvent] = useState<CurrentEvent>();

  const fetchEventBySlug = async (slug: string) => {
    let tempEventdetail: CurrentEvent;
    getEventBySlug(slug)
      .then(async (response) => {
        const eventData = await response.data?.event;

        if (eventData) {
          const tempEvent: Event = {
            id: eventData.id,
            slug: eventData.slug,
            title: eventData.title,
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            Files: eventData.Files,
          };

          tempEventdetail = {
            event: tempEvent,
            published: eventData.published,
            hasPass: false,
          };

          setEvent(tempEventdetail);
          dispatch(setCurrent(tempEventdetail));
        }
      })
      .catch((error) => console.log('getEventBySlug Error: ', error));
  };

  useEffect(() => {
    const slug = router.query.eventSlug;

    console.log('PageLayout currentPage: ', currentPage);

    if (slug != undefined && typeof slug === 'string') {
      // if (currentPage === 'Event Details' || currentPage === 'Edit Event') {
      console.log('call fetchEventBySlug');
      fetchEventBySlug(slug);
      // }
    }
  }, [currentPage, queryString]);

  useEffect(() => {
    const tempEvent = event?.event;

    const fetchPassByEventId = async (eventId: number) => {
      getPassesByEventId(eventId)
        .then((response) => {
          const { message, data } = response;

          if (data.length) {
            const PassData = data[0];

            if (PassData) {
              const Pass: Pass = {
                id: PassData.id,
                title: PassData.title,
                slug: PassData.slug,
                dropType: PassData.dropType,
                contractType: PassData.contractType,
                deployed: PassData.deployed,
                claimListHash: PassData.claimListHash,
                contractAddress: PassData.contractAddress,
              };

              const tempPasses: IPass = {
                pass: Pass,
                eventId: eventId,
              };

              dispatch(setPass(tempPasses));
            }
          }
        })
        .catch((error) =>
          console.error('getPassesByEventId Error:', error.message),
        );
    };

    if (tempEvent) {
      const eventId = tempEvent.id;

      fetchPassByEventId(eventId);
    }
  }, [event]);

  const isActive = (pathName: string) => {
    if (router.pathname == pathName) {
      return true;
    } else if (router.query.eventSlug && pathName === '/Home') {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-white shadow shadow-md drop-shadow-xl">
        <div className="section">
          <div className="flex justify-between h-12 sm:h-14">
            <Navigation
              textProperties="text-sm text-gray-500 hover:text-gray-700"
              navItems={navigationList}
              isActive={isActive}
            />
          </div>
        </div>
      </div>

      <section className="py-5 bg-white section sm:py-8">
        <div className="px-0">{children}</div>
      </section>
    </>
  );
};

export default PageLayout;
