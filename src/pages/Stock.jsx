import SideMenu from "../layouts/SideMenu";
import StockLayout from "../layouts/StockLayout";
import { Helmet } from "react-helmet";

export default function Stock() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <Helmet>
        <title>Stock - Elsoft App</title>
      </Helmet>
      <SideMenu />
      <StockLayout />
    </main>
  );
}
