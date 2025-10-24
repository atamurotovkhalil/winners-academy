import { Outlet } from "react-router";
import { IoPersonSharp } from "react-icons/io5";
import WinnersLogo from "@/widgets/WinnersLogo";

export default function AdminLayout() {
  return (
    <div className="mx-2">
      <nav className="w-full flex justify-between items-center bg-secondary text-black py-4 px-10 text-2xl font-bold">
        <div className="flex items-center justify-start gap-3 text-3xl">
          <WinnersLogo />
          Admin Page
        </div>
        <div>
          <IoPersonSharp className="w-12 h-12 rounded-full border-2 border-white" />
        </div>
      </nav>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
