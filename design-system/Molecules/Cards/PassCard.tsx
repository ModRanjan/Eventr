import { Image } from '@/Atoms/Image';
import { Label } from '@/Atoms/Label';

type PassCardProps = {
  title: string;
  createdBy: string;
  imgURL: string;
  passType: string;
  contractAddress: string;
  contractType: string;
  onClick: () => void;
};

export const PassCard = ({
  title,
  createdBy,
  imgURL,
  passType,
  contractAddress,
  contractType,
  onClick,
}: PassCardProps) => {
  return (
    <div
      onClick={() => onClick()}
      className="px-2 py-5 space-y-3 sm:px-4 card group"
    >
      <div className="flex items-start space-x-3 overflow-hidden">
        <div className="inline-flex flex-col justify-between flex-1 h-full">
          <Label>
            <h3 className="font-bold text-gray-900 truncate text-md">
              {title}
            </h3>
            <p
              className="mt-0.5 text-sm text-gray-500 line-clamp-3 group-hover:text-gray-700"
              title="created by"
            >
              {'@' + createdBy}
            </p>
          </Label>

          <div className="flex items-center w-full justify-self-end gap-x-2 ">
            <h2 className="text-xs font-bold uppercase">Type:</h2>
            <span className="text-sm text-gray-500 whitespace-nowrap line-clamp-3 group-hover:text-gray-700">
              {passType}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0">
          {imgURL ? (
            <Image
              src={imgURL}
              alt={title}
              className="w-20 h-20 rounded-md shadow-lg group-hover:shadow-xl shadow-slate-200"
            />
          ) : (
            <span className="block w-20 h-20 rounded-md shadow-lg group-hover:shadow-xl shadow-slate-200" />
          )}
        </div>
      </div>

      <div className="flex items-center w-full gap-x-2">
        <h2 className="text-xs font-bold uppercase ">Contract Type:</h2>
        <span className="text-sm text-gray-500 group-hover:text-gray-700">
          {contractType}
        </span>
      </div>

      <div className="w-full overflow-hidden">
        <h2 className="text-xs font-bold uppercase ">Contract Address:</h2>
        <span className="mt-1 text-sm leading-3 text-gray-500 truncate whitespace-nowrap group-hover:text-gray-700 pr-0.5">
          {contractAddress}
        </span>
      </div>
    </div>
  );
};
