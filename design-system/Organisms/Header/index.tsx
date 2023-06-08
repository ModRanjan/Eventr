import React, { useState, useEffect } from 'react';

import { Breadcrumb } from '@/Atoms/Breadcum';
import { Logo } from '@/Molecules/Logo';

import { UserAccount } from '@/Organisms/UserAccount';

import { useAppSelector } from '@/redux/hooks';

const Header = () => {
  const [connected, setConnected] = useState(false);
  const walletData = useAppSelector((state) => state.wallets);

  useEffect(() => {
    const connected = walletData.loggedIn;
    setConnected(connected);
  }, [walletData]);

  return (
    <div
      className={`shadow-md z-40 top-0 ${connected ? 'bg-white' : 'bg-black'}`}
    >
      <div
        className={`flex items-center justify-between max-w-6xl px-4 mx-auto sm:px-6 lg:px-8 ${
          connected ? null : 'pt-4'
        }`}
      >
        <div className="flex justify-between h-16">
          <Logo
            url={connected ? '/Events' : '/Overviews/index-1'}
            logoSrc={connected ? '/eventr.svg' : '/eventr.png'}
            className="inline-block h-12 -ml-4 cursor-pointer w-14 sm:m-0"
          />

          <div className={connected ? 'inline-block self-center' : 'hidden'}>
            <Breadcrumb />
          </div>
        </div>

        <div className="relative items-center gap-x-6 sm:ml-auto">
          <UserAccount />
        </div>
      </div>
    </div>
  );
};

export default Header;
