import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { Icon } from '@/Atoms/Icon';

import {
  ProcessTitle,
  EventProgress,
  CreateEventProcessType,
} from '@/config/CreateEventProcess';

type CreateEventProcessProps = {
  progress: string;
};

export const CreateEventProcess = ({ progress }: CreateEventProcessProps) => {
  const [render, setRender] = useState(false);
  const [currentData, setCurrentData] = useState(EventProgress);

  useEffect(() => {
    setCurrentData(EventProgress);
  }, [EventProgress]);

  useEffect(() => {
    setRender(false);
    EventProgress.map((item) => {
      switch (progress) {
        case 'pass-created': {
          console.log('pass-created progress: ', progress);
          if (item.title === ProcessTitle.Pass) {
            item.progress = 2;
          }
          if (item.title === ProcessTitle.PassCategories) item.progress = 1;
          setRender(true);
          break;
        }
        case 'setup-pass-categories': {
          console.log('setup-pass-categories progress: ', progress);
          if (item.title === ProcessTitle.Pass) item.progress = 2;
          if (item.title === ProcessTitle.PassCategories) item.progress = 2;
          if (item.title === ProcessTitle.Deploy) item.progress = 1;
          setRender(true);
          break;
        }
        case 'deployed': {
          console.log('deployed progress: ', progress);
          if (item.title === ProcessTitle.Pass) item.progress = 2;
          if (item.title === ProcessTitle.PassCategories) item.progress = 2;
          if (item.title === ProcessTitle.Deploy) item.progress = 2;
          setRender(true);
          break;
        }
        default: {
          if (item.title === ProcessTitle.Pass) item.progress = 1;
          if (item.title === ProcessTitle.PassCategories) item.progress = 0;
          if (item.title === ProcessTitle.Deploy) item.progress = 0;
          setRender(true);
        }
      }

      const sate = {
        ...item,
      };

      item = sate;
    });
  }, [progress]);

  const getPipeClass = (item: CreateEventProcessType) =>
    [
      'w-0.5 h-full',
      'absolute top-4 left-4',
      '-ml-px mt-0.5',
      item.progress === 2 ? 'bg-black' : 'bg-gray-300',
    ].join(' ');

  const getCircleClass = (item: CreateEventProcessType) =>
    [
      'relative',
      'flex items-center justify-center',
      'w-8 h-8',
      'border-2',
      'rounded-full',
      'border-gray-300 group-hover:border-gray-400',
      item.progress === 2
        ? 'bg-black group-hover:bg-gray-800'
        : 'bg-white border-2',
    ].join(' ');

  const getIconBlinkClass = (item: CreateEventProcessType) =>
    [
      'text-white',
      'rounded-full',
      item.progress === 1 && 'bg-black animate-ping h-1.5 w-1.5',
      item.progress === 2 && 'w-5 h-5',
    ].join(' ');

  const getBodyClass = (item: CreateEventProcessType) =>
    [
      'flex flex-col',
      'font-Roboto',
      'min-w-0',
      'ml-4',
      'hover:text-gray-700',
      (item.progress === 0 || item.progress === 3) && 'text-gray-500',
      (item.progress === 1 || item.progress === 2) && 'text-black',
    ].join(' ');

  return (
    <div className="pr-8">
      <nav className="max-w-md">
        <h3 className="mb-6 text-2xl font-black">Next steps</h3>

        <ol className="overflow-hidden">
          {render &&
            currentData.map((item) => {
              return (
                <li key={item.title} className="relative pb-10">
                  {!item.lastStep && <div className={getPipeClass(item)} />}

                  <div className="relative flex items-start group">
                    <span className="flex items-center h-9">
                      <span className={getCircleClass(item)}>
                        {item.progress === 0 ? (
                          <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                        ) : (
                          <Icon
                            className={getIconBlinkClass(item)}
                            icon={FaCheck}
                          />
                        )}
                      </span>
                    </span>

                    <span className={getBodyClass(item)}>
                      <span className="text-xs font-semibold tracking-wide uppercase">
                        {item.title}
                      </span>
                      <span className="text-sm">{item.description}</span>
                    </span>
                  </div>
                </li>
              );
            })}
        </ol>
      </nav>
    </div>
  );
};
