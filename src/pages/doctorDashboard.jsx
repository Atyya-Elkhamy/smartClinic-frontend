import React from "react";

const DoctorDashboard = () => {
  // Dummy data for layout
  const patients = [
    { name: "محمد علي", status: "في الانتظار", time: "10:00", id: 1 },
    { name: "سارة أحمد", status: "تم الكشف", time: "10:20", id: 2 },
    { name: "خالد يوسف", status: "في الانتظار", time: "10:40", id: 3 },
  ];

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center text-primary mb-4">لوحة الطبيب - إدارة المرضى</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white shadow-sm">
          <thead className="table-info">
            <tr>
              <th>اسم المريض</th>
              <th>الحالة</th>
              <th>الوقت المتوقع</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.status}</td>
                <td>{patient.time}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm">عرض التفاصيل</button>
                    <button className="btn btn-info btn-sm text-white">تحديث الحالة</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
