import React from 'react';

type PropsType = {
  columns: any;
  rows: any;
  onClickRow?: (values: any) => void;
};

export const TableBody = ({ rows, columns, onClickRow }: PropsType) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200 cursor-pointer">
      {rows.map((data: any, index: number) => {
        const handleOnClickRow = () => {
          onClickRow && onClickRow(data);
        };
        return (
          <tr
            onClick={handleOnClickRow}
            className="transition-colors duration-200 hover:bg-gray-200"
            key={index}
          >
            {columns.map((columnItem: any, index: number) => {
              return (
                <td
                  key={index}
                  className="px-4 py-1 text-lg font-medium text-center text-gray-500 whitespace-nowrap font-Roboto"
                >
                  <span>{data[`${columnItem.value}`]}</span>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
