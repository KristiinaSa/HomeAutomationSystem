import "./App.css";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateAutomation } from "./components/CreateAutomation/CreateAutomation";
import { Automations } from "./components/AutomationPage/Automations";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAutomation />} />
        <Route path="/automations" element={<Automations />} />
      </Routes>
    </Router>
  );
}

export default App;
