import { useEffect, useState } from 'react';
import { BiXCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import * as fcl from '@onflow/fcl';

import { Icon } from '@/Atoms/Icon';
import { Button } from '@/Atoms/Button';
import { CustomModal } from '@/Atoms/Modal/CustomModal';

import { Logo } from '@/Molecules/Logo';
import { DeployProcess } from '@/Molecules/Processes/DeployProcess';

import { updateEvent } from '@/services/event';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { UpdateEvent } from 'types/createEvent.type';

import { getDeployArgs } from '@/flow/utils/helper';
import setupAccount from '@/flow/transactions/setup_account';
import removeCollection from '@/flow/transactions/remove_collection';
import deployEventAndCategory from '@/flow/transactions/deploy_Event';
import { deployEventAndCategories } from '@/flow/transactions/deploy_Event';
import { TransactionStatus } from '../TrnsactionStatus';
import { setDeploymentProcess } from '@/redux/processes/procesesSlice';

type DeployEventProps = {
  handleCloseModal: (txHash: string) => void;
  isModalOpen: boolean;
  modalTitle: string;
};

export const DeployEvent = ({
  handleCloseModal,
  isModalOpen,
  modalTitle,
}: DeployEventProps) => {
  const dispatch = useAppDispatch();
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [deployingEvent, setDeployingEvent] = useState(false);
  const [txMessage, setTxMessage] = useState<string>();
  const [txHash, setTxHash] = useState<string>();
  const [currentAddress, setCurrentAddress] = useState<string>();

  const currentWallet = useAppSelector(
    (state) => state.wallets.connectedWallets,
  );
  const DeploymentProcessData = useAppSelector(
    (state) => state.processes.DeploymentProcess,
  );
  const currentEvent = useAppSelector((state) => state.event.current);
  const passDetails = useAppSelector((state) => state.pass);
  const passCategoryDetails = useAppSelector((state) => state.passCategory);

  useEffect(() => {
    let WalletAddress: string;

    if (currentWallet) {
      WalletAddress = currentWallet[0].currentAccount;
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

      console.log(transactionStatus.status);
      if (
        transactionStatus.status == 4 &&
        transactionStatus.errorMessage == ''
      ) {
        console.log(transactionStatus);
        dispatch(setDeploymentProcess('SetupAccount'));
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

    const tempCurrentEventId = currentEvent?.event.id;

    try {
      const transaction = await setupAccount(tempCurrentEventId);
      const transactionHash: string = transaction.transactionId;
      setTxHash(transactionHash);
      setTxMessage('Account Set-up Successfull');

      const transactionStatus = await fcl.tx(transaction).onceSealed();

      console.log(transactionStatus.status);
      if (
        transactionStatus.status == 4 &&
        transactionStatus.errorMessage == ''
      ) {
        console.log(transactionStatus);

        dispatch(setDeploymentProcess('SetupAccount'));
      }
    } catch (error) {
      console.log('Set-up Account Error: ', error);

      toast.error('Account Set-up Process failed! try again');
    } finally {
      setLoadingAccount(false);
    }
  };

  const deployEventHandler = async () => {
    setDeployingEvent(true);
    const { event: tempEvent } = currentEvent || {};
    const { pass: tempPass } = passDetails;
    const { passCategories } = passCategoryDetails;

    if (tempEvent && tempPass && currentAddress) {
      try {
        const { metadata } = getDeployArgs(tempEvent, tempPass, currentAddress);
        const { eventID, eventName, passName, passType, dropType } = metadata;

        let transaction;

        if (passCategories.length > 1) {
          const CategoryNames: string[] = [];
          const Prices: string[] = [];
          const MaxLimits: string[] = [];

          passCategories.forEach(({ title, numberOfTokens, price }) => {
            CategoryNames.push(title);
            Prices.push(price.toFixed(2));
            MaxLimits.push(numberOfTokens.toString());
          });

          transaction = await deployEventAndCategories(
            eventID,
            eventName,
            passName,
            passType,
            dropType,
            CategoryNames,
            Prices,
            MaxLimits,
            metadata,
          );
        } else {
          const {
            title: categoryName,
            numberOfTokens: maxLimit,
            price,
          } = passCategories[0];

          transaction = await deployEventAndCategory(
            eventID,
            eventName,
            passName,
            passType,
            dropType,
            categoryName,
            price.toFixed(2),
            maxLimit,
            metadata,
          );
        }

        const transactionHash = transaction.transactionId;
        setTxHash(transactionHash);

        const transactionStatus = await fcl.tx(transaction).onceSealed();

        console.log(transactionStatus.status);
        if (
          transactionStatus.status == 4 &&
          transactionStatus.errorMessage == ''
        ) {
          console.log(transactionStatus);
          setLoadingAccount(false);
          dispatch(setDeploymentProcess('SetupAccount'));
        }

        if (transactionStatus.status == 4) {
          const { Files, id } = tempEvent;
          let profileFile;
          let coverFile;

          if (Files?.length) {
            Files.forEach((file) => {
              const { type, url, size, mimeType, extension } = file;
              if (type === 'Profile') {
                profileFile = { url, size, mimeType, extension };
              }
              if (type === 'Cover') {
                coverFile = { url, size, mimeType, extension };
              }
            });
          }

          const updatedEventData: UpdateEvent = {
            title: tempEvent.title,
            description: tempEvent.description,
            startDate: tempEvent.startDate,
            endDate: tempEvent.endDate,
            published: true,
            profile: profileFile,
            cover: coverFile,
          };

          updateEvent(id, updatedEventData)
            .then((response) => {
              const { message, data } = response;

              if (message === 'success') {
                toast.success(`Deployed Successfull`, {
                  position: 'bottom-right',
                  autoClose: false,
                  closeOnClick: true,
                  draggable: true,
                });

                setDeployingEvent(false);
                dispatch(setDeploymentProcess('Deploy'));
              } else throw new Error(response);
            })
            .catch((error) => {
              console.log('updateEvent Error', error.message);
              toast.error('after deployment, event updation error');
            });
        }
      } catch (error) {
        console.log(`Deploy Event Error: `, error);
        toast.error('Failed Event Deployment process! try again');
      }
    }
  };

  return (
    <CustomModal
      open={isModalOpen}
      handleCloseModal={() => handleCloseModal(txHash ?? '')}
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

      <p className="mt-2 text-lg text-center text-bold font-Roboto md:text-xl">
        {modalTitle}
      </p>

      <p className="flex px-6 py-2 mt-3 text-xs font-medium bg-blue-100 rounded-full gap-x-2 sm:mx-4">
        <span className="text-sm text-blue-800 capitalize whitespace-nowrap">
          Note :
        </span>
        <span className="text-sm text-gray-600">
          While deploying Event, Keep in mind that you will not be able to edit
          your Event details after this step.
        </span>
      </p>

      <div className="w-full px-6 text-xs text-white border-b-2 border-gray-400 shadow-md drop-shadow-xl">
        a
      </div>

      <div className="block w-full px-6 py-2 mb-2 overflow-y-auto sm:px-8 max-h-[17rem]">
        <DeployProcess />

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
          disabled={DeploymentProcessData[0].progress != 0}
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
          onClick={deployEventHandler}
          bgColor="bg-black hover:bg-gray-700"
          display="inline-flex justify-self-end"
          disabled={DeploymentProcessData[1].progress != 1}
          padding="px-3 py-2.5"
          textProperties="text-sm text-white leading-4"
          width="w-fit"
          loading={deployingEvent}
        >
          {modalTitle}
        </Button>
      </div>
    </CustomModal>
  );
};
