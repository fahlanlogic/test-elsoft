import EditStockLayout from "../layouts/EditStockLayout";
import SideMenu from "../layouts/SideMenu";

export default function EditStock() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <SideMenu />
      <EditStockLayout />
    </main>
  );
}
