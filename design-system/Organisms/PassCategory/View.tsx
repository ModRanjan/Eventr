import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import AllPassCategory, {
  PassCategoryTableColumns,
  PassCategoryTableRows,
} from '@/Molecules/AllPassCategory';

import { PassCategory } from '@/redux/passCategory/type';
import { getPassCategories } from '@/services/PassCategory';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPassCategories } from '@/redux/passCategory/passCategorySlice';

const columns: PassCategoryTableColumns[] = [
  { heading: 'SNo.', value: 'sNo' },
  { heading: 'Title', value: 'title' },
  { heading: 'Number of tokens', value: 'numberOfTokens' },
  { heading: 'Price', value: 'price' },
  { heading: 'Edit', value: 'edit' },
];

type PassCategoryProps = {
  createPassCategory: () => void;
  editPassCategory: () => void;
};

const PassCategories = ({
  createPassCategory,
  editPassCategory,
}: PassCategoryProps) => {
  const dispatch = useAppDispatch();
  const [currentPassId, setCurrentPassId] = useState<number>();
  const [allCategories, setAllCategories] = useState<PassCategoryTableRows[]>(
    [],
  );
  const passDetails = useAppSelector((state) => state.pass);
  const passCategories = useAppSelector(
    (state) => state.passCategory.passCategories,
  );

  useEffect(() => {
    const tempCurrentPassId = passDetails?.pass?.id;

    if (tempCurrentPassId) setCurrentPassId(tempCurrentPassId);
  }, [passDetails]);

  useEffect(() => {
    const getPassCategory = async (passId: number) => {
      try {
        const { message, data } = await getPassCategories(passId);

        if (message === 'success') {
          const tempPassCategories: PassCategory[] = data.map(
            ({ id, title, slug, tokenId, numberOfTokens, price }: any) => ({
              id,
              title,
              slug,
              tokenId,
              numberOfTokens,
              price,
            }),
          );

          const passCategoryData: PassCategoryTableRows[] = [];

          tempPassCategories.forEach(
            (
              { id, title, slug, tokenId, numberOfTokens, price }: PassCategory,
              index: number,
            ) => {
              passCategoryData.push({
                sNo: index + 1,
                id,
                title,
                slug,
                tokenId,
                numberOfTokens,
                price,
                edit: (
                  <Button
                    onClick={editPassCategory}
                    bgColor="bg-white"
                    padding="px-4 py-1"
                    width="w-fit"
                  >
                    edit
                  </Button>
                ),
              });
            },
          );

          setAllCategories(passCategoryData);
          dispatch(setPassCategories(tempPassCategories));
        }
      } catch (error: any) {
        console.log('getPassCategories Error', error.message);
      }
    };

    if (currentPassId) getPassCategory(currentPassId);
  }, [currentPassId]);

  const CreatePassCategory = () => {
    const contractType = passDetails.pass?.contractType;
    const hasPassCategory = passCategories.length > 0;

    if (!passDetails.pass) {
      toast.warning(`You have no Pass, You need to create Pass first`);
      return;
    }

    if (contractType === 'ERC721') {
      if (!hasPassCategory) {
        createPassCategory();
      } else {
        toast.warning(
          `hey, you can't create multiple tokens in 'contractType: ERC721'`,
        );
      }
    } else {
      createPassCategory();
    }
  };

  return (
    <>
      <Label className="flex items-center justify-between">
        <h3 className="section-title">Pass Tokens</h3>

        <Button
          onClick={CreatePassCategory}
          type="button"
          bgColor="bg-black hover:bg-gray-700"
          padding="px-4 py-2"
          textProperties="text-sm text-white"
          width="w-fit"
        >
          Create Pass Token
        </Button>
      </Label>

      <div className="flex flex-col px-2 sm:px-0 ">
        <AllPassCategory
          createPassCategory={CreatePassCategory}
          columns={columns}
          allPassCategories={allCategories}
        />
      </div>
    </>
  );
};

export default PassCategories;
/**
  useEffect(() => {
    const getPassCategory = async () => {
      let tempPassCategories: PassCategory[] = [];

      if (currentPassId)
        getPassCategories(currentPassId).then((response) => {
          const { message, data } = response;

          data.map((item: any) => {
            const tempPassCategory: PassCategory = {
              id: item.id,
              title: item.title,
              slug: item.slug,
              tokenId: item.tokenId,
              numberOfTokens: item.numberOfTokens,
              price: item.price,
            };

            tempPassCategories.push(tempPassCategory);
          });

          const passCategoryData: PassCategoryTableRows[] = [];

          tempPassCategories.map((item: PassCategory, index: number) => {
            const tempPassCategory: PassCategoryTableRows = {
              sNo: index + 1,
              id: item.id,
              title: item.title,
              slug: item.slug,
              tokenId: item.tokenId,
              numberOfTokens: item.numberOfTokens,
              price: item.price,
              edit: (
                <Button
                  onClick={editPassCategory}
                  bgColor="bg-white"
                  padding="px-4 py-1"
                  width="w-fit"
                >
                  edit
                </Button>
              ),
            };

            passCategoryData.push(tempPassCategory);
          });

          setAllCategories(passCategoryData);
          dispatch(setPassCategories(tempPassCategories));
        });
    };

    getPassCategory();
  }, [currentPassId]); */
