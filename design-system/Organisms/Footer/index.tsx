import Link from 'next/link';
import Logo from '../../Molecules/Logo';

const Footer = () => {
  const menus = ['About', 'Privacy Policy', ' Licensing', 'Contact'];
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div   className="flex items-center mb-4 sm:mb-0">
          <Logo url="/" className={'h-8 md:h-12 mx-3'} />
          <span className="self-center ml-2 text-xl font-semibold">Web3</span>
        </div>
        <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
          {menus.map((name, index) => (
            <li key={index}>
              <Link href="#">
                <a className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 ">
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-4" />
      <span className="block text-sm text-gray-500 sm:text-center ">
        © 2022
        <Link
          href="https://hodl.com"
          target="_blank"
          className="hover:underline"
        >
          Web3™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
