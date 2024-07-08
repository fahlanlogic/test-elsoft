import EditStockLayout from "../layouts/EditStockLayout";
import SideMenu from "../layouts/SideMenu";
import { Helmet } from "react-helmet";

export default function EditStock() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <Helmet>
        <title>Form Edit Stock</title>
      </Helmet>
      <SideMenu />
      <EditStockLayout />
    </main>
  );
}
