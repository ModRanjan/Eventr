import { IconType } from 'react-icons/lib';
import { Icon } from '@/Atoms/Icon';
import { Image } from '@/Atoms/Image';

export type Data = {
  name: string;
  stat: string;
  icon?: IconType;
  imgSrc?: string;
};

type StatsPropsData = {
  StatsData: Data[];
};

export const Stats = ({ StatsData }: StatsPropsData) => {
  return (
    <div>
      <dl className="grid grid-cols-1 px-6 gap-x-8 gap-y-4 sm:grid-cols-3">
        {StatsData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-center gap-x-6 p-6 sm:px-8 sm:py-10 bg-[#08378E] shadow text-slate-100"
          >
            <div className="inline-block">
              {item.icon && (
                <Icon icon={item.icon} className="block w-16 h-16" />
              )}

              {item.imgSrc && (
                <Image src={item.imgSrc} className="block w-16 h-16" />
              )}
            </div>

            <div className="relative flex-1 text-left sm:space-y-1">
              <p className="text-5xl font-semibold tracking-tight">
                {item.stat}
              </p>
              <p className="text-xl font-normal text-teal-500 truncate">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};
