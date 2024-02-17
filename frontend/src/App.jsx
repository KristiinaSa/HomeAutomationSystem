import "./App.css";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateAutomation } from "./components/CreateAutomation/CreateAutomation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAutomation />} />
      </Routes>
    </Router>
  );
}

export default App;
