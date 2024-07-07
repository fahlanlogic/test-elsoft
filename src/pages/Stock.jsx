import SideMenu from "../layouts/SideMenu";
import StockLayout from "../layouts/StockLayout";

export default function Stock() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <SideMenu />
      <StockLayout />
    </main>
  );
}
