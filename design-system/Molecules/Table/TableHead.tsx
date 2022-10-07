

const TableHead = ({ columns }:any) => {
  return (
    <thead className="bg-indigo-100 ">
      <tr>
        {columns.map(({ heading }:any) => (
          <th
            key={heading}
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
