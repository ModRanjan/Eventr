import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { PassForm } from '@/Molecules/Forms/PassForm';
import {
  FormPassOptions,
  FormPassValues,
} from '@/Molecules/Forms/PassForm/type';

import { useAppSelector } from '@/redux/hooks';
import { createPass } from '@/services/Pass';
import { CreatePass } from 'types/pass.type';
import { ROUTES } from '@/config/routes';
import { PassModal } from '@/Molecules/Modals/PassModal';

const options: FormPassOptions = {
  dropType: ['mint', 'premint', 'claim'],
  contractType: ['ERC721', 'ERC1155'],
};

const initialValue: FormPassValues = {
  title: '',
  dropType: 'mint',
  contractType: 'ERC721',
  contractAddress: '',
};

type createPassesProps = {
  prevPage: () => void;
};

const CreatePasses = ({ prevPage }: createPassesProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [eventId, setEventId] = useState<number>();
  const [passData, setPassData] = useState<CreatePass>();
  const [currentEventSlug, setCurrentEventSlug] = useState<string>();
  const currentEvent = useAppSelector((state) => state.event.current);

  useEffect(() => {
    const slug = router.query.eventSlug;

    if (slug != undefined && typeof slug === 'string') {
      setCurrentEventSlug(slug);
    }
  }, [router.query]);

  const passDashboardHandler = () => {
    if (currentEventSlug)
      router.push(ROUTES.passCategory.view(currentEventSlug));
  };

  useEffect(() => {
    const eventDetail = currentEvent?.event;

    if (eventDetail) {
      const tempEventId = eventDetail.id;
      setEventId(tempEventId);
    }
  }, [currentEvent]);

  const formSubmitHandler = async (
    values: FormPassValues,
    { setSubmitting }: FormikHelpers<FormPassValues>,
  ) => {
    if (eventId) {
      const tempPassData: CreatePass = {
        title: values.title,
        dropType: values.dropType,
        contractType: values.contractType,
        contractAddress: values.contractAddress,
        eventId: eventId,
      };

      setPassData(tempPassData);
      setShowModal(true);
      setSubmitting(false);
    }
  };

  const createPassHandler = async () => {
    if (passData)
      createPass(passData)
        .then((response) => {
          const { message, data } = response;

          if (message === 'success') {
            const updatedPass = data.pass;
            setShowModal(false);
            toast.success('Pass Created');
            prevPage();
          }
        })
        .catch((error) => console.log('createPass Error', error.message));
  };

  return (
    <div className="flex justify-between px-2 py-5 sm:py-8 sm:px-0">
      <div className="form-container">
        <PassForm
          formInitialValues={initialValue}
          formSubmitHandler={formSubmitHandler}
          options={options}
          formTitle="Create Pass:"
          buttonTitle="Create"
        />

        {showModal && passData && (
          <PassModal
            modalTitle="Create Pass"
            isModalOpen={showModal}
            passData={passData}
            handleCloseModal={() => setShowModal(false)}
            updatePass={createPassHandler}
          />
        )}
      </div>

      <div className="flex-col hidden w-2/5 px-4 pt-3 md:flex sm:px-6 lg:px-8">
        <div>
          <Button
            onClick={passDashboardHandler}
            bgColor="bg-black hover:bg-gray-700 border-transparent"
            padding="px-4 py-2"
            textProperties="text-white text-sm leading-4 text-gray-200"
            width="w-auto"
          >
            Passes
          </Button>
          <p className="w-4/5 mt-2 text-sm font-medium font-Roboto">
            Read more about Passes
            <span className="pl-0.5 text-blue-500 cursor-pointer hover:underline">
              here
            </span>
            . You can later create Passes.
          </p>
        </div>

        <div className="mt-12">
          <div className="max-w-md font-Roboto">
            <Label className="text-2xl font-black">Your Pass name</Label>
            <p className="mt-1 text-sm">
              The Pass name is the main identifier for your contract and will
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
        </div>
      </div>
    </div>
  );
};

export default CreatePasses;
