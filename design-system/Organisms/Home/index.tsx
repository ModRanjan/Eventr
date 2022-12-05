import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';

import { AllEvents } from '@/Organisms/AllEvents';

import { PageTitle } from '@/utils/GeneralFunctions';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (document) {
      PageTitle('All Events');
    }
  }, []);

  return (
    <section className="py-5 sm:py-10">
      <div className="flex items-center justify-between ">
        <Label className="text-2xl font-bold text-gray-900 sm:text-3xl">
          My Events
        </Label>
        <div className="justify-self-end">
          <Button
            bgColor="bg-black hover:bg-gray-700"
            padding="px-3 py-2.5"
            textProperties="whitespace-nowrap text-white text-sm leading-4"
            onClick={() => router.push('/Events')}
          >
            Create New Event
          </Button>
        </div>
      </div>

      <div className="px-4 py-5 sm:py-8 sm:px-0">
        <AllEvents />
      </div>
    </section>
  );
};

export default Home;
