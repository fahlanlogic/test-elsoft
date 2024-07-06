import ItemLayout from "../layouts/ItemLayout";
import SideMenu from "../layouts/SideMenu";

export default function Item() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <SideMenu />
      <ItemLayout />
    </main>
  );
}
