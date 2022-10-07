import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { setWalletData } from '../../../redux/action';
import { UserDetails } from './UserDetails';
import { ConnectWallet } from './ConnectWallet';
import { Icon } from '../../Atom/Icon';
import { AiOutlineLogout } from 'react-icons/ai';
import {IRootState} from "../../../redux/store"

export const UserAccount = () => {
  const dispatch = useDispatch();
  const walletData = useSelector((state:IRootState) => state.WalletDataReducer);
  const chainData = useSelector((state:IRootState) => state.ChainDataReducer);

  useEffect(() => {
    let walletStatus = JSON.parse((window as any).sessionStorage.getItem('walletData'));

    if (walletStatus && walletStatus.isConnected) {
      fetchWalletData();
    }
  }, []);


  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', async () => {
        await fetchWalletData();
      });
      window.ethereum.on('chainChanged', async () => {
        await fetchWalletData();
      });
    }
  }, []);
  const fetchWalletData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    let accountbalance: ethers.BigNumber = await provider.getBalance(account);
    let balance:string = ethers.utils.formatEther(accountbalance);

    const data = {
      currentAccount: account,
      accountBalance: balance,
      isConnected: account && true,
      provider: provider,
      signer: signer,
    };
    window.sessionStorage.setItem(
      'walletData',
      JSON.stringify({
        currentAccount: account,
        accountBalance: balance,
        isConnected: account && true,
      }),
    );
    dispatch(setWalletData(data));
  };

  function handleLogout() {
    const data = {
      currentAccount: '',
      accountBalance: '',
      isConnected: false,
    };
    window.sessionStorage.setItem('walletData', JSON.stringify(data));
    dispatch(setWalletData(data));
  }

  return( 
    walletData.isConnected ? (
    <>
      <UserDetails
        walletData={walletData}
        currencySymbol={chainData.nativeCurrencySymbol}
        etherscan={chainData.etherscan}
      />
      <button onClick={handleLogout} title="Logout" className="cursor-pointer">
        <Icon icon={AiOutlineLogout} className="w-full h-full pr-2 text-3xl" />
      </button>
    </>
  ) : (
    <ConnectWallet />
  )
  )
};
