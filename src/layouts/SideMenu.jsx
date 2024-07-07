import { RiHomeSmile2Fill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function SideMenu() {
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
    <nav className="shadow-lg bg-white text-blue-900 max-w-20 min-h-[98vh] flex-1 inline-flex flex-col items-center justify-between gap-8">
      <img
        src="/logo-elsoft.png"
        alt=""
        className="rounded-full object-cover w-10 mt-7"
      />
      <div className="border border-b border-neutral-200 w-[70%]"></div>
      <div className="flex flex-col gap-8 flex-1">
        <Link
          to="/dashboard"
          title="Dashboard">
          <RiHomeSmile2Fill className="text-3xl hover:translate-x-1 duration-300" />
        </Link>
        <Link
          to={`/list/item?${paramItems.toString()}`}
          title="Item">
          <IoBagAdd className="text-3xl hover:translate-x-1 duration-300" />
        </Link>
        <Link
          to={`/list/stock?${paramStock.toString()}`}
          title="Transaction">
          <LuBoxes className="text-3xl hover:translate-x-1 duration-300" />
        </Link>
      </div>
    </nav>
  );
}
