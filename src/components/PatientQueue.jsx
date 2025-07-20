import React from "react";

const PatientQueue = () => {
  // Dummy data for layout
  const myOrder = 3;
  const expectedTime = "10:40";
  const patientsBefore = [
    { name: "محمد علي", time: "10:00" },
    { name: "سارة أحمد", time: "10:20" },
  ];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h2 className="card-title fw-bold text-primary mb-4">دورك في العيادة</h2>
              <div className="mb-3">
                <div>عدد المرضى قبلك: <span className="fw-bold text-info">{patientsBefore.length}</span></div>
                <div>المرضى قبلك:</div>
                <ul className="list-unstyled my-2">
                  {patientsBefore.map((p, idx) => (
                    <li key={idx}>
                      {p.name} - {p.time}
                    </li>
                  ))}
                </ul>
                <div>رقم دورك: <span className="fw-bold text-info">{myOrder}</span></div>
                <div>الوقت المتوقع للكشف: <span className="fw-bold text-info">{expectedTime}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;
