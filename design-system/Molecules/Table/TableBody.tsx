import React from 'react';

type PropsType={
  columns:any;
  rows:any;
  onClickRow?:(data:any)=>void;
}

export const TableBody = ({ rows, columns, onClickRow }:PropsType) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200 ">
      {rows.map((data:any, index:number) => {
        const handleOnClickRow = () => {
          onClickRow && onClickRow(data);
        };
        return (
          <tr
            onClick={handleOnClickRow}
            className="hover:bg-gray-100 "
            key={index}
          >
            {columns.map((columnItem:any, index:number) => {
              return (
                <td
                  key={index}
                  className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap "
                >
                  {data[`${columnItem.value}`]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
