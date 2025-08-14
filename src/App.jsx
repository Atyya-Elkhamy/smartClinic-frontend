import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// Pages & Components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Report from "./pages/Report";
import DoctorDashboard from "./pages/DoctorDashboard";
import AboutUs from "./components/aboutUs";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Header from "./components/header";
import ProtectedRoute from "./components/protectRoute";
import "./App.css";
import PatientData from "./pages/PatientDashboard";

function DirectionHandler() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return null;
}

function App() {
  return (
    <>
      <DirectionHandler />
      <BrowserRouter>
        <Header />
        <div className="background-wrapper">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Doctor Route */}
            <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            </Route>

            {/* Protected Patient Routes */}
            <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
              <Route path="/report" element={<Report />} />
            </Route>
            <Route path="/patientData" element={<PatientData />} />

            {/* Unauthorized Access */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Catch-All 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
