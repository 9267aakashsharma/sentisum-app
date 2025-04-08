import { Sidebar, Navbar } from "../components";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main>
      <Sidebar />
      <section className="ml-16 pt-2 pb-8 px-8">
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;
