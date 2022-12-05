import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Image } from '../Image';
import { Label } from '../Label';

type NormalCardProps = {
  profileUrl: string;
  name?: string;
  title?: string;
  owner?: string;
  description?: string;
  onClick?: () => void;
};

export const Card = ({
  profileUrl,
  name,
  owner,
  description,
  title,
  onClick,
}: NormalCardProps) => {
  const [cardDescription, setCardDescription] = useState<string | undefined>();
  useEffect(() => {
    let tempDesc;

    if (description !== undefined) {
      description.length > 80
        ? (tempDesc = description.slice(0, 80) + '...')
        : (tempDesc = description);
    }

    setCardDescription(tempDesc);
  }, [description]);

  return (
    <div className="relative flex flex-col justify-between px-6 py-5 space-y-4 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer h-52 hover:shadow-lg">
      <div className="flex items-start h-full space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={profileUrl}
            alt={name}
            className="rounded-md shadow-lg h-14 w-14"
          />
        </div>

        <div>
          <Label className="font-bold text-gray-900 truncate text-md">
            {title}
          </Label>

          {owner && (
            <h4 className="text-xs font-medium text-gray-700 truncate">
              {owner}
            </h4>
          )}

          <p className="mt-2 text-sm text-gray-500 line-clamp-3">
            {description && cardDescription}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <div className="flex-grow"></div>
        <Button
          bgColor="bg-black hover:bg-gray-700"
          display="self-end"
          textProperties="text-base font-medium text-white sm:text-sm"
          padding="px-4 py-2"
          width="sm:w-auto"
          onClick={onClick}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
