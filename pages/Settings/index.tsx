import { useEffect } from 'react';

import { Label } from '@/Atoms/Label';

import PageLayout from '@/Organisms/Layout/PageLayout';
import { PageTitle } from '@/utils/GeneralFunctions';

const Settings = () => {
  useEffect(() => {
    if (document) {
      PageTitle('Settings');
    }
  }, []);

  return (
    <div className="top-0 z-50 bg-white">
      <PageLayout>
        <Label>
          <h1 className="py-8 text-2xl font-bold text-gray-900 sm:text-3xl">
            Settings
          </h1>
        </Label>
      </PageLayout>
    </div>
  );
};

export default Settings;
