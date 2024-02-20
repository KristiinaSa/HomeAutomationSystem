import "./App.css";
import { CategoriesProvider } from "./CategoriesContext";
import { RoomProvider } from "./RoomContext";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";
import HomeMobile from "./components/HomeMobile";
import NavbarDesktop from "./components/NavbarDesktop";

// Global Font Awesome imports for common icons
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronRight);

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutomationForm } from "./components/AutomationForm/AutomationForm";
import { Automations } from "./components/Automations/Automations";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/automations" element={<Automations />} />
        <Route path="/automations/new" element={<AutomationForm />} />
        <Route path="/automations/edit/:id" element={<AutomationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
