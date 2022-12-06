import PageLayout from '@/Organisms/Layout/PageLayout';

import { default as SettingsPage } from '@/Organisms/Settings';

const Settings = () => {
  return (
    <div className="top-0 z-50 bg-white">
      <PageLayout>
        <SettingsPage />
      </PageLayout>
    </div>
  );
};

export default Settings;
