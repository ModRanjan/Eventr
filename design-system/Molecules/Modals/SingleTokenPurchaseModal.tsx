import { useEffect, useState } from 'react';
import { BiXCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import * as fcl from '@onflow/fcl';

import { Icon } from '@/Atoms/Icon';
import { Button } from '@/Atoms/Button';
import { CustomModal } from '@/Atoms/Modal/CustomModal';

import { Logo } from '@/Molecules/Logo';
import { TransactionStatus } from '@/Molecules/TrnsactionStatus';
import { PurchaseProcess } from '@/Molecules/Processes/PurchaseProcess';
import { CategoryDataType } from '@/Organisms/Deployed/EventDetails';

import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import {
  setPurchaseProcess,
  reSetProcessState,
} from '@/redux/processes/procesesSlice';

import mintToken from '@/flow/transactions/mint_Token';
import mintTokens from '@/flow/transactions/mint_Tokens';
import removeCollection from '@/flow/transactions/remove_collection';
import checkAccountHasCollection from '@/flow/scripts/check_collection';
import createEmptyCollection from '@/flow/transactions/create_empty_collection';

type DeployEventProps = {
  handleCloseModal: (txHash: string) => void;
  isModalOpen: boolean;
  modalTitle: string;
  tokenData: CategoryDataType | CategoryDataType[];
};

export const SingleTokenPurchaseModal = ({
  handleCloseModal,
  isModalOpen,
  modalTitle,
  tokenData,
}: DeployEventProps) => {
  const dispatch = useAppDispatch();
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [deployingEvent, setDeployingEvent] = useState(false);
  const [txMessage, setTxMessage] = useState<string>();
  const [txHash, setTxHash] = useState<string>();
  const [currentAddress, setCurrentAddress] = useState<string>();
  const PurchaseProcessData = useAppSelector(
    (state) => state.processes.PurchaseProcess,
  );
  const currentWallet = useAppSelector(
    (state) => state.wallets.connectedWallets,
  );

  const checkCollection = async (address: string) => {
    try {
      const transaction: boolean = await checkAccountHasCollection(address);

      if (transaction) {
        dispatch(setPurchaseProcess('SetupAccount'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let WalletAddress: string;

    if (currentWallet) {
      WalletAddress = currentWallet[0].currentAccount;

      checkCollection(WalletAddress);

      setCurrentAddress(WalletAddress);
    }
  }, [currentWallet]);

  const removeOldEventrCollection = async () => {
    setLoadingAccount(true);

    try {
      const transaction = await removeCollection();
      const transactionHash: string = transaction.transactionId;

      setTxHash(transactionHash);
      setTxMessage('Old Eventr Collection Removed');

      const transactionStatus = await fcl.tx(transaction).onceSealed();

      if (
        transactionStatus.status == 4 &&
        transactionStatus.errorMessage == ''
      ) {
        dispatch(setPurchaseProcess('SetupAccount'));
      }
    } catch (error) {
      console.log(`Removal Eventr-Collection Error: `, error);
      toast.error('Removal of Old Eventr-Collection Failed!');
    } finally {
      setLoadingAccount(false);
    }
  };

  const setUpAccount = async () => {
    setLoadingAccount(true);

    try {
      const transaction = await createEmptyCollection();

      const transactionHash: string = transaction.transactionId;

      setTxHash(transactionHash);
      setTxMessage('Account Set-up Successfull');
    } catch (error) {
      console.log('Set-up Account Error: ', error);

      toast.error('Account Set-up Process failed! try again');
    } finally {
      setLoadingAccount(false);
    }
  };

  const purchaseToken = async () => {
    setDeployingEvent(true);
    console.log('Array.isArray(tokenData): ', Array.isArray(tokenData));
    console.log('Array.isArray(tokenData): ', Array.isArray(tokenData));
    const tokens = Array.isArray(tokenData) ? tokenData[0] : tokenData;

    const eventID = tokens.eventID;
    const ownerAddr = tokens.eventOwner;

    const CategoryIds: number[] = [];
    const Quantities: number[] = [];
    if (Array.isArray(tokenData)) {
      tokenData.forEach((item: CategoryDataType) => {
        if (item.choosenQuantity != 0) {
          CategoryIds.push(Number(item.categoryID));
          Quantities.push(item.choosenQuantity);
        }
      });
      console.log(CategoryIds, Quantities);
    }

    try {
      const transaction = await (Array.isArray(tokenData)
        ? mintTokens(eventID, CategoryIds, Quantities, ownerAddr)
        : mintToken(eventID, tokens.categoryID, ownerAddr));

      const transactionHash: string = transaction.transactionId;
      setTxHash(transactionHash);

      setTxMessage('Token Purchased');

      const transactionStatus = await fcl.tx(transaction).onceSealed();

      if (
        transactionStatus.status == 4 &&
        transactionStatus.errorMessage == ''
      ) {
        console.log(transactionStatus);

        dispatch(setPurchaseProcess('Purchase'));
      }
    } catch (error) {
      console.log('Purchase Token Error: ', error);
      toast.error('Purchase Token Error!, try again');
    } finally {
      setDeployingEvent(false);
    }
  };

  const CloseModal = () => {
    handleCloseModal(txHash ?? '');
    dispatch(reSetProcessState());
  };

  return (
    <CustomModal
      open={isModalOpen}
      handleCloseModal={CloseModal}
      label={modalTitle}
      width="sm:max-w-md w-full max-w-sm lg:max-w-xl"
      height="h-fit"
    >
      <div className="relative flex items-center justify-center w-full h-auto mx-auto -mt-2">
        <Logo className="block w-auto h-10 sm:h-14" />

        <Button
          onClick={() => handleCloseModal(txHash ?? '')}
          type="button"
          customClasses="absolute top-1 right-5 border-0 px-0 py-0 -mr-1 text-sm text-gray-500 hover:text-gray-900 w-fit"
        >
          <Icon className="h-6 w-9" icon={BiXCircle} />
        </Button>
      </div>

      <p className="mt-4 text-lg text-center text-bold font-Roboto md:text-xl">
        {modalTitle}
      </p>

      <div className="w-full px-6 text-xs text-white border-b-2 border-gray-400 shadow-md drop-shadow-xl">
        a
      </div>

      <div className="block w-full px-6 py-2 mb-2 overflow-y-auto sm:px-8 max-h-[17rem]">
        <PurchaseProcess />

        <TransactionStatus
          txHash={txHash}
          txMessage={txMessage}
          callback={() => setLoadingAccount(false)}
        />
      </div>

      <div className="flex items-center pr-6 ml-auto w-fit gap-x-2">
        <Button
          type="button"
          // onClick={removeOldEventrCollection}
          onClick={setUpAccount}
          disabled={PurchaseProcessData[0].progress != 0}
          display="inline-flex"
          padding="px-3 py-2.5"
          textProperties="text-sm text-black leading-4"
          width="w-fit"
          loading={loadingAccount}
        >
          Set-up Account
        </Button>

        <Button
          type="button"
          onClick={purchaseToken}
          bgColor="bg-black hover:bg-gray-700"
          display="inline-flex justify-self-end"
          padding="px-3 py-2.5"
          textProperties="text-sm text-white leading-4"
          width="w-fit"
          disabled={PurchaseProcessData[1].progress != 1}
          loading={deployingEvent}
        >
          Purchase
        </Button>
      </div>
    </CustomModal>
  );
};

/**useEffect(() => {
    if (Array.isArray(tokenData)) {
      const CategoryIds: number[] = [];
      const Quantities: number[] = [];

      tokenData.map((item: CategoryDataType) => {
        if (item.choosenQuantity != 0) {
          CategoryIds.push(Number(item.categoryID));
          Quantities.push(item.choosenQuantity);
        }
      });
      console.log(`CategoryIds: ${CategoryIds} Quantities: ${Quantities}`);
    }
  }, [tokenData]); */
