import { Label } from '@/Atoms/Label';
import { NftsCards } from '@/Molecules/Cards/NftsCards';

import BlackBanner from '@/Atoms/Banner/BlackBanner';
import { Logo } from '@/Molecules/Logo';
import { ConnectWallet } from '@/Organisms/UserAccount/ConnectWallet';

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import { ROUTES } from '@/config/routes';

const Home = () => {
  const Router = useRouter();

  const ContractEvents = useAppSelector((state) => state.event.contractEvents);

  const ClickCardHandler = (eventId: number | string) => {
    if (typeof eventId == 'string')
      Router.push(ROUTES.overviews.eventDetails(eventId));
  };

  return (
    <>
      <BlackBanner>
        <div className="pb-12 mx-auto pt-28 sm:pt-12 sm:pb-16 lg:pt-28 lg:pb-44">
          <div className="flex flex-col items-center px-4 mx-auto text-center sm:px-6 lg:px-8">
            <Logo
              className="w-auto h-16 sm:p-5 sm:h-32"
              logoSrc="/eventr.png"
            />

            <Label className="mt-6 text-3xl font-bold tracking-normal text-white sm:text-5xl lg:text-7xl">
              Your contract.Your rules.
            </Label>

            <Label>
              <h3 className="mt-4 tracking-wide text-center text-white text-md sm:text-xl">
                Feel free to organize your events
              </h3>
            </Label>

            <div className="my-3 mt-16">
              <ConnectWallet
                bgColor="bg-black hover:bg-gray-900"
                textProperties="whitespace-nowrap text-white sm:text-base leading-4"
                padding="px-3 py-2 sm:px-6 sm:py-3"
              />
            </div>
          </div>
        </div>
      </BlackBanner>

      <section className="relative w-full bg-[#001232] min-h-[700px] h-full ">
        <div className="block bg-[#0A1E5E] h-96" />

        <div className="absolute inset-0 w-full h-full max-w-6xl min-w-full px-4 mx-auto sm:w-auto sm:px-6 lg:px-8">
          <Label className="flex flex-col gap-2 px-4 my-12 text-center md:whitespace-nowrap md:flex-row md:text-left sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-white sm:text-5xl">
              Organize any Events.
            </h3>

            <h4 className="text-lg sm:text-2xl text-[#AEAEAE] pt-5">
              Through Eventr DApp.
            </h4>
          </Label>

          <NftsCards
            onClickCardHandler={ClickCardHandler}
            className="flex w-full gap-6 px-2 pb-8 overflow-x-scroll sm:px-6 lg:px-8 scroll-smooth "
            // scrollbar-hide
            allEvents={ContractEvents}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
