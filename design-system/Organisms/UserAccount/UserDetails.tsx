import { useState } from 'react';
import AccountDetails from '../../Molecules/Modals/AccountDetails';
import { Label } from '../../Atom/Label';
import {IWalletData} from "../../../redux/reducer/data.type"

type PropsType={
  walletData:IWalletData;
  currencySymbol:string;
  etherscan: string;
}

export const UserDetails = ({ walletData, currencySymbol, etherscan }:PropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal=()=>setIsModalOpen(false)
  
  return (
    <div className="hidden text-sm font-semibold cursor-pointer  md:block">
      <div
        className="flex rounded-lg bg-gray-200 py-0.5 "
        onClick={() => setIsModalOpen(true)}
      >
        <Label className="px-3 py-1 ">
          <span>{walletData.accountBalance.slice(0, 5)}</span>
          <span> {currencySymbol}</span>
        </Label>
        <Label
          onHoverTitle={walletData.currentAccount}
          className="px-3 py-1 bg-gray-100 rounded-r-lg "
        >
          {walletData.currentAccount.slice(0, 5) +
            '...' +
            walletData.currentAccount.slice(38, 42)}
        </Label>
      </div>

      {isModalOpen && (
        <AccountDetails
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          currentAccount={walletData.currentAccount}
          etherscan={etherscan}
        />
      )}
    </div>
  );
};
