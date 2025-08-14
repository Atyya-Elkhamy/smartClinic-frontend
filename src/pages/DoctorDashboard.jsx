import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PatientsSection from "../components/doctor/AllPatients";
import AppointmentsSection from "../components/doctor/AllAppointments";
import TodayAppointments from "../components/doctor/TodayAppointments";

const DashboardLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [selectedSection, setSelectedSection] = useState("patients");


  const sidebarItems = [
    { key: "TodayAppointments", label: t("today_appointments"), icon: "bi-calendar-event" },
    { key: "diseases", label: t("diseases"), icon: "bi-emoji-dizzy" },
    { key: "patients", label: t("patients"), icon: "bi-people" },
    { key: "appointments", label: t("appointments"), icon: "bi-calendar-check" },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "TodayAppointments":
        return <TodayAppointments />;
      // case "diseases":
      //   return <DiseasesSection
      //     onAddClick={() => {
      //       setModalType("disease");
      //       setShowModal(true);
      //     }}
      //   />;
      case "appointments":
        return <AppointmentsSection />;
      case "patients":
      default:
        return <PatientsSection />;
    }
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div className="row g-0" style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <div className={`col-md-3 col-lg-2 bg-dark text-white shadow-sm d-flex flex-column p-3 ${isRTL ? "text-end" : "text-start"}`}>
            <h4 className="text-center mb-4">{t("doctor_dashboard_title")}</h4>
            <ul className="nav nav-pills flex-column mb-auto">
              {sidebarItems.map((item) => (
                <li className="nav-item" key={item.key}>
                  <button
                    className={`nav-link w-100 fw-bold ${isRTL ? "text-end" : "text-start"} text-white ${selectedSection === item.key ? "bg-primary" : "text-white-50"}`}
                    onClick={() => setSelectedSection(item.key)}
                  >
                    <i className={`bi ${item.icon} ${isRTL ? "ms-2" : "me-2"}`}></i>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <hr className="text-secondary" />
            <div className="text-center small mt-auto">
              <i className="bi bi-heart-pulse-fill text-danger mx-1"></i>
              Smart Clinic
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10 bg-light p-4">
            <div className="card shadow border-0">
              <div className="card-body bg-white rounded-bottom">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default DashboardLayout;