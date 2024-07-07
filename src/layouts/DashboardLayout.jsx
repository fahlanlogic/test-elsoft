import { IoBagAdd } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function DashboardLayout() {
  const paramItems = new URLSearchParams({
    TypeName: "Product",
    Type: "Product",
    Company: "d3170153-6b16-4397-bf89-96533ee149ee",
    CompanyName: "testcase",
  });
  const paramStock = new URLSearchParams({
    Company: "d3170153-6b16-4397-bf89-96533ee149ee",
    CompanyName: "testcase",
    DateFrom: "2024-07-01",
    DateTo: "2024-07-31",
    Status: "all",
    page: "1",
  });

  return (
    <main className="text-neutral-700 p-2 w-full flex-1 pt-6">
      <h1 className="text-3xl font-bold mb-8 mt-2">Dashboard Shortcut</h1>
      <div className="border border-b border-neutral-200 w-[98%] mb-8"></div>
      <div className="flex gap-4">
        <Link
          to={`/list/item?${paramItems.toString()}`}
          className="flex items-center gap-4 bg-white rounded-md p-4 shadow-md hover:shadow-none duration-300">
          <IoBagAdd className="text-5xl bg-blue-900 text-white rounded-md p-2" />
          <div>
            <h1 className="font-bold">Master Item</h1>
            <p className="text-sm">Semua item kamu ada disini!</p>
          </div>
        </Link>
        <Link
          to={`/list/stock?${paramStock.toString()}`}
          className="flex items-center gap-4 bg-white rounded-md p-4 shadow-md hover:shadow-none duration-300">
          <LuBoxes className="text-5xl bg-blue-900 text-white rounded-md p-2" />
          <div>
            <h1 className="font-bold">Transaction Stock</h1>
            <p className="text-sm">Semua transaksi kamu ada disini!</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
