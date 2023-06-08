import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/Atoms/Button/Dropdown';
import { PrimaryNavItems } from '@/config/navItems';
import { Logo } from '@/Molecules/Logo';
import { MobileNavigation, Navigation } from '@/Molecules/Navigation';
import { useAppSelector } from '@/redux/hooks';

import { ConnectWallet } from '../UserAccount/ConnectWallet';

const transitionNavBar = (): boolean => {
  if (window.scrollY > 100) {
    return true;
  }

  return false;
};

const PrimaryNavbar = () => {
  let [isScrolled, setIsScrolled] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [connected, setConnected] = useState(false);
  const walletData = useAppSelector((state) => state.wallets);

  // set Wallet is connected or not
  useEffect(() => {
    const connected = walletData.loggedIn;
    setConnected(connected);
  }, [walletData]);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);

      setShow(transitionNavBar());
    }
    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 w-full sticky top-0 z-[100] ${
        !isScrolled && 'border-b'
      } border-[#31d7a9] border-opacity-30 ${show && 'bg-[#0A1E5E]'}`}
    >
      <div className={`max-w-6xl px-4 mx-auto`}>
        <div className={`flex items-center justify-between`}>
          <div className="flex justify-between">
            <Logo
              url="/"
              logoSrc="/eventr.png"
              className="inline-block h-12 -ml-4 cursor-pointer w-14 sm:m-0"
            />
          </div>

          <div className="relative items-center hidden gap-x-6 sm:ml-auto md:flex">
            <Navigation
              className="flex h-full space-x-6 text-lg font-semibold text-white font-OpenSans"
              navigation={PrimaryNavItems}
            />

            <ConnectWallet
              customClasses={`cursor-pointer uppercase whitespace-nowrap text-white text-base rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-indigo-500 hover:bg-gray-900 px-3 py-2 sm:px-6 sm:py-3 w-fit`}
            />
          </div>

          <div className="relative flex md:hidden">
            <MobileNavigation navigation={PrimaryNavItems} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PrimaryNavbar;
