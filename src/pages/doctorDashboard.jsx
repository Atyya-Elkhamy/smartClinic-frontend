import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AllAppointments from "../components/allAppointments";

const DoctorDashboard = () => {
  const { t, i18n } = useTranslation();
  const [selectedSection, setSelectedSection] = useState("patients");
  const [formValue, setFormValue] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const isRTL = i18n.dir() === "rtl";

  const sidebarItems = [
    { key: "symptoms", label: t("symptoms"), icon: "bi-thermometer-half" },
    { key: "diseases", label: t("diseases"), icon: "bi-emoji-dizzy" },
    { key: "patients", label: t("patients"), icon: "bi-people" },
    { key: "appointments", label: t("appointments"), icon: "bi-calendar-check" },
  ];

  const patients = [
    { name: "محمد علي", status: t("waiting"), time: "10:00", id: 1 },
    { name: "سارة أحمد", status: t("checked"), time: "10:20", id: 2 },
    { name: "خالد يوسف", status: t("waiting"), time: "10:40", id: 3 },
  ];

  const handleSubmit = (type) => {
    if (formValue.trim() === "") return;
    if (type === "symptom") {
      setSymptoms([...symptoms, formValue.trim()]);
    } else {
      setDiseases([...diseases, formValue.trim()]);
    }
    setFormValue("");
  };

  const renderForm = (type) => (
    <div className="mb-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder={t(`enter_${type}`)}
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
      />
      <button
        className="btn btn-success"
        onClick={() => handleSubmit(type)}
      >
        {t(`add_${type}`)}
      </button>
    </div>
  );

  const renderContent = () => {
    switch (selectedSection) {
      case "symptoms":
        return (
          <div>
            <h4 className="text-center mb-4 text-white py-3 bg-primary fw-bold">{t("symptoms")}</h4>
            {renderForm("symptom")}
            {symptoms.length > 0 && (
              <ul className="list-group">
                {symptoms.map((symptom, index) => (
                  <li key={index} className="list-group-item">{symptom}</li>
                ))}
              </ul>
            )}
          </div>
        );
      case "diseases":
        return (
          <div>
            <h4 className="text-center mb-4 text-white py-3 bg-primary fw-bold">{t("diseases")}</h4>
            {renderForm("disease")}
            {diseases.length > 0 && (
              <ul className="list-group">
                {diseases.map((disease, index) => (
                  <li key={index} className="list-group-item">{disease}</li>
                ))}
              </ul>
            )}
          </div>
        );
      case "appointments":
        return (
          <div>
            <h4 className="text-center mb-4 text-white py-3 bg-primary fw-bold">{t("appointments")}</h4>
            <AllAppointments />
          </div>
        );
      case "patients":
      default:
        return (
          <div className="table-responsive">
            <h4 className="text-center mb-4 text-white py-3 bg-primary fw-bold">{t("patients")}</h4>
            <table className="table table-hover align-middle mb-0 text-center">
              <thead className="table-info">
                <tr>
                  <th>{t("patient_name")}</th>
                  <th>{t("status")}</th>
                  <th>{t("expected_time")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="fw-semibold">{patient.name}</td>
                    <td>
                      <span className={`badge px-3 py-2 fs-6 ${patient.status === t("waiting") ? "bg-warning text-dark" : "bg-success"}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info text-white fs-6 px-3 py-2">{patient.time}</span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-outline-primary btn-sm px-3">
                          <i className="bi bi-eye me-1"></i> {t("view_details")}
                        </button>
                        <button className="btn btn-outline-success btn-sm px-3">
                          <i className="bi bi-arrow-repeat me-1"></i> {t("update_status")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div className={`col-md-3 col-lg-2 bg-dark text-white shadow-sm d-flex flex-column p-3 ${isRTL ? "text-end" : "text-start"}`}>
          <h4 className="text-center mb-4">{t("doctor_dashboard_title")}</h4>
          <ul className="nav nav-pills flex-column mb-auto">
            {sidebarItems.map((item) => (
              <li className="nav-item" key={item.key}>
                <button
                  className={`nav-link w-100 fw-bold ${isRTL ? "text-end" : "text-start"} text-white ${
                    selectedSection === item.key ? "bg-primary" : "text-white-50"
                  }`}
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
            <div className="card-body bg-white rounded-bottom">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
