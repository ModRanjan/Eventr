import Link from 'next/link';

import { Logo } from '@/Molecules/Logo';

const MENUS = ['About', 'Privacy Policy', ' Licensing', 'Contact'];

const Footer = () => {
  return (
    <footer className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-between py-4 sm:py-6 sm:flex-row gap-y-4">
        <div className="flex items-center text-center gap-x-2">
          <Logo
            url="/"
            logoSrc="/eventr.png"
            className="block h-12 -ml-2 cursor-pointer w-14 sm:m-0"
          />
          <h2 className="self-center text-4xl font-semibold text-white font-OpenSans ">
            Eventr
          </h2>
        </div>

        <ul className="flex flex-wrap items-center gap-x-4">
          {MENUS.map((name, index) => (
            <li className="hover:border-b border-[#31d7a9]" key={index}>
              <Link href="#">
                <a className="inline-block py-2 text-sm text-white sm:text-base font-OpenSans">
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="block py-6 text-base text-center text-white border-t border-gray-500 font-OpenSans">
        © 2022
        <Link
          href="/"
          target="_blank"
          className="ml-2 hover:underline underline-offset-2 "
        >
          {` Eventr™`}
        </Link>
        . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
