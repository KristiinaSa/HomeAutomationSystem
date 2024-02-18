import "./App.css";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutomationForm } from "./components/AutomationForm/AutomationForm";
import { Automations } from "./components/Automations/Automations";
import { AutomationsProvider } from "./context/AutomationsContext";

function App() {
  return (
    <AutomationsProvider>
      <Router>
        <Routes>
          <Route path="/automations" element={<Automations />} />
          <Route path="/automations/new" element={<AutomationForm />} />
          <Route path="/automations/edit/:id" element={<AutomationForm />} />
        </Routes>
      </Router>
    </AutomationsProvider>
  );
}

export default App;
