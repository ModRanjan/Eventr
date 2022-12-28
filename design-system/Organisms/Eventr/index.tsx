import { Label } from '@/Atoms/Label';

import Hero from '@/Molecules/Hero';
import Nfts from './Nfts';

const Eventr = () => {
  return (
    <>
      <div className="pt-8 pb-12 overflow-hidden bg-black sm:pt-12 sm:pb-16 lg:relative lg:pt-28 lg:pb-44">
        <Hero />
      </div>

      <section className="flex flex-col w-full h-96 py-10 bg-[#202020]">
        <div className="relative block min-h-fit bg-primary-900">
          <Label className="flex flex-col gap-2 py-20 text-center md:whitespace-nowrap text-primary-100 md:flex-row h-96 md:text-left md:mx-12">
            <h3 className="text-xl font-bold text-white sm:text-3xl lg:text-5xl">
              Organize any Events.
            </h3>

            <h4 className="text-md sm:text-2xl text-[#AEAEAE] pt-5">
              Through Eventr DApp.
            </h4>
          </Label>

          <div className="absolute w-full min-w-full overflow-hidden sm:w-auto top-52">
            <Nfts />
          </div>
        </div>
      </section>
    </>
  );
};

export default Eventr;
