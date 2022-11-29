import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';

import Navigation from '@/Molecules/Navigation';
import { SubNavItems } from '@/config/navItems';
import { Icon } from '@/Atoms/Icon';

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  // const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // const renderThemeChanger = () => {
  //   if (!mounted) return null;
  //   const currentTheme = theme === 'system' ? systemTheme : theme;

  //   if (currentTheme === 'dark') {
  //     return (
  //       <div
  //         role="button"
  //         className="flex items-center"
  //         onClick={() => setTheme('light')}
  //       >
  //         <Icon className="w-7 h-7" icon={FiSun} />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div
  //         role="button"
  //         className="flex items-center"
  //         onClick={() => setTheme('dark')}
  //       >
  //         <Icon className="w-7 h-7" icon={FiMoon} />
  //       </div>
  //     );
  //   }
  // };

  const isActive = (pathName: String) => {
    return router.pathname == pathName;
  };

  return (
    <div className="max-w-6xl px-4 mx-auto bg-white sm:px-6 lg:px-8">
      {/* sticky top-0 z-100*/}
      <div className="flex justify-between h-12 bg-white sm:h-14">
        <Navigation
          textProperties="text-sm text-gray-500 hover:text-gray-700"
          navItems={SubNavItems}
          isActive={isActive}
        />

        {/* <div className="my-auto ml-auto justify-self-end">
          {renderThemeChanger()}
        </div> */}
      </div>

      {children}
    </div>
  );
};

export default PageLayout;
