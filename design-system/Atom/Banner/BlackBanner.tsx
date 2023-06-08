import { FC } from 'react';

interface BlackBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

const BlackBanner: FC<BlackBannerProps> = ({ children }) => {
  return (
    <div className="relative h-screen min-h-screen bg-black">
      <div className="absolute inset-0 w-full max-w-md min-h-screen mx-auto overflow-hidden sm:max-w-3xl lg:max-w-7xl">
        {children}
      </div>
    </div>
  );
};

export default BlackBanner;
