import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import Home from "./pages/home";
import Report from "./pages/report";
import Footer from "./components/footer";
import DoctorDashboard from "./pages/doctorDashboard";
import PatientQueue from "./components/PatientQueue";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<Report />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/queue" element={<PatientQueue />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
