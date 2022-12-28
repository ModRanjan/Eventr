import { MenuItem } from '@/Atoms/MenuItem';
import { INavItemsData } from '@/config/navItems';

type NavigationProps = {
  comingSoon?: boolean;
  customClasses?: string;
  isActive?: (pathName: string) => boolean;
  navItems: INavItemsData;
  textProperties?: string;
};

export const Navigation = ({
  comingSoon,
  customClasses,
  isActive,
  navItems,
  textProperties,
}: NavigationProps) => {
  return (
    <ul className="flex space-x-8">
      {navItems.map((navItem, index) => {
        let active = false;
        if (isActive) {
          active = isActive(navItem.url);
        }

        return (
          <MenuItem
            textProperties={textProperties}
            customClasses={customClasses}
            icon={navItem.icon}
            name={navItem.name}
            url={navItem.url}
            key={index}
            active={active}
          />
        );
      })}
    </ul>
  );
};
