import ItemLayout from "../layouts/ItemLayout";
import SideMenu from "../layouts/SideMenu";
import { Helmet } from "react-helmet";

export default function Item() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <Helmet>
        <title>Item - Elsoft App</title>
      </Helmet>
      <SideMenu />
      <ItemLayout />
    </main>
  );
}
