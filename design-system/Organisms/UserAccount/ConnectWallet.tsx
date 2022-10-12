import { useDispatch } from 'react-redux';
import { setWalletData } from '../../../redux/action';
import { Button } from '../../Atom/Button';
import { getWalletData } from '../../../utils/web3';
type ConnectWalletProps={
  blocked?:boolean
}
export const ConnectWallet = ({ blocked }:ConnectWalletProps) => {
  const dispatch = useDispatch();

  const connectWallet = async () => {
    const data = await getWalletData();
    if (data) {
      const walletData = {
        currentAccount: data.currentAccount,
        accountBalance: data.accountBalance,
        isConnected: data.isConnected && true,
      };
      window.sessionStorage.setItem('walletData', JSON.stringify(walletData));
      dispatch(setWalletData(data));
      console.log(data);
    }
  };
  return (
    <Button 
    onClick={connectWallet}
     blocked={blocked}>
      Connect Wallet
    </Button>
  );
};
