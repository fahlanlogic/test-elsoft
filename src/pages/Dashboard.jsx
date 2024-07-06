import DashboardComponent from "../components/DashboardComponent";
import SideMenu from "../components/SideMenu";

export default function Dashboard() {
  return (
    <main className="flex h-screen w-full bg-neutral-100 gap-4 font-quicksand">
      <SideMenu />
      <DashboardComponent />
    </main>
  );
}
