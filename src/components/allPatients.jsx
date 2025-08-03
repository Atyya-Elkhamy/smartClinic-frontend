import React from "react";
import { useTranslation } from "react-i18next";

const PatientsSection = () => {
  const { t } = useTranslation();
  
  const patients = [
    { name: t("mohamed_ali"), status: t("waiting"), time: "10:00", id: 1 },
    { name: t("sara_ahmed"), status: t("checked"), time: "10:20", id: 2 },
    { name: t("khaled_youssef"), status: t("waiting"), time: "10:40", id: 3 },
  ];

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
};

export default PatientsSection;