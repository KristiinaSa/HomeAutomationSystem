import "./App.css";
import "./util/icons";
import { CategoriesProvider } from "./CategoriesContext";
import { RoomProvider } from "./RoomContext";
import Layout from "./pages/Layout";
import HomeMobile from "./components/HomeMobile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutomationForm } from "./components/AutomationForm/AutomationForm";
import { Automations } from "./components/Automations/Automations";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import RegistrationPage  from "./pages/RegistrationPage";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <CategoriesProvider>
            <RoomProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomeMobile />} />
                    <Route path="automations" element={<Automations />} />
                    <Route
                      path="automations/new"
                      element={<AutomationForm />}
                    />
                    <Route
                      path="/automations/edit/:id"
                      element={<AutomationForm />}
                    />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                </Routes>
              </Router>
            </RoomProvider>
          </CategoriesProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
