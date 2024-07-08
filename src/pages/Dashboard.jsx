import DashboardLayout from "../layouts/DashboardLayout";
import SideMenu from "../layouts/SideMenu";

export default function Dashboard() {
  return (
    <main className="relative md:flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <SideMenu />
      <DashboardLayout />
    </main>
  );
}
