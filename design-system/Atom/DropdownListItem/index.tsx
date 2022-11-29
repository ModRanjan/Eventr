import { Image } from '../Image';
import { IChainData } from '../../../redux/reducer/data.type';

type PropsType = {
  onClickDropdownItem: (data: IChainData | any) => void;
  imgSrc: string;
  name: string;
};
export const DropdownListItem = ({
  onClickDropdownItem,
  imgSrc,
  name,
}: PropsType) => {
  const className = [
    'cursor-pointer',
    'flex items-center',
    'font-medium',
    'hover:bg-gray-300',
    'px-4 py-2 pr-4',
    'text-gray-700',
    'text-xs',
  ].join(' ');

  return (
    <div onClick={onClickDropdownItem} className={className}>
      {imgSrc && <Image src={imgSrc} className="w-5 h-5 mr-2" />}

      {name}
    </div>
  );
};
