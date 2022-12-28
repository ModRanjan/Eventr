import React from 'react';
import { HiArrowUp } from 'react-icons/hi';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { useAppSelector } from '@/redux/hooks';

const LinkedAddress = () => {
  const connectedWallets = useAppSelector(
    (state) => state.wallets.connectedWallets,
  );

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <Label className="flex flex-col sm:flex-row">
        <div className="sm:flex-auto">
          <h3 className="text-xl font-semibold text-gray-900">
            Linked Addresses
          </h3>
          <p className="mt-2 text-sm text-gray-700">
            Addresses are used to gather information about your tokens and
            collectors.
          </p>
        </div>

        <div className="inline-flex self-center sm:ml-16 sm:flex-none">
          <Button
            bgColor="bg-black hover:bg-gray-700"
            padding="px-3 py-2"
            textProperties="whitespace-nowrap text-white text-sm"
          >
            Add Address
          </Button>
        </div>
      </Label>

      <div className="px-0 mt-5">
        <Label className="flex space-x-8">
          <h2 className="px-1 py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-500 whitespace-nowrap w-fit">
            Added
          </h2>
        </Label>

        <div className="flex flex-col gap-2">
          {connectedWallets.map((item) => {
            return (
              <div className="flex items-center gap-2 py-2 border-t border-gray-300 sm:py-3 sm:px-0">
                <div className="w-10 h-10 border rounded-full border-zinc-900 bg-gradient-to-r from-sky-500 to-indigo-500" />
                <p
                  onClick={() =>
                    console.log('currentAccount: ', item.currentAccount)
                  }
                  className="inline-flex items-center flex-1 text-lg font-bold tracking-wide cursor-pointer text-primary-500 hover:text-primary-900 group"
                  title="wallet-address"
                >
                  {item.currentAccount}
                  <Icon
                    className="inline-block h-4 text-base text-blue-500 rotate-45 opacity-0 group-hover:opacity-80"
                    icon={HiArrowUp}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkedAddress;
