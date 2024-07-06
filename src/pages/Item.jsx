import ItemComponent from "../components/ItemComponent";
import SideMenu from "../components/SideMenu";

export default function Item() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <SideMenu />
      <ItemComponent />
    </main>
  );
}
