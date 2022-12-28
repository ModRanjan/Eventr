import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

type PropsType = {
  columns: any;
  rows: any;
  onClickRow?: (value: any) => void;

  itemsPerPage: number;
};

export const Table = ({
  columns,
  rows,
  onClickRow,
  itemsPerPage,
}: PropsType) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = rows.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rows.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % rows.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={`pt-4 pb-5 mb-8 bg-indigo-100 rounded-xl `}>
        <div className={`overflow-x-auto bg-white max-h-96 h-96`}>
          <table className="min-w-full table-auto">
            <TableHead columns={columns} />
            <TableBody
              rows={currentItems}
              columns={columns}
              onClickRow={onClickRow}
            />
          </table>
        </div>
      </div>

      <ReactPaginate
        className="flex items-center justify-center w-full"
        previousClassName="border border-gray-400 text-gray-600 hover:text-black px-4 py-1 mr-6"
        nextClassName="border border-gray-400 text-gray-600 hover:text-black px-4 py-1 ml-6"
        pageClassName="border border-gray-400 text-gray-600 hover:text-black rounded-md"
        pageLinkClassName="inline-block px-3 py-1 first:rounded-l-md last:rounded-r-md"
        activeLinkClassName="bg-blue-500 text-white "
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="previous"
        // renderOnZeroPageCount={null}
      />
    </>
  );
};
