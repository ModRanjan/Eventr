import { useEffect, useState } from 'react';
import * as fcl from '@onflow/fcl';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';
import { BsCheckLg, BsFillLightningChargeFill } from 'react-icons/bs';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';
import { CustomModal } from '@/Atoms/Modal/CustomModal';
import { Logo } from '@/Molecules/Logo';
import { getNFT } from '@/flow/scripts/getNFTs';
import { Mint } from '@/flow/transactions/For721';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateEvent } from '@/services/event';
import { UpdateEvent } from 'types/createEvent.type';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type DeployContractProps = {
  handleCloseModal: (txHash: string) => void;
  isModalOpen: boolean;
  modalTitle: string;
};

export const DeployContract = ({
  handleCloseModal,
  isModalOpen,
  modalTitle,
}: DeployContractProps) => {
  const [txStatus, setTxStatus] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  const currentEvent = useAppSelector((state) => state.event.current);
  const passDetails = useAppSelector((state) => state.pass);
  const passCategoryDetails = useAppSelector((state) => state.passCategory);

  const hendelGetNFTs = async () => {
    getNFT()
      .then((NFTs) => {
        console.log('NFTs: ', NFTs);
      })
      .catch((error) => console.log('GetNFTs Error: ', error.message));
  };

  const deployContract = async () => {
    const temppassCategories = passCategoryDetails.passCategories[0];
    const tempCurrentEventFiles = currentEvent?.event.Files;

    var name = `${passDetails.pass?.title} ${temppassCategories.title}`;
    var price = temppassCategories.price;
    var url: string = '';
    if (tempCurrentEventFiles) {
      tempCurrentEventFiles.map((item) => {
        if (item.type === 'Cover') url = item.url;
      });
    }
    var address = '0x4888621a47426aa0';

    Mint(name, url, price, address)
      .then((transaction) => {
        console.log('NFTs: ', transaction);
        fcl.tx(transaction).subscribe((res: any) => {
          console.log('txStatus: ', res);
          setTxHash(transaction);
          if (res.status === 0 || res.status === 1) {
            setTxStatus('Pending...');
          } else if (res.status === 2) {
            setTxStatus('Finalized...');
          } else if (res.status === 3) {
            setTxStatus('Executed...');
          } else if (res.status === 4) {
            setTxStatus('Execution Success');
            toast.success(`Deployed Successfull ${txHash}`, {
              position: 'bottom-right',
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }

          const event = currentEvent?.event;
          if (event) {
            const eventId = event.id;
            const eventData: UpdateEvent = {
              title: event.title,
              startDate: event.startDate,
              endDate: event.endDate,
              published: true,
            };

            updateEvent(eventId, eventData)
              .then((response) => {
                const { message, data } = response;
                if (message === 'success') {
                  console.log('Published', data);
                }
              })
              .catch((error) => {
                console.log('updateEvent Error', error.message);
                toast.error(error.message);
              });
          }
        });
      })
      .catch((error) => {
        console.log(`NFT Creation Error: `, error);
        toast.error(error.message);
      });
  };

  return (
    <CustomModal
      open={isModalOpen}
      handleCloseModal={() => handleCloseModal(txHash)}
      label={modalTitle}
      width="sm:max-w-md w-full max-w-sm lg:max-w-xl"
      height="h-fit"
    >
      <div className="flex items-center justify-center h-12 mx-auto rounded-full w-max">
        <Logo className="block w-auto h-10 sm:h-12" />
      </div>

      <p className="mt-2 text-lg text-center text-bold font-Roboto md:text-xl">
        {modalTitle}
      </p>

      <div className="block w-full px-6 py-4 space-y-4 sm:px-4">
        <p className="px-8 py-1.5 rounded-full text-xs font-medium bg-blue-100 space-x-2">
          <span className="text-sm text-blue-800 capitalize ">Note :</span>
          <span className="text-sm text-gray-600">
            While deploying Event, Keep in mind that you will not be able to
            edit your Event details after this step.
          </span>
        </p>

        <div className="">
          <Label className="flex items-center mb-2 text-xl font-semibold">
            <Icon icon={BsFillLightningChargeFill} />
            <h3 className="pl-5">Transaction</h3>
          </Label>

          {txHash ? (
            <>
              <CopyToClipboard text={txHash}>
                <div
                  className="flex items-center max-w-full mb-4 mr-4 overflow-auto align-top"
                  title={txHash}
                  onClick={() =>
                    toast.success('Copied Successfull', { autoClose: 50 })
                  }
                >
                  <p className="px-2 font-mono text-sm leading-none bg-gray-100 lg:text-lg whitespace-nowrap">
                    {txHash.substring(0, 40) + '...'}
                  </p>
                  <Icon className="cursor-pointer" title="copy" icon={FiCopy} />
                </div>
              </CopyToClipboard>

              <div className="relative flex items-center text-lg font-semibold text-green-500 true">
                <Icon className="text-lg font-blac" icon={BsCheckLg} />
                <p className="pl-5">{txStatus}</p>
              </div>
            </>
          ) : (
            <div className="flex items-center max-w-full mb-4 mr-4 overflow-auto align-top">
              <p className="px-10 font-mono text-sm leading-none bg-gray-100 lg:text-lg whitespace-nowrap">
                .....
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex float-right ml-auto gap-x-4">
        <Button
          onClick={() => handleCloseModal(txHash)}
          type="button"
          padding="px-4 py-2"
          textProperties="text-sm text-gray-500 hover:text-gray-900"
          width="w-fit"
        >
          Close
        </Button>

        <Button
          type="button"
          onClick={deployContract}
          bgColor="bg-black hover:bg-gray-700"
          display="inline-flex justify-self-end"
          padding="px-3 py-2.5 ml-auto mr-4"
          textProperties="text-sm text-white leading-4"
          width="w-fit"
        >
          {modalTitle}
        </Button>
      </div>
    </CustomModal>
  );
};
/**
 * <div className="block w-full px-6 py-2 mb-3 overflow-y-auto sm:px-8 max-h-64">
  {eventDetails && (
    <div className="flex flex-col justify-center w-full space-y-5">
       <div className="flex flex-col flex-1">
              <span className="text-xs font-medium uppercase">Event Name</span>

              <span className="text-base text-gray-500">
                {eventDetails.title}
              </span>
            </div>

            <div className="flex flex-col flex-1">
              <span
                className="text-xs font-medium uppercase"
                title={eventDetails.description}
              >
                Description
              </span>

              <span className="text-base text-gray-500">
                {eventDetails.description &&
                eventDetails.description?.length > 100
                  ? eventDetails.description?.slice(0, 100) + '... '
                  : eventDetails.description}
              </span>
            </div>

            <div className="flex justify-between gap-x-3">
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium uppercase">
                  start date:
                </span>

                <span className="text-base text-gray-500">{startDate}</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium uppercase">end Date:</span>

                <span className="text-base text-gray-500">{endDate}</span>
              </div>
            </div>

            <div className="flex justify-between gap-x-3">
              {eventDetails.cover && (
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-medium uppercase">cover:</span>

                  <span className="text-base text-gray-500">
                    <Image
                      src={eventDetails.cover?.url}
                      alt={'eventCoverIMG'}
                      className="w-full rounded-md h-52"
                    />
                  </span>
                </div>
              )}
              {eventDetails.profile && (
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-medium uppercase">
                    profile:
                  </span>

                  <span className="text-base text-gray-500">
                    <Image
                      src={eventDetails.profile?.url}
                      alt={'eventProfileIMG'}
                      className="w-full rounded-md h-52"
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
    )}
    </div>
 */
