import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'react-toastify';
import OutsideClickHandler from 'react-outside-click-handler';

import { Alert } from '@/Atoms/Alert';
import { Menu } from '@/Atoms/Menu';
import { Dropdown } from '@/Atoms/Dropdown';
import Logo from '@/Molecules/Logo';
import { MenuBar } from '@/Molecules/MenuBar';
import { Navigation } from '@/Molecules/Navigation';
import { NetworksDropdown } from '@/Molecules/NetworkDropdown';
import { UserAccount } from '../UserAccount';

import { navItems } from '@/config/navItems';
import { chainList, IChainData } from '@/config/chainList';
import { getCurrentChainId } from '@/utils/network/getCurrentChainId';
import { changeNetwork } from '@/utils/network/changeNetwork';
import { setChainData } from '@/redux/action';

const Header = () => {
  const dropdownRef = useRef();
  const [connected, setConnected] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openChaiList, setOpenChaiList] = useState(false);

  // const dispatch = useDispatch();
  // const chainData = useAppSelector((state) => state.ChainDataReducer);
  const walletData = useAppSelector((state) => state.wallets);

  // useEffect(() => {
  //   fetchCurrentChainData();
  //   if (typeof window.ethereum !== 'undefined') {
  //     window.ethereum.on('chainChanged', function (chainId: number) {
  //       fetchCurrentChainData();
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const connected = walletData.loggedIn;
    setConnected(connected);
  }, [walletData]);

  const handleChainList = useCallback(() => {
    setOpenChaiList(!openChaiList);
  }, [openChaiList]);

  const handleOnClickDropdownItem = (data: IChainData) => {
    if (typeof window.ethereum !== 'undefined') {
      changeNetwork(data);
    } else {
      changeNetworkLocally(data);
    }
    handleChainList();
  };

  const handleOnClickOutside = (e: any) => {
    let isOutsideClickable: boolean = true;
    for (let i: number = 0; i < 3; i++) {
      if (e.path[i] == dropdownRef.current) {
        isOutsideClickable = false;
        break;
      }
    }
    if (isOutsideClickable) {
      setOpenChaiList(false);
    }
  };

  // const fetchCurrentChainData = async () => {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const chainId = await getCurrentChainId();
  //     if (chainId) {
  //       const currentChain = chainList.filter(function (val) {
  //         return val.chainId == chainId;
  //       });
  //       if (currentChain.length != 0) {
  //         dispatch(setChainData(currentChain[0]));
  //       } else {
  //         toast.error(
  //           'Connected to unsupported Network, Change your network in metamask',
  //         );
  //         await changeNetwork(chainList[0]);
  //       }
  //     }
  //   } else {
  //     dispatch(setChainData(chainList[0]));
  //   }
  // };

  const changeNetworkLocally = (data: IChainData) => {
    // dispatch(setChainData(data));
  };

  const handleOnClickMenu = () => setOpenMenu(!openMenu);

  return (
    <div
      className={`shadow-md z-50 top-0  ${
        connected ? 'bg-white dark:bg-primary-800 ' : 'bg-black'
      }`}
    >
      <div
        className={`flex items-center justify-between max-w-6xl px-4 mx-auto sm:px-6 lg:px-8 ${
          connected ? null : 'pt-4'
        }`}
      >
        {connected && (
          <div className="flex justify-between h-16">
            <Logo url="/" className="h-8 cursor-pointer md:h-10" />
          </div>
        )}

        <div className="relative flex items-center sm:ml-auto direction-row">
          <div className="inline-block mr-auto md:mr-5">
            {connected ? (
              <div className="inline-block text-left z-5 md:block">
                <Dropdown
                  name={'testnet'}
                  dropdownRef={dropdownRef}
                  dropdownOnClick={handleChainList}
                />
                {openChaiList && (
                  <OutsideClickHandler onOutsideClick={handleOnClickOutside}>
                    <NetworksDropdown
                      dropdownItems={chainList}
                      onClickDropdownItem={handleOnClickDropdownItem}
                    />
                  </OutsideClickHandler>
                )}
              </div>
            ) : (
              <Navigation
                textProperties="text-white text-sm sm:text-md md:text-lg hover:text-gray-100"
                navItems={navItems}
              />
            )}
          </div>

          <UserAccount />
        </div>
      </div>
    </div>
  );
};

export default Header;
