import { FaCheck } from 'react-icons/fa';

import { Icon } from '@/Atoms/Icon';

import { EventProgress } from '@/config/CreateEventProcess';

export const CreateEventProcess = () => {
  const PipeClass = [
    'w-0.5 h-full',
    'absolute top-4 left-4',
    '-ml-px  mt-0.5',
  ].join(' ');

  const CircleClass = [
    'relative',
    'flex items-center justify-center',
    'w-8 h-8',
    'border-2',
    'rounded-full',
    ,
    'border-gray-300 group-hover:border-gray-400',
  ].join(' ');

  const IconBlinkClass = [
    'h-1.5 w-1.5',
    'bg-black',
    'rounded-full',
    'animate-ping',
  ].join(' ');

  const TitleClass = [
    'text-xs',
    'font-semibold',
    'tracking-wide',
    'uppercase',
  ].join(' ');

  const DescClass = ['text-sm'].join(' ');

  return (
    <div className="pr-8">
      <div className="max-w-md">
        <nav>
          <h3 className="mb-6 text-2xl font-black">Next steps</h3>

          <ol className="overflow-hidden">
            {EventProgress.map((item) => {
              return (
                <li key={item.title} className="relative pb-10">
                  {!item.lastStep && (
                    <div
                      className={`${PipeClass} ${
                        item.progress === 'Complete'
                          ? 'bg-black'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                  <div className="relative flex items-start group">
                    <span className="flex items-center h-9">
                      <span
                        className={`${CircleClass} ${
                          item.progress === 'Complete'
                            ? 'bg-black group-hover:bg-gray-800'
                            : 'bg-white border-2'
                        }`}
                      >
                        {item.progress === 'NotReached' ? (
                          <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                        ) : (
                          <Icon
                            className={`${
                              item.progress === 'Complete' &&
                              'w-5 h-5 text-white'
                            } ${item.progress === 'Blink' && IconBlinkClass} 
                          }`}
                            icon={FaCheck}
                          />
                        )}
                      </span>
                    </span>
                    <span
                      className={`flex font-Roboto flex-col min-w-0 ml-4 ${
                        item.progress !== 'NotReached'
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}
                    >
                      <span className={`${TitleClass} `}>{item.title}</span>
                      <span className={`${DescClass}`}>{item.description}</span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
