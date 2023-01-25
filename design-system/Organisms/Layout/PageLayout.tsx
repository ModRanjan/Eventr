import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Navigation } from '@/Molecules/Navigation';

import { Pass } from '@/redux/pass/type';
import { IPass, setPass } from '@/redux/pass/passSlice';
import { PassCategory } from '@/redux/passCategory/type';
import { Event, CurrentEvent } from '@/redux/event/types';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setCurrent, setCurrentPublished } from '@/redux/event/eventSlice';
import { setPassCategories } from '@/redux/passCategory/passCategorySlice';

import { getEventBySlug } from '@/services/event';
import { getPassesByEventId } from '@/services/Pass';
import { getPassCategories } from '@/services/PassCategory';

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
  const [pass, setpass] = useState<Pass>();

  // set events & currentEvent
  useEffect(() => {
    const slug = router.query.eventSlug;

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
            if (eventData.published) dispatch(setCurrentPublished(true));
          }
        })
        .catch((error) => console.log('getEventBySlug Error: ', error));
    };

    if (slug != undefined && typeof slug === 'string') {
      fetchEventBySlug(slug);
    }
  }, [currentPage, queryString]);

  // set pass
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

              setpass(Pass);
              const tempPasses: IPass = {
                pass: Pass,
                eventId: eventId,
              };

              dispatch(setPass(tempPasses));
            } else {
              const tempPasses: IPass = {
                pass: null,
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
    } else {
      const tempPasses: IPass = {
        pass: null,
        eventId: null,
      };

      dispatch(setPass(tempPasses));
    }
  }, [event]);

  // set passCategory
  useEffect(() => {
    const getPassCategory = async (passId: number) => {
      getPassCategories(passId).then((response) => {
        const { message, data } = response;

        if (data.length > 0) {
          data.map((item: any) => {
            const tempPassCategory: PassCategory = {
              id: item.id,
              title: item.title,
              slug: item.slug,
              tokenId: item.tokenId,
              numberOfTokens: item.numberOfTokens,
              price: item.price,
            };

            tempPassCategories.push(tempPassCategory);
          });

          dispatch(setPassCategories(tempPassCategories));
        } else dispatch(setPassCategories(tempPassCategories));
      });
    };

    const passId = pass?.id;
    let tempPassCategories: PassCategory[] = [];
    if (passId) getPassCategory(passId);
    else dispatch(setPassCategories(tempPassCategories));
  }, [pass]);

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
      <div className="sticky top-0 z-10 bg-white shadow-md drop-shadow-xl">
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
