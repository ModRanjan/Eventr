import React,{useState,useRef,useEffect,useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setChainData } from '../../../redux/action';
import { toast } from 'react-toastify';
import Logo from "../../Molecules/Logo"
import { chainList } from '../../../config/chainList';
import {Alert} from "../../Atom/Alert"
import {Dropdown} from "../../Atom/Dropdown"
import {UserAccount} from "../UserAccount"
import { Menu } from '../../Atom/Menu';
import { MenuBar } from '../../Molecules/MenuBar';
import {IRootState} from "../../../redux/store"
import OutsideClickHandler from "react-outside-click-handler"
import { NetworksDropdown } from '../../Molecules/NetworkDropdown';
import { getCurrentChainId } from '../../../utils/network/getCurrentChainId';
import { changeNetwork } from '../../../utils/network/changeNetwork';
import {IChainData} from "../../../redux/reducer/data.type"
const Header = () => {
  const chainData = useSelector((state:IRootState) => state.ChainDataReducer);

  const dispatch = useDispatch();
  const [openChaiList, setOpenChaiList] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    fetchCurrentChainData();
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', function (chainId:number) {
        fetchCurrentChainData();
      });
    }
  }, []);

  const handleChainList = useCallback(() => {
    setOpenChaiList(!openChaiList);
  }, [openChaiList]);

  const handleOnClickDropdownItem = (data:IChainData) => {
    if (typeof window.ethereum !== 'undefined') {
      changeNetwork(data);
    } else {
      changeNetworkLocally(data);
    }
    handleChainList();
  };

  const handleOnClickOutside = (e:any) => {
    let isOutsideClickable:boolean = true;
    for (let i:number = 0; i < 3; i++) {
      if (e.path[i] == dropdownRef.current) {
        isOutsideClickable = false;
        break;
      }
    }
    if (isOutsideClickable) {
      setOpenChaiList(false);
    }
  };

  const fetchCurrentChainData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await getCurrentChainId();
      if (chainId) {
        const currentChain = chainList.filter(function (val) {
          return val.chainId == chainId;
        });
        if (currentChain.length != 0) {
          dispatch(setChainData(currentChain[0]));
        } else {
          toast.error(
            'Connected to unsupported Network, Change your network in metamask',
          );
          await changeNetwork(chainList[0]);
        }
      }
    } else {
      dispatch(setChainData(chainList[0]));
    }
  };

  const changeNetworkLocally = (data:IChainData) => {
    dispatch(setChainData(data));
  };

  const handleOnClickMenu=() => setOpenMenu(!openMenu)

  return (
    <>
      <div className="sticky top-0 bg-white ">
        {typeof window.ethereum === 'undefined' && (
          <Alert>
            <div>
              MetaMask Extension Not Found !
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                target="_blank"
                className="ml-1 font-bold "
                rel="noreferrer"
              >
                Click here to Install MetaMask
              </a>
            </div>
          </Alert>
        )}
        <div className="container flex items-center justify-between px-2 py-2 mx-auto">
          <div className="lg:ml-16 ">
            <Logo url="/" className="h-8 cursor-pointer md:h-12" />
          </div>
          <div className="flex space-x-2 md:space-x-5">
            <Dropdown
              imgSrc={chainData.logoUrl}
              name={chainData.name}
              dropdownRef={dropdownRef}
              dropdownOnClick={handleChainList}
            />
            <UserAccount />
            <Menu openMenu={openMenu} onClickMenu={handleOnClickMenu} />
          </div>
        </div>
      </div>
      {openMenu && (
        <OutsideClickHandler onOutsideClick={() => setOpenMenu(false)}>
          <div
            className="fixed z-20 w-full pb-2 duration-500 bg-white shadow-xl md:hidden"
            onClick={() => setOpenMenu(false)}
          >
            <MenuBar />
          </div>
        </OutsideClickHandler>
      )}
      {openChaiList && (
        <OutsideClickHandler onOutsideClick={handleOnClickOutside}>
          <NetworksDropdown
            dropdownItems={chainList}
            onClickDropdownItem={handleOnClickDropdownItem}
          />
        </OutsideClickHandler>
      )}
    </>
  )
}

export default Header