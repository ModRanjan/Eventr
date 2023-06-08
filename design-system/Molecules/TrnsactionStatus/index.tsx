import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconType } from 'react-icons';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { BiCheck, BiCopy, BiErrorCircle } from 'react-icons/bi';
import * as fcl from '@onflow/fcl';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

const enum transactionStatus {
  'UNKNOWN' = 'Unknown',
  'PENDING' = 'Transaction Pending', // - Awaiting Finalization
  'FINALIZED' = 'Transaction Finalized', // - Awaiting Execution
  'EXECUTED' = 'Transaction Executed', // - Awaiting Sealing
  'FAILED' = 'Transaction Execution Failed',
  'SEALED' = 'Transaction Sealed', // - Transaction Complete. At this point the transaction result has been committed to the blockchain.
  'EXPIRED' = 'Transaction Expired',
}

type transactionTypes = {
  txHash?: string;
  txMessage?: string;
  callback?(): void;
};

export const TransactionStatus = ({
  txHash,
  txMessage,
  callback,
}: transactionTypes) => {
  const [txStatus, setTxStatus] = useState(transactionStatus['UNKNOWN']);
  const [error, setError] = useState<any>();

  const handleTransactionResponse = useCallback(
    async (transaction: string, message?: string) => {
      try {
        fcl
          .tx(transaction)
          .subscribe((res: { status: number; errorMessage?: string }) => {
            if (res && res.status)
              if (res.status === 0 || res.status === 1) {
                setTxStatus(transactionStatus['PENDING']);
              } else if (res.status === 2) {
                setTxStatus(transactionStatus['FINALIZED']);
              } else if (res.status === 3) {
                if (res.errorMessage) {
                  setTxStatus(transactionStatus['FAILED']);
                  setError(res.errorMessage);
                  throw new Error(res.errorMessage);
                } else {
                  setTxStatus(transactionStatus['EXECUTED']);
                }
              } else if (res.status === 4 && res.errorMessage == '') {
                setTxStatus(transactionStatus['SEALED']);

                if (callback) callback();

                if (message)
                  toast.success(message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    draggable: true,
                  });
              }
          });
      } catch (error) {
        console.error(error);
        //   setLoadingAccount(false);
        toast.error('Somethig went wrong :( , try again');
      }
    },
    [txHash],
  );

  useEffect(() => {
    if (txHash) handleTransactionResponse(txHash, txMessage);
  }, [txHash]);

  return (
    <div className={`w-full`}>
      <Label className="flex items-center mb-2 text-xl font-semibold">
        <Icon className="w-9" icon={BsFillLightningChargeFill} />
        <h3 className="ml-4">Transaction</h3>

        <Button
          type="button"
          padding="px-0"
          display="ml-auto justify-self-end"
          width="w-fit"
          disabled={txHash ? false : true}
        >
          <a
            className={`inline-block h-full px-4 py-1.5 ${
              txHash ? '' : 'disabled cursor-not-allowed'
            }`}
            href={`https://testnet.flowscan.org/transaction/${txHash}`}
            target="blank"
          >
            view
          </a>
        </Button>
      </Label>

      <CopyToClipboard text={txHash ?? ''}>
        <div
          className="flex items-center max-w-full mt-4 mb-2 overflow-auto"
          title={txHash}
          onClick={() => toast.success('Copied Successfull', { autoClose: 50 })}
        >
          <p className="w-full px-2 font-mono text-base leading-none truncate bg-gray-100 tex-gray-700 lg:text-lg whitespace-nowrap">
            {txHash}
          </p>

          <Icon className="w-8 h-6 cursor-pointer" title="copy" icon={BiCopy} />
        </div>
      </CopyToClipboard>

      <div
        className={`flex items-center text-lg font-semibold ${
          txStatus === transactionStatus['FAILED']
            ? 'text-red-500'
            : 'text-green-500'
        } ${txStatus != transactionStatus['UNKNOWN'] ? 'visible' : 'hidden'}`}
      >
        <Icon
          className="h-9 w-9"
          icon={
            txStatus == transactionStatus['FAILED'] ? BiErrorCircle : BiCheck
          }
        />
        <p className="ml-4 ">
          <span className="block">{txStatus}</span>
          {/* <span className={`${error ? 'mb-4' : 'hidden'}`}>{error}</span> */}
        </p>
      </div>
    </div>
  );
};
