import "./App.css";
import "./util/icons";
import { CategoriesProvider } from "./CategoriesContext";
import { RoomProvider } from "./RoomContext";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";
import HomeMobile from "./components/HomeMobile";
import NavbarDesktop from "./components/NavbarDesktop";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutomationForm } from "./components/AutomationForm/AutomationForm";
import { Automations } from "./components/Automations/Automations";

import { DarkLightProvider } from "./contexts/DarkLightProvider";

function App() {
  return (
    <DarkLightProvider>
      <Router>
        <Routes>
          <Route path="/automations" element={<Automations />} />
          <Route path="/automations/new" element={<AutomationForm />} />
          <Route path="/automations/edit/:id" element={<AutomationForm />} />
        </Routes>
      </Router>
    </DarkLightProvider>
  );
}

export default App;
