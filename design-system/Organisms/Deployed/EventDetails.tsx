import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FiChevronRight } from 'react-icons/fi';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';
import { NftCard } from '@/Atoms/Card/NftCard';
import { GridBanner } from '@/Atoms/Banner/GridBanner';

import { Logo } from '@/Molecules/Logo';
import { PassCard } from '@/Molecules/Cards/PassCard';
import { EventTokens } from '@/Molecules/EventTokens';
import { MultipleTokenPurchaseModal } from '@/Molecules/Modals/MultipleTokenPurchaseModal';

import { ROUTES } from '@/config/routes';

import getEventMetadata from '@/flow/scripts/get_EventMetadata';

import get_passCategories_data from '@/flow/scripts/get_passCategories_data';

import { SingleTokenPurchaseModal } from '@/Molecules/Modals/SingleTokenPurchaseModal';
import { Image } from '@/Atoms/Image';
import getAllEventData from '@/flow/scripts/get_allEventData';
import { NftsCards } from '@/Molecules/Cards/NftsCards';
import { IDeployedEvent } from '@/redux/event/types';

export interface CategoryDataType {
  categoryID: string;
  categoryName: string;
  eventID: string;
  maxEditions: string;
  currentCount: string;
  tokenLeft: number;
  price: string;
  eventOwner: string;
  buy: JSX.Element;
  choosenQuantity: number;
}

const buyButton = (
  <Button
    type="button"
    bgColor="bg-black hover:bg-gray-700 border-transparent"
    padding="px-4 py-2"
    textProperties="text-white text-base leading-4 text-gray-200"
    width="w-fit"
  >
    purchase
  </Button>
);

