export type columnsType = {
  heading: string;
  value: string;
};

type TableHeadProps = {
  columns: columnsType[];
};

export const TableHead = ({ columns }: TableHeadProps) => {
  return (
    <thead className="bg-indigo-100">
      <tr>
        {columns.map((item: columnsType) => (
          <th
            key={item.heading}
            scope="col"
            className="sticky top-0 h-10 px-4 py-2 text-sm font-semibold leading-4 uppercase bg-indigo-100 font-Roboto whitespace-nowrap"
          >
            {item.heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};
