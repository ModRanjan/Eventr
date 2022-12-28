import React, { useState } from 'react';
import menuItems from '@/config/menuItems';

type MenuBarType = {
  onClick: (value: string) => void;
};

export const MenuBar = ({ onClick }: MenuBarType) => {
  const [active, setActive] = useState(0);

  const makeActive = (value: string, index: number) => {
    onClick(value);
    setActive(index);
  };

  return (
    <div className="space-y-1">
      {menuItems.map((data, index) => {
        return (
          <li
            key={data.name + index}
            onClick={() => makeActive(data.name, index)}
            className={`flex items-center px-3 py-2 text-sm font-semibold font-Roboto text-gray-900 border-l-4 border-transparent hover:bg-gray-50 hover:text-gray-900 cursor-pointer ${
              index === active &&
              'text-[#6495ED] border-blue-500 bg-blue-50 hover:bg-blue-50 hover:text-blue-500 group'
            }`}
          >
            {data.name}
          </li>
        );
      })}
    </div>
  );
};
