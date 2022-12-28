import { Label } from '@/Atoms/Label';
import { Logo } from '@/Molecules/Logo';

import { ConnectWallet } from '@/Organisms/UserAccount/ConnectWallet';

const Hero = () => {
  return (
    <div className="flex flex-col items-center max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
      <Logo className="w-auto h-16 p-5 sm:h-20 lg:h-32" logoSrc="/eventr.png" />

      <Label className="mt-6 text-2xl font-bold tracking-normal text-white sm:text-5xl lg:text-7xl">
        <h3>Your contract.Your rules.</h3>
      </Label>

      <Label>
        <h3 className="mt-4 tracking-wide text-center text-white text-md sm:text-lg">
          Feel free to organize your events
        </h3>
      </Label>

      <div className="py-3 space-y-5">
        <ConnectWallet
          bgColor="bg-black hover:bg-gray-900 border-2"
          textProperties="leading-4 text-white"
          padding="px-6 py-3 mt-10"
        />
      </div>
    </div>
  );
};

export default Hero;
