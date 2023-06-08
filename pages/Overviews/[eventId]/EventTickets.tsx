import { AiOutlineDoubleLeft } from 'react-icons/ai';

import { Button } from '@/Atoms/Button';
import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Paragraph } from '@/Atoms/Paragraph';
import { SimpleImageBanner } from '@/Atoms/Banner/SimpleImageBanner';

import { Card2 } from '@/Atoms/Card/index-2';
import { useRouter } from 'next/router';
import { ROUTES } from '@/config/routes';
import { Image } from '@/Atoms/Image';
import { useEffect, useState } from 'react';
import get_passCategories_data from '@/flow/scripts/get_passCategories_data';
import { CategoryDataType } from '@/Organisms/Deployed/EventDetails';
import getEventMetadata from '@/flow/scripts/get_EventMetadata';
import { IDeployedEvent } from '@/redux/event/types';
import { toast } from 'react-toastify';
import { MultipleTokenPurchaseModal } from '@/Molecules/Modals/MultipleTokenPurchaseModal';
import { SingleTokenPurchaseModal } from '@/Molecules/Modals/SingleTokenPurchaseModal';

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

const EventTickets = () => {
  const Router = useRouter();
  const [EventId, setEventId] = useState<string>();
  const [eventDetails, setEventDetails] = useState<IDeployedEvent>();
  const [formatedStartDate, setFormatedStartDate] = useState<string>();
  const [formatedEndDate, setFormatedEndDate] = useState<string>();

  const [categoriesData, setCategoriesData] = useState<CategoryDataType[]>([]);
  const [totalNoTokens, setTotalNoTokens] = useState<number>(0);
  const [currentTokenCount, setCurrentTokenCount] = useState<number>(0);

  const [showTokensPurchaseModal, setShowTokensPurchaseModal] = useState(false);
  const [showSinglePurchaseModal, setShowSinglePurchaseModal] = useState(false);
  const [choosenCategories, setChoosenCategories] =
    useState<CategoryDataType[]>();

  const ToEventDetails = () => {
    const queryString = Router.query;
    const { eventId } = queryString;
    console.log(eventId);
    if (typeof eventId === 'string') {
      setEventId(eventId);
      Router.push(ROUTES.overviews.eventDetails(eventId));
    }
  };

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
    const { eventId } = Router.query;

    if (eventId != undefined && typeof eventId === 'string')
      getEventData(eventId);
  }, [Router.query]);

  useEffect(() => {
    const eventId = eventDetails?.eventId;

    if (eventId) {
      getCategories(eventId);
    }
  }, [eventDetails]);

  const BuyTicketHandler = () => {
    setShowTokensPurchaseModal(true);
  };

  const getChoosenCategories = (Value: CategoryDataType[]) => {
    setShowTokensPurchaseModal(false);
    setShowSinglePurchaseModal(true);

    setChoosenCategories(Value);
  };

  console.log(categoriesData);
  return (
    <>
      <div className="w-full h-[400px]">
        <Image
          src={'/images/banner/banner07.jpg'}
          alt={'banner07'}
          className="absolute inset-0 object-cover object-center h-full overflow-hidden opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0f5ae0]  to-purple-900 opacity-60"></div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto mt-48 space-y-6 font-sans text-center text-gray-100 min-h-fit">
          <Label className="px-4 space-y-4 font-bold leading-relaxed uppercase sm:px-6 lg:px-8 font-OpenSans">
            <h2 className="text-4xl text-gray-100 lg:text-6xl line-clamp-2">
              {eventDetails?.eventName}
            </h2>
          </Label>

          <p className="px-6 text-lg sm:text-2xl line-clamp-4">
            17 South Sherman Street Astoria, NY 11106
          </p>
        </div>
      </div>

      <section className="mx-auto relative w-full h-full bg-[#0A1E5E]">
        <div className="flex items-center justify-between max-w-6xl px-4 py-6 m-auto text-white sm:py-8 sm:px-6">
          <Button
            onClick={ToEventDetails}
            customClasses="flex items-center gap-x-3 uppercase whitespace-nowrap  text-base rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-indigo-500 px-4 sm:px-8 py-1.5 sm:py-3"
          >
            <Icon icon={AiOutlineDoubleLeft} />
            BACK
          </Button>

          <p className="text-base text-white sm:text-xl fnt-normal font-Roboto">
            {formatedStartDate}
          </p>
          <div className="text-center">
            <p className="text-xl text-white sm:text-4xl">05:00</p>
            <p className="text-base text-white sm:text-xl font-Roboto">
              Mins Left
            </p>
          </div>
        </div>

        <div className="text-center  bg-[#001232] h-full sm:h-[48rem]">
          <div className="w-full max-w-4xl py-10 mx-auto text-center text-gray-300 sm:py-16 font-OpenSans">
            <Label className="text-lg sm:text-2xl -mt-2 text-[#31d7a9]">
              SIMPLE PRICING
            </Label>
            <h2 className="mt-3 text-2xl font-semibold sm:text-5xl">
              MAKE AN APPOINTMENT
            </h2>
            <Paragraph className="w-full px-4 mt-4 text-base text-center sm:mt-5 sm:text-xl text-slate-400 lg:px-10">
              You know exactly what you're paying for. Whether you need one
              ticket or multiple, you can easily purchase them without any
              additional charges.
            </Paragraph>
          </div>

          <div className="grid max-w-6xl grid-cols-1 gap-10 px-4 mx-auto sm:grid-cols-3 sm:px-6 min-h-96">
            {categoriesData.map((category, index) => (
              <Card2
                key={index}
                imgSrc={'/images/ticket/ticket-bg04.png'}
                buttonTitle={'Book Tickets'}
                title={category.categoryName}
                price={Number(category.price)}
                currencySymbool={'FLOW'}
                onClick={BuyTicketHandler}
              />
            ))}

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
          <Button
            onClick={BuyTicketHandler}
            customClasses="uppercase text-white whitespace-nowrap text-base rounded-3xl bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 px-4 sm:px-8 py-3 mt-10"
          >
            view all
          </Button>
        </div>
      </section>
    </>
  );
};

export default EventTickets;
