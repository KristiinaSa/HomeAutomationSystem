import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavbarDesktop from "../components/NavbarDesktop";
import NavbarMobile from "../components/NavbarMobile";
import GoBackButton from "../components/GoBackButton";

const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <NavbarDesktop />
      <NavbarMobile />
      <GoBackButton />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
