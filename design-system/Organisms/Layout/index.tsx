import React, { useEffect } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactModal from 'react-modal';

import Header from '../Header';
import Footer from '../Footer';
import { useRouter } from 'next/router';
import PrimaryNavbar from '../Header/PrimaryNavbar';
import { Image } from '@/Atoms/Image';
import SubscribeHero from '@/Molecules/Hero/Subscribe';

import { UNAUTHENTICATED_ROUTES } from '@/config/routes';

import getAllEventData from '@/flow/scripts/get_allEventData';

import { useAppDispatch } from '@/redux/hooks';
import { IDeployedEvent } from '@/redux/event/types';
import { setContractEvents } from '@/redux/event/eventSlice';
import { Container } from '@/Atoms/Container';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const Router = useRouter();
  const dispatch = useAppDispatch();

  // get Contract Events
  useEffect(() => {
    const getAllContractEvent = async () => {
      try {
        const eventData = await getAllEventData();
        console.log('eventData: ', eventData);
        const tempEventData: IDeployedEvent[] = eventData.map(
          (eventData: any) => {
            const { eventID, eventName, metadata } = eventData;

            return {
              eventId: eventID,
              profileURL: metadata.profileUrl,
              coverURL: metadata.coverUrl,
              eventName: eventName,
              startDate: new Date(
                Number(metadata.startTimeStamp),
              ).toDateString(),
              endDate: new Date(Number(metadata.endTimeStamp)).toDateString(),
              description: metadata.description,
              passType: metadata.passType,
              dropType: metadata.dropType,
            };
          },
        );

        dispatch(setContractEvents(tempEventData));
      } catch (error) {
        console.log('Get Contract Events Error: ', error);
      }
    };
    getAllContractEvent();
  }, []);

  // set AppElement for ReactModel
  if (typeof window !== 'undefined') {
    ReactModal.setAppElement('body');
  }

  console.log('router.pathname: ', Router.pathname);
  return (
    <>
      <Head>
        <title>Eventr</title>
        <meta name="description" content="" />
        <link rel="icon" href="/eventr.ico" />
      </Head>

      {UNAUTHENTICATED_ROUTES.includes(Router.pathname) ? (
        <section className="min-h-screen bg-[#05113E]">
          <PrimaryNavbar />

          {children}

          <div className="relative w-full pt-40 bg-[#001232]">
            <Image
              src="/images/footer/footer-shape.png"
              alt="footer-shape"
              className="w-full h-96"
            />

            <div className="absolute inset-0">
              <div className="pb-20 mt-16">
                <SubscribeHero />
              </div>

              <div className="w-full bg-[#0A1E5E] h-fit">
                <Footer />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <Header />
          {children}
        </>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  );
};

export default Layout;
