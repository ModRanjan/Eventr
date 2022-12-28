import { Button } from '@/Atoms/Button';
import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { FaAsterisk } from 'react-icons/fa';

type FieldDetailsProps = {
  onClick?: () => void;
};
export const FieldDetails = ({ onClick }: FieldDetailsProps) => {
  return (
    <div className="space-y-10">
      {onClick && (
        <div>
          <Button
            onClick={onClick}
            bgColor="bg-black hover:bg-gray-700 border-transparent"
            padding="px-4 py-2"
            textProperties="text-white text-sm leading-4 text-gray-200"
            width="w-fit"
          >
            Create Passes
          </Button>

          <p className="w-4/5 mt-2 text-sm font-medium font-Roboto">
            Read more about Passes
            <span className="pl-0.5 text-link">here</span>. You can later create
            Passes.
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="max-w-md font-Roboto">
          <Label className="flex text-2xl font-black">
            <h3> Your event name</h3>
            <Icon className="inline-block h-2 text-red-500" icon={FaAsterisk} />
          </Label>
          <p className="mt-1 text-sm">
            The event name is the main identifier for your contract and will
            appear anywhere your contract is mentioned. This is usually your
            artist name, brand, or identity.
          </p>
          <p className="mt-4 text-sm">
            This field accepts alpha numeric characters and spaces and can be
            any length.
          </p>

          <p className="mt-4 text-sm">
            We recommend less than 15 characters, however this is not a hard
            requirement.
          </p>
        </div>

        <div className="max-w-md font-Roboto">
          <Label className="flex text-2xl font-black">
            <h3>Start&#47;End date</h3>
            <Icon className="inline-block h-2 text-red-500" icon={FaAsterisk} />
          </Label>

          <p className="mt-1 text-sm">
            Start Date is starting date of your Event
          </p>
          <p className="mt-1 text-sm">End Date is ending date of your Event</p>
        </div>

        <div className="max-w-md font-Roboto">
          <Label className="text-2xl font-black">Description</Label>
          <p className="mt-1 text-sm">
            A short description about your Event (less than 300 characters).
          </p>
        </div>
      </div>
    </div>
  );
};
