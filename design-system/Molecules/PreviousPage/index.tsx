import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';

import { Icon } from '@/Atoms/Icon';
import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';

type PreviousPageType = {
  onClick: () => void;
};

export const PreviousPage = ({ onClick }: PreviousPageType) => {
  return (
    <Label className="flex items-center justify-between -mt-5">
      <div className="inline-flex items-center flex-none">
        <Button
          onClick={onClick}
          customClasses="inline-block border-0 font-black inline-flex items-center gap-x-1 h-12"
        >
          <Icon className="w-4 h-8 -ml-1" icon={AiOutlineLeft} />
          <span className="text-sm">Go back</span>
        </Button>
      </div>
    </Label>
  );
};
