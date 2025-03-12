import Footer from "./../../widgets/Footer";
import Navbar from "./../../widgets/Navbar";
import { Outlet } from "react-router";


export default function mainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}