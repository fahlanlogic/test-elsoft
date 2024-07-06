/* eslint-disable react/prop-types */
export default function TableItem({ items }) {
  return (
    <div className="rounded-md overflow-hidden">
      <table className="table-auto w-full border-spacing-0.5">
        <thead className="bg-blue-900 text-white text-sm">
          <tr>
            <th className="border-l border border-white py-1.5">Action</th>
            <th className="border-l border border-white py-1.5">Title</th>
            <th className="border-l border border-white py-1.5">Company</th>
            <th className="border-l border border-white py-1.5">Code</th>
            <th className="border-l border border-white py-1.5">Item Group</th>
            <th className="border-l border border-white py-1.5">Is Active</th>
            <th className="border-l border border-white py-1.5">Balance</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr
              key={item.Oid}
              className="text-sm odd:bg-neutral-100 font-semibold">
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1">{item.Label}</td>
              <td className="px-2 py-1">{item.CompanyName}</td>
              <td className="px-2 py-1">{item.Code}</td>
              <td className="px-2 py-1">{item.ItemGroupName}</td>
              <td className="px-2 py-1 text-center ">{item.IsActive}</td>
              <td className="px-2 py-1">{item.BalanceAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
