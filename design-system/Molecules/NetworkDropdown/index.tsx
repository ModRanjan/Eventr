import { DropdownListItem } from '@/Atoms/DropdownListItem';
import { IChainData } from '@/config/chainList';

type PropsType = {
  dropdownItems: IChainData[];
  onClickDropdownItem: (data: IChainData | any) => void;
};

export const NetworksDropdown = ({
  dropdownItems,
  onClickDropdownItem,
}: PropsType) => {
  return (
    <div className="absolute z-20 flex items-center justify-center w-full pt-4 bg-white rounded-lg sm:w-60">
      <ul className="flex flex-col w-full grow">
        <li className="pb-2 pl-6 text-gray-500">Select a network</li>
        {dropdownItems.map((data, index) => {
          return (
            <li key={index}>
              <DropdownListItem
                imgSrc={data.logoUrl}
                name={data.name}
                onClickDropdownItem={() => onClickDropdownItem(data)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
