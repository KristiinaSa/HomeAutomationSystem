import "./App.css";
import { CategoriesProvider } from "./CategoriesContext";
import { RoomProvider } from "./RoomContext";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";
import HomeMobile from "./components/HomeMobile";
import NavbarDesktop from "./components/NavbarDesktop";

function App() {
  return (
    <>
      <CategoriesProvider>
        <RoomProvider>
          <Header />
          <NavbarDesktop />
          <HomeMobile />
          <NavbarMobile />
        </RoomProvider>
      </CategoriesProvider>
    </>
  );
}

export default App;
