import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';

const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <NavbarDesktop />
        <NavbarMobile />
      <main>
        <Outlet />
      </main>
      
    </div>
  );
}

export default Layout;