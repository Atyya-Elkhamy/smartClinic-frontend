import React from "react";
import { useTranslation } from "react-i18next";

const PatientQueue = () => {
  const { t } = useTranslation();
  // Dummy data for layout
  const myOrder = 3;
  const expectedTime = "10:40";
  const patientsBefore = [
    { name: "محمد علي", time: "10:00" },
    { name: "سارة أحمد", time: "10:20" },
  ];

  return (
    <div className="p-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-info text-white text-center">
              <h2 className="card-title fw-bold mb-0">{t("your_queue")}</h2>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <table className="table table-bordered align-middle mb-0">
                  <tbody>
                    <tr>
                      <th className="bg-light text-black w-50 fw-bold fs-5">{t("patients_before_you")}</th>
                      <td>
                        <span className="fw-bold text-info fs-5">{patientsBefore.length}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-light text-black w-50 fw-bold fs-5">{t("your_order")}</th>
                      <td>
                        <span className="fw-bold text-primary fs-5">{myOrder}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-light text-black w-50 fw-bold fs-5">{t("expected_check_time")}</th>
                      <td>
                        <span className="fw-bold text-success fs-5">{expectedTime}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h5 className="text-info mb-3 fw-bold fs-5">{t("patients_list")}</h5>
                <ul className="list-group">
                  {patientsBefore.map((p, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{p.name}</span>
                      <span className="badge bg-primary rounded-pill">{p.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;
