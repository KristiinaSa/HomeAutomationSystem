import "./App.css";
import "./util/icons";
import { CategoriesProvider } from "./context/CategoriesContext";
import { RoomProvider } from "./context/RoomContext";
import Layout from "./pages/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AutomationForm } from "./components/AutomationForm/AutomationForm";
import { Automations } from "./components/Automations/Automations";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import RegistrationPage from "./pages/RegistrationPage";
import AddDevicePage from "./pages/AddDevicePage";
import RoomPage from "./pages/RoomPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AddingRoomPage from "./pages/AddingRoomPage";

import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./pages/HomePage";
import { DeviceProvider } from "./context/DeviceContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <CategoriesProvider>
            <RoomProvider>
              <DeviceProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route element={<ProtectedRoute />}>
                        <Route index element={<HomePage />} />
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
                        <Route path="/add-device" element={<AddDevicePage />} />
                        <Route path="/room/:id" element={<RoomPage />} />
                        <Route path="/add-device" element={<AddDevicePage />} />
                        <Route path="/room/:id" element={<RoomPage />} />
                        <Route
                          path="/accessories"
                          element={<AccessoriesPage />}
                        />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/add-room" element={<AddingRoomPage />} />
                      </Route>

                      <Route element={<PublicRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                          path="/register"
                          element={<RegistrationPage />}
                        />
                      </Route>
                    </Route>
                  </Routes>
                </Router>
              </DeviceProvider>
            </RoomProvider>
          </CategoriesProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
