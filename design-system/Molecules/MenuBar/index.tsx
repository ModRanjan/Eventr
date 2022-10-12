import React from 'react';
import { useRouter } from 'next/router';
import { MenuItem } from '../../Atom/MenuItem';
import menuItems from '../../../config/menuItems';
export const MenuBar = () => {
  const router = useRouter();
  return (
    <div className="container px-5 mx-auto mt-5 duration-500 ">
      <ul className="flex flex-col justify-center text-gray-600 md:flex-row gap-x-10 gap-y-2">
        {menuItems.map((data, index) => {
          const active = router.pathname == data.url;
          return (
            <MenuItem
              icon={data.icon}
              active={active}
              name={data.name}
              url={data.url}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
};
