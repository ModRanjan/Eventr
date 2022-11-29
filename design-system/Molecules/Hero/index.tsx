import { Label } from '@/Atoms/Label';

import { ConnectWallet } from '@/Organisms/UserAccount/ConnectWallet';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 mx-auto text-center text-white bg-black sm:px-6 lg:px-8 ">
      {/* add logo */}

      <Label className="mt-6 text-2xl font-bold text-white sm:text-5xl lg:text-7xl">
        Your contract. Your rules.
      </Label>

      <Label className="mt-4 text-center text-white text-md sm:text-lg">
        Feel free to organize your events
      </Label>

      <div className="py-3 space-y-5">
        <ConnectWallet
          bgColor="bg-black hover:bg-gray-900"
          textProperties="leading-4 text-white"
          padding="px-6 py-3 mt-10"
        />
      </div>
    </div>
  );
};

export default Hero;
