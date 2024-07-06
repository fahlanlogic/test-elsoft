import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import TableItem from "../components/TableItem";
import ModalAddItem from "../components/ModalAddItem";
import { Toaster } from "react-hot-toast";

export default function ItemLayout() {
  const [items, setItems] = useState([]);
  const [cookies] = useCookies(["authToken"]);

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
      <Toaster
        position="top-right"
        reverseOrder={false}
        // containerStyle={{ marginTop: "65px" }}
      />
      <div className="flex items-center mb-8 mt-2 gap-12">
        <h1 className="text-3xl font-bold ">List Item</h1>
        {items && items.length > 0 && <ModalAddItem items={items} />}
      </div>
      <div className="border border-b border-neutral-200 w-[98%] mb-8"></div>
      <div className="bg-white w-full min-h-[80vh] rounded-md p-4">
        <TableItem items={items} />
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
