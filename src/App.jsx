import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Pages & Components
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Report from "./pages/report";
import DoctorDashboard from "./pages/doctorDashboard";
import PatientQueue from "./components/PatientQueue";
import AboutUs from "./components/aboutUs";
import Unauthorized from "./pages/unauthorized";
import NotFound from "./pages/notFound";
import Header from "./components/header";
import ProtectedRoute from "./components/protectRoute";

// Styles
import "./App.css";

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
              <Route path="/queue" element={<PatientQueue />} />
            </Route>

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
