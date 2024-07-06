import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function ItemComponent() {
  const [items, setItems] = useState([]);
  const [cookies] = useCookies(["authToken"]);
  console.log(items);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://app.api.elsoft.id/admin/api/v1/item/list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.authToken}`,
            },
          }
        );

        const data = await res.json();
        setItems(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, [cookies.authToken]);

  return (
    <main className="text-neutral-700 p-2 w-full flex-1 pt-6">
      <h1 className="text-3xl font-bold mb-8 mt-2">List Item</h1>
      <div className="border border-b border-neutral-200 w-[98%] mb-8"></div>
      <div className="bg-white w-full min-h-[80vh] rounded-md p-4">
        <table className="table-auto w-full border-spacing-0.5">
          <thead className="bg-blue-900 text-white text-sm">
            <tr>
              <th className="border-l border border-white">Action</th>
              <th className="border-l border border-white">Title</th>
              <th className="border-l border border-white">Company</th>
              <th className="border-l border border-white">Code</th>
              <th className="border-l border border-white">Item Group</th>
              <th className="border-l border border-white">Is Active</th>
              <th className="border-l border border-white">Balance</th>
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
    </main>
  );
}

{
  /* <input
            type="checkbox"
            className="w-5 h-5 accent-blue-900"
          />
          <select
            name="CompanyName"
            id="CompanyName"
            className="block w-full p-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option
              value="d3170153-6b16-4397-bf89-96533ee149ee"
              className="bg-white text-neutral-900 py-3 my-1">
              testcase
            </option>
            <option
              value="d3170153-6b16-4397-bf89-96533ee149ee"
              className="bg-white text-neutral-900 py-3 my-1">
              testcase
            </option>
          </select> */
}
