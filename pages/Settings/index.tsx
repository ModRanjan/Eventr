import { useEffect, useRef, useState } from 'react';

import { Label } from '@/Atoms/Label';
import { MenuBar } from '@/Molecules/MenuBar';

import PageLayout from '@/Organisms/Layout/PageLayout';
import { PageTitle } from '@/utils/GeneralFunctions';
import { Button } from '@/Atoms/Button';
import { AllEvents } from '@/Organisms/AllEvents';
import Passes from '@/Organisms/Passes';
import Profile from '@/Organisms/Profile';

const Settings = () => {
  const [address, setAddress] = useState();
  const [currentPage, setCurrentPage] = useState('Profile');

  useEffect(() => {
    if (document) {
      PageTitle('Settings');
    }
  }, []);

  const getCurrentPage = (value: string) => {
    setCurrentPage(value);
  };

  return (
    <div className="top-0 z-50 bg-white">
      <PageLayout>
        <Label>
          <h1 className="py-8 text-2xl font-bold text-gray-900 sm:text-3xl">
            Settings
          </h1>
        </Label>

        <div className="pb-6 mx-auto lg:pb-16">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <MenuBar onClick={getCurrentPage} />
              </aside>

              <div className="divide-y divide-gray-200 lg:col-span-9">
                {currentPage == 'Profile' && <Profile />}

                {currentPage == 'Linked Addresses' && (
                  <div className="px-2 border rounded-lg md:border-l md:px-6 md:col-span-3">
                    <Label className="my-3 text-3xl font-semibold">
                      Linked Addresses
                    </Label>

                    <Button
                      bgColor="bg-black dark:bg-primary-400 hover:bg-primary-300"
                      padding="px-3 py-2 ml-auto"
                      display="float-right"
                      textProperties="whitespace-nowrap text-white text-sm"
                      width="w-32"
                    >
                      Add Address
                    </Button>
                    <div className="flex items-center gap-2 cursor-pointer ">
                      <div className="w-12 h-12 border rounded-full border-zinc-900 bg-gradient-to-r from-sky-500 to-indigo-500" />
                      <p
                        className="inline-block px-2 text-xl text-primary-500 hover:text-primary-900"
                        title="wallet-address"
                      >
                        4888621a47426aa0
                      </p>
                    </div>
                  </div>
                )}

                {currentPage == 'All Events' && (
                  <div className="px-6">
                    <Label>
                      <h3 className="py-6 text-2xl font-bold text-gray-900 sm:text-3xl sm:py-8">
                        Your Events
                      </h3>
                    </Label>

                    <AllEvents />
                  </div>
                )}

                {currentPage == 'Your Passes' && <Passes />}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Settings;
