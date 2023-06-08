import { Table } from '@/Molecules/Table';
import { columnsType } from '../Table/TableHead';
import { CategoryDataType } from '../../Organisms/Deployed/EventDetails';

const columns: columnsType[] = [
  { heading: 'name', value: 'categoryName' },
  { heading: 'price (in FLOW)', value: 'price' },
  { heading: 'max-Limit', value: 'maxEditions' },
  { heading: 'token Left', value: 'tokenLeft' },
  { heading: 'buy', value: 'buy' },
];

type EventTokens = {
  data: CategoryDataType[];
  puchaseHandler: (value: CategoryDataType) => void;
};

export const EventTokens = ({ data, puchaseHandler }: EventTokens) => {
  return (
    <Table
      columns={columns}
      rows={data}
      onClickRow={(value: CategoryDataType) => puchaseHandler(value)}
      itemsPerPage={10}
    />
  );
};

<div className="w-full min-w-full overflow-hidden sm:w-auto ">
  <div className="flex w-auto gap-8 pb-12 overflow-x-scroll">
    {/* {nftsData.map((item, index) => {
          return (
            index < 9 && (
              <TokenCard
                key={item.name + index}
                id={index.toString()}
                imgURL={item.imgSrc}
                title={item.name}
                price={'20'}
                onClick={(id: string) => console.log('object', id)}
              />
            )
          );
        })} */}
  </div>
</div>;
