import { useRef } from 'react';

import { Button } from '@/Atoms/Button';
import { Input } from '@/Atoms/Input';
import { Label } from '@/Atoms/Label';

const Profile = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const profileUrlRef = useRef();
  const coverUrlRef = useRef();
  return (
    <div className="py-5 sm:py-10">
      <header>
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <Label className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            Profile Settings
          </Label>
        </div>
      </header>

      <main>
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-5 sm:py-8 sm:px-0">
            <div className="max-w-4xl overflow-hidden bg-white border border-gray-300 rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form className="space-y-6">
                  <Input
                    type="text"
                    label="Event Name:"
                    placeholder="Eg. Jingle Bell Rockout"
                    customClasses="px-2 py-1 max-w-xs text-xl font-normal border rounded-lg outline-0"
                    inputRef={nameRef}
                    required={true}
                  />

                  <Input
                    type="text"
                    label="Email: (optional)"
                    placeholder="demo.xyz@abc.com"
                    customClasses="px-2 py-1 text-xl font-normal border rounded-lg outline-0 max-w-xs "
                    inputRef={emailRef}
                    required={true}
                  />

                  <Input
                    type="text"
                    label="Profile URL:"
                    placeholder="https://xyz.org/api/profile/2"
                    customClasses="px-2 py-1 text-xl font-normal border rounded-lg outline-0 max-w-xs "
                    inputRef={profileUrlRef}
                    required={true}
                  />

                  <Input
                    type="text"
                    label="Cover URL:"
                    placeholder="https://xyz.org/api/profile/cover/2"
                    customClasses="px-2 py-1 text-xl font-normal max-w-xs  border rounded-lg outline-0"
                    inputRef={coverUrlRef}
                    required={true}
                  />
                </form>

                <Button
                  bgColor="bg-black hover:bg-gray-700"
                  textProperties="text-white leading-4"
                  display="float-right"
                  customClasses="border-transparent w-32 my-6"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