const EventDetails = () => {
  const router = useRouter();
  const eventSectionRef = useRef<HTMLElement>(null);

  const [showTokensPurchaseModal, setShowTokensPurchaseModal] = useState(false);
  const [showSinglePurchaseModal, setShowSinglePurchaseModal] = useState(false);
  const [eventDetails, setEventDetails] = useState<IDeployedEvent>();
  const [formatedStartDate, setFormatedStartDate] = useState<string>();
  const [formatedEndDate, setFormatedEndDate] = useState<string>();

  const [modalData, setModalData] = useState<CategoryDataType>();
  const [categoriesData, setCategoriesData] = useState<CategoryDataType[]>([]);
  const [startingPrice, setStartingPrice] = useState<number>(9);
  const [totalNoTokens, setTotalNoTokens] = useState<number>(0);
  const [currentTokenCount, setCurrentTokenCount] = useState<number>(0);
  const [choosenCategories, setChoosenCategories] =
    useState<CategoryDataType[]>();

  const [allContractEvent, setAllContractEvent] = useState<IDeployedEvent[]>(
    [],
  );

  useEffect(() => {
    const getAllContractEvent = async () => {
      try {
        const eventData = await getAllEventData();
        const tempEventData = eventData.map((eventData: any) => {
          const { eventID, eventName, metadata } = eventData;

          return {
            eventId: eventID,
            profileURL: metadata.profileUrl,
            coverURL: metadata.coverUrl,
            eventName: eventName,
            startDate: new Date(Number(metadata.startTimeStamp)).toDateString(),
            endDate: new Date(Number(metadata.endTimeStamp)).toDateString(),
            description: metadata.description,
            passType: metadata.passType,
            dropType: metadata.dropType,
          };
        });

        setAllContractEvent(tempEventData);
      } catch (error: any) {
        console.log('GetContractEvents Error: ', error.message);
        toast.error(error.message);
      }
    };

    getAllContractEvent();
  }, []);

  // get Deployed Event MetaData
  const getEventData = async (eventId: string) => {
    try {
      const transactions = await getEventMetadata(eventId);

      if (transactions) {
        let formatedStartDate = new Date(
          Number(transactions.startTimeStamp),
        ).toLocaleString('en-US', {
          // weekday: 'short', // long, short, narrow
          day: 'numeric', // numeric, 2-digit
          year: 'numeric', // numeric, 2-digit
          month: 'long', // numeric, 2-digit, long, short, narrow
          hour: 'numeric', // numeric, 2-digit
          minute: 'numeric', // numeric, 2-digit
          // second: 'numeric', // numeric, 2-digit
        }); //Tue, July 21, 2020, 10:01:14 AM;

        let formatedEndDate = new Date(
          Number(transactions.endTimeStamp),
        ).toLocaleString('en-US', {
          day: 'numeric',
          year: 'numeric',
          month: 'long',
        });

        setFormatedStartDate(formatedStartDate);
        setFormatedEndDate(formatedEndDate);

        const tempEventMetadata: IDeployedEvent = {
          eventId: transactions.eventID,
          eventName: transactions.eventName,
          startDate: transactions.startTimeStamp,
          endDate: transactions.startTimeStamp,
          description: transactions.description,
          passName: transactions.passName,
          passType: transactions.passType,
          dropType: transactions.dropType,
          profileURL: transactions.profileUrl,
          coverURL: transactions.coverUrl,
          ownerAddress: transactions.ownerAddress,
        };

        setEventDetails(tempEventMetadata);
        return {};
      }
    } catch (error) {
      console.log('Get Contract Events Error: ', error);
    }
  };

  // get pass-categories
  const getCategories = async (eventId: string) => {
    let CategoryData: CategoryDataType[] = [];

    try {
      const transactions = await get_passCategories_data(eventId);
      console.log('get_passCategories_data', transactions);
      let totalToken = 0;
      let currentToken = 0;

      if (transactions.length && eventDetails) {
        transactions.map((transaction: CategoryDataType) => {
          currentToken += Number(transaction.currentCount);
          totalToken += Number(transaction.maxEditions);

          CategoryData.push({
            ...transaction,
            tokenLeft:
              Number(transaction.maxEditions) -
              Number(transaction.currentCount),
            buy: buyButton,
            eventOwner: eventDetails?.ownerAddress,
            choosenQuantity: 0,
          });
        });
      }

      setTotalNoTokens(totalToken);
      setCurrentTokenCount(currentToken);
      setCategoriesData(CategoryData);
    } catch (error: any) {
      console.log('Get passCategories Error: ', error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const { eventId } = router.query;

    if (eventId != undefined && typeof eventId === 'string')
      getEventData(eventId);
  }, [router.query]);

  useEffect(() => {
    const eventId = eventDetails?.eventId;

    if (eventId) {
      getCategories(eventId);
    }
  }, [eventDetails]);

  const getChoosenCategories = (Value: CategoryDataType[]) => {
    setShowTokensPurchaseModal(false);
    setShowSinglePurchaseModal(true);

    setChoosenCategories(Value);
  };

  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    if (null != elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const onClickRowHandler = async (value: CategoryDataType) => {
    setModalData(value);
    setShowSinglePurchaseModal(true);
  };

  const onClickEventCard = (ID: string | number) => {
    if (ID != undefined && typeof ID === 'string') getEventData(ID);
  };

  return (
    <>
      {eventDetails && (
        <GridBanner
          scrollToSection={scrollToSection}
          tokenRef={eventSectionRef}
          eventName={eventDetails.eventName}
          description={eventDetails.description}
          imgUrl={eventDetails.coverURL}
          startingPrice={startingPrice}
          startDate={eventDetails.startDate}
          maxTokenCount={totalNoTokens - currentTokenCount}
        />
      )}

      <section className="section" ref={eventSectionRef}>
        <Label className="py-6 section-title sm:py-8">About Event</Label>

        <div className="relative mx-auto mb-6 overflow-hidden border border-gray-300 rounded-xl sm:px-0 lg:mb-16">
          <div className="absolute inset-0 w-full sm:h-[400px] min-h-[400px] -z-10">
            <Image
              src={'/images/card-bg.png'}
              className={`object-right-bottom h-full sm:h-auto w-full opacity-30 rounded-md rotate-180 sm:translate-x-64 sm:-translate-y-3/4`}
            />
          </div>

          <div className="flex flex-col lg:h-[400px] sm:flex-row">
            <div className="flex flex-col w-full px-4 py-4 bg-white gap-y-4 sm:py-3 md:w-3/5 sm:px-6 lg:px-8">
              <Label className="section-title">
                {eventDetails?.eventName}
                <Logo className="inline float-right h-10 float" />
              </Label>

              <div className="w-full text-sm">
                <span className="block mb-2 text-base font-medium">
                  Description:
                </span>

                <span className="inline-block text-base font-normal font-Roboto min-h-[120px] max-h-[120px] overflow-y-auto">
                  {eventDetails?.description}
                </span>
              </div>

              <div className="flex flex-col items-center justify-between text-sm gap-y-2 sm:flex-row">
                <div className="self-center w-full">
                  <span className="block text-base font-medium">
                    Start Date:
                  </span>

                  <span className="text-lg">{formatedStartDate}</span>
                </div>

                <div className="self-center w-full ">
                  <span className="block text-base font-medium">End Date:</span>

                  <span className="text-lg">{formatedEndDate}</span>
                </div>
              </div>

              <div className="w-full space-x-2 text-sm">
                <span className="mb-1 text-base font-medium ">
                  Number of Tokens:
                </span>

                <span className="text-lg">
                  {currentTokenCount} <span>&#47;</span>
                  {totalNoTokens}
                </span>
              </div>
            </div>

            <div className="z-10 flex-col w-full px-4 pt-6 border-gray-300 shadow-xl sm:border-l-2 shadow-slate-200 sm:rounded-l-xl sm:pt-3 md:w-2/5 md:flex sm:px-6 lg:px-8">
              <Label className="text-2xl font-black">Pass</Label>

              <div className="relative mt-4">
                {eventDetails && (
                  <PassCard
                    title={eventDetails.passName}
                    createdBy={eventDetails.ownerAddress}
                    imgURL={eventDetails?.coverURL}
                    passType={eventDetails.dropType}
                    contractAddress={eventDetails.ownerAddress}
                    contractType={eventDetails.passType}
                    onClick={() => console.log('pass')}
                  />
                )}

                {showTokensPurchaseModal && (
                  <MultipleTokenPurchaseModal
                    handleCloseModal={() => setShowTokensPurchaseModal(false)}
                    isModalOpen={showTokensPurchaseModal}
                    modalTitle="Purchase Token"
                    categoriesData={categoriesData}
                    getCategoriesData={getChoosenCategories}
                  />
                )}

                {showSinglePurchaseModal && choosenCategories && (
                  <SingleTokenPurchaseModal
                    modalTitle="Purchase Token"
                    isModalOpen={showSinglePurchaseModal}
                    handleCloseModal={() => setShowSinglePurchaseModal(false)}
                    tokenData={choosenCategories}
                  />
                )}
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  onClick={() => setShowTokensPurchaseModal(true)}
                  display="flex items-center justify-center flex-shrink-0 "
                  padding="px-4 py-2.5 mb-4 sm:mb-auto"
                  textProperties="text-base font-medium text-black"
                  width="w-full"
                >
                  Purchase Tokens
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" ref={eventSectionRef}>
        <Label className="py-6 section-title sm:py-8">Event Tokens</Label>

        <div className="py-5 pb-6 mx-auto sm:py-6 sm:px-0 lg:pb-16">
          <EventTokens
            data={categoriesData}
            puchaseHandler={onClickRowHandler}
          />

          {showSinglePurchaseModal && modalData && (
            <SingleTokenPurchaseModal
              modalTitle="Purchase Token"
              isModalOpen={showSinglePurchaseModal}
              handleCloseModal={() => setShowSinglePurchaseModal(false)}
              tokenData={modalData}
            />
          )}
        </div>
      </section>

      <section className="section">
        <Label className="flex items-center justify-between">
          <h3 className="py-6 section-title sm:py-8">All Events</h3>

          <Button
            onClick={() => router.push(ROUTES.deployed.events())}
            type="button"
            padding="px-4 py-2"
            width="w-fit"
          >
            <span className="text-base font-medium text-black">View all</span>

            <Icon
              icon={FiChevronRight}
              className="w-5 h-5 ml-2 text-gray-500"
            />
          </Button>
        </Label>

        <NftsCards
          onClickCardHandler={onClickEventCard}
          className="flex w-auto gap-4 pb-12 overflow-x-scroll"
          allEvents={allContractEvent}
        />
      </section>
    </>
  );
};

export default EventDetails;
