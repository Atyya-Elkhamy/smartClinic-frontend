import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Home from "./pages/home";
import Report from "./pages/report";
import DoctorDashboard from "./pages/doctorDashboard";
import PatientQueue from "./components/PatientQueue";
import AboutUs from "./components/aboutUs";
import "./App.css"; // Make sure to include your background CSS here

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
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report" element={<Report />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/queue" element={<PatientQueue />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
