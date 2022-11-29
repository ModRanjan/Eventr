import { useState } from 'react';

import { Label } from '@/Atoms/Label';
import AccountDetails from '@/Molecules/Modals/AccountDetails';

type PropsType = {
  accountAddress: string;
  accountBalance: string;
  currencySymbol?: string;
  etherscan?: string;
};

export const UserDetails = ({
  accountAddress,
  accountBalance,
  currencySymbol,
  etherscan,
}: PropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="hidden text-sm font-semibold cursor-pointer md:block">
      <div
        className="flex rounded-md bg-gray-200 py-0.5"
        onClick={() => setIsModalOpen(true)}
      >
        {/* <Label className="px-3 py-1.5">
          <span>{walletData.accountBalance.slice(0, 5)}</span>
          <span> {currencySymbol}</span>
        </Label> */}
        <Label
          onHoverTitle="Wallet Address"
          className="mx-auto px-3 text-sm py-1.5 font-medium text-black hover:text-gray-700"
        >
          {accountAddress.slice(0, 5) + '...' + accountAddress.slice(13)}

          {/* walletData.currentAccount.slice(38, 42) */}
        </Label>
      </div>

      {isModalOpen && (
        <AccountDetails
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          currentAccount={accountAddress}
          etherscan={etherscan}
        />
      )}
    </div>
  );
};
