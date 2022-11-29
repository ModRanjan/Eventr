import { AiOutlineLeft } from 'react-icons/ai';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';

import PageLayout from '@/Organisms/Layout/PageLayout';
import { Button } from '@/Atoms/Button';
import { useRouter } from 'next/router';

const Eventdetails = () => {
  const router = useRouter();
  return (
    <div className="top-0 z-50 bg-white">
      <PageLayout>
        <div className="py-5 sm:py-8">
          <Label className="flex items-center justify-between max-w-6xl mx-auto ">
            <div className="inline-flex items-center flex-none">
              <Button
                onClick={() => router.push('/Home')}
                customClasses="border-0 font-black"
              >
                <Icon className="w-4 h-6 -ml-1" icon={AiOutlineLeft} />
                <span className="text-sm">Go back</span>
              </Button>
            </div>
          </Label>

          <div className="flex justify-between px-4 py-5 sm:py-8 sm:px-0">
            hello
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Eventdetails;
