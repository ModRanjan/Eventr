import { Label } from '@/Atoms/Label';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// import { Card } from '@/Atoms/card';
import { Image } from '@/Atoms/Image';
import { Input } from '@/Atoms/Input';
import { useEffect, useRef } from 'react';
import { Icon } from '@/Atoms/Icon';
import PassCard from '@/Molecules/PassCard';
import { Button } from '@/Atoms/Button';
import { PageTitle } from '@/utils/GeneralFunctions';
import { CreateEvent } from './CreateEvent';

const Events = () => {
  const eventName = useRef();
  const eventDescription = useRef();
  const startDate = useRef();
  const endDate = useRef();

  useEffect(() => {
    if (document) {
      PageTitle('Create Events');
    }
  }, []);

  return (
    <section className="flex justify-between px-4 py-5 sm:py-8 sm:px-0">
      <div className="relative flex items-center w-full px-4 py-4 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm md:w-2/3 sm:px-6 sm:py-5 hover:shadow-lg">
        <CreateEvent />
      </div>

      <div className="flex-col hidden w-2/5 px-4 pt-6 md:flex sm:px-6 lg:px-8">
        <div className="mt-16">
          <Image
            src="images/event.jpg"
            alt="nft-even-img"
            className="z-0 max-w-md my-auto skew-y-12 rounded-lg shadow-2xl rotate-12 h-fit w-fit aspect-square dark:shadow-primary-400"
          />
        </div>
      </div>
    </section>
  );
};

export default Events;
