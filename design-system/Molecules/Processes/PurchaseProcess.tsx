import { FaCheck } from 'react-icons/fa';

import { Icon } from '@/Atoms/Icon';

import { useAppSelector } from '@/redux/hooks';
import { ProcessData } from '@/redux/processes/types';

export const PurchaseProcess = () => {
  const PurchaseProcess = useAppSelector(
    (state) => state.processes.PurchaseProcess,
  );

  const getPipeClass = (item: ProcessData) =>
    [
      'w-0.5 h-full',
      'absolute top-4 left-4',
      '-ml-px mt-0.5',
      item.progress === 2 ? 'bg-black' : 'bg-gray-300',
    ].join(' ');

  const getCircleClass = (item: ProcessData) =>
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

  const getIconBlinkClass = (item: ProcessData) =>
    [
      'text-white',
      'rounded-full',
      item.progress === 1 && 'bg-black animate-ping h-1.5 w-1.5',
      item.progress === 2 && 'w-5 h-5',
    ].join(' ');

  const getBodyClass = (item: ProcessData) =>
    [
      'flex flex-col',
      'font-Roboto',
      'min-w-0',
      'ml-4',
      'hover:text-gray-700',
      item.progress === 0 && 'text-gray-500',
      (item.progress === 1 || item.progress === 2) && 'text-black',
    ].join(' ');

  return (
    <div className="pr-8">
      <nav className="max-w-md">
        <h3 className="mb-4 text-2xl font-black">Steps</h3>

        <ol className="overflow-hidden">
          {PurchaseProcess.map((item) => {
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

/**type PurchaseProcessProps<T extends ProgressType> = {
  progress: T | null;
};

export const PurchaseProcess = <T extends ProgressType>({
  progress,
}: PurchaseProcessProps<T>) => {
  const [currentModalData, setCurrentModalData] =
    useState<ProcessData[]>(PurchaseProgress);
  const [currentProgress, setCurrentProgress] = useState<
    'SetupAccount' | 'Purchase' | null
  >(null);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  useEffect(() => {
    let tempArr: ProcessData[] = [];

    currentModalData.map((data) => {
      let item = data;
      if (currentProgress === 'SetupAccount') {
        if (item.title === 'Set-up Account') item.progress = 2;

        if (item.title === 'Purchase Token') item.progress = 1;
      } else if (currentProgress === 'Purchase') {
        if (item.title === 'Purchase Token') item.progress = 2;

        if (item.title === 'Set-up Account') item.progress = 2;
      }

      tempArr.push(item);
    });
    setCurrentModalData([...tempArr]);
  }, [currentProgress]);

  const getPipeClass = (item: ProcessData) =>
    [
      'w-0.5 h-full',
      'absolute top-4 left-4',
      '-ml-px mt-0.5',
      item.progress === 2 ? 'bg-black' : 'bg-gray-300',
    ].join(' ');

  const getCircleClass = (item: ProcessData) =>
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

  const getIconBlinkClass = (item: ProcessData) =>
    [
      'text-white',
      'rounded-full',
      item.progress === 1 && 'bg-black animate-ping h-1.5 w-1.5',
      item.progress === 2 && 'w-5 h-5',
    ].join(' ');

  const getBodyClass = (item: ProcessData) =>
    [
      'flex flex-col',
      'font-Roboto',
      'min-w-0',
      'ml-4',
      'hover:text-gray-700',
      item.progress === 0 && 'text-gray-500',
      (item.progress === 1 || item.progress === 2) && 'text-black',
    ].join(' ');

  return (
    <div className="pr-8">
      <nav className="max-w-md">
        <h3 className="mb-4 text-2xl font-black">Steps</h3>

        <ol className="overflow-hidden">
          {currentModalData &&
            currentModalData.map((item) => {
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
 */
