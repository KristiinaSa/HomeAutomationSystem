import "./App.css";
import { CategoriesProvider } from "./CategoriesContext";
import { RoomProvider } from "./RoomContext";
import Layout from "./pages/Layout";
import HomeMobile from "./components/HomeMobile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutomationForm } from "./components/AutomationForm/AutomationForm";
import { Automations } from "./components/Automations/Automations";
import SettingsPage from "./pages/SettingsPage";
import { ThemeProvider } from "./ThemeContext";

function App() {
 
  return (
    <>
    <ThemeProvider>
      <CategoriesProvider>
        <RoomProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomeMobile />} />
              <Route path="automations" element={<Automations />} />
              <Route path="automations/new" element={<AutomationForm />} />
              <Route path="/automations/edit/:id" element={<AutomationForm />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Route>
          </Routes>
        </Router>
        </RoomProvider>
      </CategoriesProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
