import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import TableStocks from "../components/TableStock";
import ModalAddStock from "../components/ModalAddStock";

export default function StockLayout() {
  const [stocks, setStocks] = useState([]);
  const [cookies] = useCookies(["authToken"]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch(
          "https://app.api.elsoft.id/admin/api/v1/stockissue/list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.authToken}`,
            },
          }
        );

        const data = await res.json();
        setStocks(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStocks();
  }, [cookies.authToken]);

  return (
    <main className="text-neutral-700 p-2 w-full flex-1 pt-6">
      <Toaster
        position="top-right"
        reverseOrder={false}
        // containerStyle={{ marginTop: "65px" }}
      />
      <div className="flex items-center mb-8 mt-2 gap-12">
        <h1 className="text-3xl font-bold ">List Stock</h1>
        {stocks && stocks.length > 0 && <ModalAddStock stocks={stocks} />}
      </div>
      <div className="border border-b border-neutral-200 w-[98%] mb-8"></div>
      <div className="bg-white w-full min-h-[80vh] rounded-md p-4">
        <TableStocks stocks={stocks} />
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
