export const TableHead = ({ columns }: any) => {
  return (
    <thead className="bg-indigo-100 ">
      <tr>
        {columns.map(({ heading }: any) => (
          <th
            key={heading}
            scope="col"
            className="px-4 py-2 text-sm font-semibold leading-4 uppercase font-Roboto whitespace-nowrap"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};
