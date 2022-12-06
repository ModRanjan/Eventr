import React, { useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';

import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';
import { MenuBar } from '@/Molecules/MenuBar';
import { Profile } from '../Profile';
import { FormProfileValues } from '../Profile/type';

import axios from '@/utils/Axios';
import { PageTitle } from '@/utils/GeneralFunctions';
import { IUser } from '@/redux/user/types';
import { Passes } from '../Passes';
import { AllEvents } from '../AllEvents';
import { file } from '@/redux/event/types';

type fileUrls = {
  profileURL: string;
  coverURL: string;
};

const Settings = () => {
  const [address, setAddress] = useState();
  const [currentPage, setCurrentPage] = useState('Profile');
  const [prevUserDatail, setPrevUserDetail] = useState<IUser>();
  const [prevUserFiles, setPrevUserFiles] = useState<fileUrls>();
  const [initialValue, setInitialValue] = useState<FormProfileValues>();

  const getCurrentPage = (value: string) => {
    setCurrentPage(value);
  };

  const getUserDetails = async () => {
    let fileUrls: fileUrls = {
      profileURL: '',
      coverURL: '',
    };

    await axios
      .get('/user')
      .then((response) => {
        const userDatails = response.data.data.userDetail;

        userDatails.Files.map((item: file) => {
          if (item?.type === 'Profile') {
            fileUrls.profileURL = item.url;
          } else {
            fileUrls.coverURL = item.url;
          }
        });

        setPrevUserFiles(fileUrls);
        setPrevUserDetail(userDatails);
      })
      .catch((error) => console.log('Get User Details Error', error.message));
  };

  useEffect(() => {
    if (document) {
      PageTitle('Settings');
    }

    getUserDetails();
  }, []);

  useEffect(() => {
    if (prevUserDatail !== undefined) {
      const initialValue = {
        name: prevUserDatail?.name || '',
        userName: prevUserDatail?.userName,
        email: prevUserDatail?.email,
        profileURL: prevUserFiles?.profileURL,
        coverURL: prevUserFiles?.coverURL,
      };

      setInitialValue(initialValue);
    }
  }, [prevUserDatail]);

  const formSubmitHandler = async (
    values: FormProfileValues,
    { setSubmitting }: FormikHelpers<FormProfileValues>,
  ) => {
    const UserData = {
      name: values.name,
      userName: values.userName,
      email: values.email,
      profile: {
        url: values.profileURL,
        size: 150,
        mimeType: 'image',
        extension: '.png',
      },
      cover: {
        url: values.coverURL,
        size: 150,
        mimeType: 'image',
        extension: '.png',
      },
    };

    axios
      .put('/user', UserData)
      .then((response) => {
        console.log('Response: ', response.data);
        alert(JSON.stringify(response.data.data, null, 2));
        setSubmitting(false);
      })
      .catch((error) => console.log('Update User Error', error.message));
  };

  return (
    <>
      <Label>
        <h1 className="py-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          Settings
        </h1>
      </Label>

      <div className="pb-6 mx-auto lg:pb-16">
        <div className="overflow-hidden bg-white border rounded-lg shadow">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3 min-h-[75%]">
              <MenuBar onClick={getCurrentPage} />
            </aside>

            <div className="divide-y divide-gray-200 lg:col-span-9">
              {currentPage == 'Profile' && initialValue !== undefined && (
                <Profile
                  formSubmitHandler={formSubmitHandler}
                  formInitialValues={initialValue}
                />
              )}

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
    </>
  );
};

export default Settings;
