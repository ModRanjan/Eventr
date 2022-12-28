import { HiOutlinePlus } from 'react-icons/hi';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

type NoRecordProps = {
  buttonTitle: string;
  message: string;
  onClick?: (slug?: string) => void;
};

export const NoRecord = ({ buttonTitle, message, onClick }: NoRecordProps) => {
  return (
    <div className="min-h-screen mt-5">
      <div className="p-12 text-center border-2 border-gray-300 rounded-lg">
        <Label>
          <h3 className="mt-2 text-lg font-black text-gray-900">{message}</h3>
        </Label>

        <div className="mx-auto mt-6 w-fit">
          <Button
            onClick={onClick}
            type="button"
            bgColor="bg-black hover:bg-gray-700 border-transparent"
            padding="px-4 py-2"
            textProperties="text-sm leading-4 font-medium text-white"
          >
            <Icon className="w-5 h-5 mr-2 -ml-1" icon={HiOutlinePlus} />
            {buttonTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};
