import React, { useState } from 'react';
import Link from 'next/link';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import { Button } from '@/Atoms/Button';
import { Logo } from '@/Molecules/Logo';
import { MenuItem } from '@/Atoms/MenuItem';
import { Icon, MenuIcon } from '@/Atoms/Icon';

import { INavItemsData } from '@/config/navItems';

type NavigationProps = {
  isActive?: (pathName: string) => boolean;
  navigation: INavItemsData[];
} & React.HTMLAttributes<HTMLDivElement>;

export const Navigation = ({
  className,
  isActive,
  navigation,
}: NavigationProps) => {
  const [heading, setHeading] = useState('');
  console.log(navigation);
  return (
    <nav className={`inline-block ${className}`}>
      {navigation.map((navItem, index) => {
        let active = false;

        if (navItem.link && isActive) {
          active = isActive(navItem.link);
        }
        console.log(navItem.link);
        return (
          <div
            key={navItem.name + index}
            className="text-left cursor-pointer group"
          >
            <Button
              link={navItem.link}
              customClasses={`flex items-center justify-between py-4 group w-full gap-x-1 uppercase    hover:text-gray-400 ${
                active && 'border-b'
              }`}
              onClick={() => {
                heading !== navItem.name
                  ? setHeading(navItem.name)
                  : setHeading('');
              }}
            >
              {navItem.name}
              {navItem.dropdown && (
                <span
                  className={`hidden text-2xl md:block group-hover:rotate-180 ${
                    navItem.dropdown && 'opacity-100'
                  }`}
                >
                  <Icon icon={BiChevronDown} />
                </span>
              )}
            </Button>

            {navItem.dropdown && (
              <div
                className={`absolute hidden w-full max-w-xs sm:min-w-min top-8 group-hover:md:block hover:md:block h-fit`}
              >
                <div className="p-3">
                  <span className="absolute w-6 h-6 mt-1 rotate-45 bg-white left-3 min-w-sm"></span>
                </div>

                <div className="w-full px-4 py-6 space-y-4 bg-white sm:py-8 sm:px-6 lg:px-8">
                  {navItem.sublinks.map((subLinks, index) => (
                    <li
                      key={index}
                      className="text-xl text-gray-900/90 list-none hover:text-[#31d7a9] font-medium font-sans hover:translate-x-2 transition duration-300 ease-in"
                    >
                      <Link href={subLinks.link}>{subLinks.name}</Link>
                    </li>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export const MobileNavigation = ({ navigation }: NavigationProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const [heading, setHeading] = useState('');

  return (
    <>
      <MenuIcon
        className="absolute -inset-5 z-[100]  text-white"
        isMenueOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={`fixed inset-0 z-50 block pr-6 overflow-y-auto bg-slate-900/50 backdrop-blur ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative w-full max-w-xs min-h-screen px-4 pt-6 bg-[#0A1E5E]">
          <div className="static inset-0">
            <Logo
              url="/"
              logoSrc="/eventr.png"
              className="block w-auto h-12 cursor-pointer sm:h-12"
            />
          </div>

          <div className="flex flex-col w-full h-full mt-6 overflow-y-auto gap-y-4 group">
            {navigation.map((item, index) => (
              <React.Fragment key={index}>
                <Button
                  link={item.link ?? ''}
                  customClasses="text-left cursor-pointer flex items-center justify-between text-xl font-semibold text-white py-2.5 uppercase font-Roboto group w-full"
                  onClick={() => {
                    heading !== item.name
                      ? setHeading(item.name)
                      : setHeading('');
                  }}
                >
                  {item.name}

                  <span className="inline text-2xl text-white md:hidden">
                    <Icon
                      icon={heading === item.name ? BiChevronUp : BiChevronDown}
                      className={
                        item.dropdown ? 'opacity-100' : 'opacity-0 hidden'
                      }
                    />
                  </span>
                </Button>

                <div
                  className={`${
                    heading === item.name
                      ? 'flex flex-col px-6 -mt-4 gap-y-4'
                      : 'hidden'
                  }`}
                >
                  {item.sublinks.map((sublink, index) => (
                    <span
                      key={index}
                      className="inline-block text-base text-white hover:text-gray-400"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={sublink.link}>{sublink.name}</Link>
                    </span>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const MenuNavigation = ({
  className,
  navigation,
  isActive,
}: NavigationProps) => {
  return (
    <div className={className}>
      {navigation.map((navItem, index) => {
        let active = false;
        if (isActive && navItem.link) {
          active = isActive(navItem.link);
        }

        return (
          <span className="inline-block h-full list-none" key={index}>
            <MenuItem
              leftIcon={navItem.leftIcon}
              rightIcon={navItem.rightIcon}
              name={navItem.name}
              url={navItem.link ?? ''}
              key={index}
              active={active}
            />
          </span>
        );
      })}
    </div>
  );
};
