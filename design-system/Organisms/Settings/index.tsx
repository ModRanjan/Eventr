import { useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';

import { Label } from '@/Atoms/Label';
import { MenuBar } from '@/Molecules/MenuBar';
import { AllEvents } from '@/Molecules/AllEvents';

import Profile from './Profile';
import PassCards from './PassCards';
import LinkedAddress from './LinkedAddress';
import { FormProfileValues } from './Profile/type';

import { IUser } from '@/redux/user/types';
import { File } from '@/redux/event/types';
import { useAppSelector } from '@/redux/hooks';

import { getUser, updateUser } from '@/services/user';

type fileUrls = {
  profileURL: string;
  coverURL: string;
};

const Settings = () => {
  const [currentSection, setCurrentSection] = useState('Profile');
  const [prevUserDatail, setPrevUserDetail] = useState<IUser>();
  const [prevUserFiles, setPrevUserFiles] = useState<fileUrls>();
  const [initialValue, setInitialValue] = useState<FormProfileValues>();
  const allEvents = useAppSelector((state) => state.event.events);

  const getCurrentSection = (value: string) => {
    setCurrentSection(value);
  };

  const getUserDetails = async () => {
    let fileUrls: fileUrls = {
      profileURL: '',
      coverURL: '',
    };

    getUser()
      .then((response) => {
        const userDatails = response.data.userDetail;

        userDatails.Files.map((item: File) => {
          if (item?.type === 'Profile') {
            fileUrls.profileURL = item.url;
          } else {
            fileUrls.coverURL = item.url;
          }
        });

        setPrevUserFiles(fileUrls);
        setPrevUserDetail(userDatails);
      })
      .catch((error) => console.error('Get User Details Error', error.message));
  };

  useEffect(() => {
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

    updateUser(UserData)
      .then((response) => {
        console.log('Response: ', response.data);

        alert(JSON.stringify(response.data, null, 2));
        setSubmitting(false);
      })
      .catch((error) => console.log('Update User Error', error.message));
  };

  return (
    <>
      <Label>
        <h3 className="section-title">Settings</h3>
      </Label>

      <div className="py-5 pb-6 mx-auto sm:py-6 sm:px-0 lg:pb-16 ">
        <div className="overflow-hidden bg-white border border-gray-300 rounded-lg shadow-md">
          <div className="divide-y divide-gray-300 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-4 lg:col-span-3 min-h-[75%]">
              <MenuBar onClick={getCurrentSection} />
            </aside>

            <div className="divide-y divide-gray-400 lg:col-span-9">
              {currentSection == 'Profile' && initialValue !== undefined && (
                <Profile
                  formSubmitHandler={formSubmitHandler}
                  formInitialValues={initialValue}
                />
              )}

              {currentSection == 'Linked Addresses' && <LinkedAddress />}

              {currentSection == 'All Events' && (
                <div className="px-4 py-5 space-y-4 sm:py-6 sm:px-0">
                  <Label className="sm:px-6 lg:px-8">
                    <h3 className="section-title">Your Events</h3>
                  </Label>

                  <div className="max-w-4xl mx-auto overflow-hidden bg-white sm:px-6 lg:px-8">
                    <AllEvents
                      className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2"
                      events={allEvents}
                    />
                  </div>
                </div>
              )}

              {currentSection == 'Your Passes' && <PassCards />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

/** FOR DARK MODE
 * import { FiMoon, FiSun } from 'react-icons/fi';
 * import { Icon } from '@/Atoms/Icon';
 * 
 * const { systemTheme, theme, setTheme } = useTheme();
 * const [mounted, setMounted] = useState(false);
 * 
 * useEffect(() => {
    setMounted(true);
   }, []);

 * const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <div
          role="button"
          className="flex items-center"
          onClick={() => setTheme('light')}
        >
          <Icon className="w-7 h-7" icon={FiSun} />
        </div>
      );
    } else {
      return (
        <div
          role="button"
          className="flex items-center"
          onClick={() => setTheme('dark')}
        >
          <Icon className="w-7 h-7" icon={FiMoon} />
        </div>
      );
    }
  };



  <div className="my-auto ml-auto justify-self-end">
    {renderThemeChanger()}
  </div>
 */
