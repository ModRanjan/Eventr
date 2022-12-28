import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactModal from 'react-modal';

import Header from '../Header';
import Footer from '../Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  if (typeof window !== 'undefined') {
    ReactModal.setAppElement('body');
  }

  return (
    <>
      <Head>
        <title>Eventr</title>
        <meta name="description" content="" />
        <link rel="icon" href="/eventr.ico" />
      </Head>

      <div className="min-h-screen">
        <Header />

        {/*
          <div className="hidden md:block"> <MenuBar /></div> 
        */}

        {children}
        {/* <Footer /> */}

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
      </div>
    </>
  );
};

export default Layout;
