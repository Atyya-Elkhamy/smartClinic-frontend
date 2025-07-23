import React, { useState } from "react";

const AllAppointments = () => {
  const allAppointments = [
    {
      id: 1,
      patient: "John Doe",
      date: "2025-07-22",
      time: "10:00 AM",
      doctor: "Dr. Sarah Smith",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2025-07-23",
      time: "11:30 AM",
      doctor: "Dr. Mark Wilson",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Michael Brown",
      date: "2025-07-24",
      time: "09:00 AM",
      doctor: "Dr. Emily Johnson",
      status: "Cancelled",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredAppointments = allAppointments.filter(
    (appt) =>
      appt.patient.toLowerCase().includes(search.toLowerCase()) ||
      appt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      appt.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "badge bg-success";
      case "Pending":
        return "badge bg-warning text-dark";
      case "Cancelled":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-calendar-check-fill text-primary me-2"></i>
          All Appointments
        </h2>
        <hr className="bg-dark mx-auto" style={{ height: "4px", width: "150px", opacity: 0.75 }} />
      </div>

      {/* Advanced Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="input-group shadow rounded-4">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by patient, doctor, or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded-4 overflow-hidden border">
        <table className="table table-striped table-hover align-middle mb-0 text-center">
          <thead className="table-primary text-center">
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td className="text-center fw-semibold">{index + 1}</td>
                  <td>{appt.patient}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.doctor}</td>
                  <td>
                    <span className={getStatusBadgeClass(appt.status)}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  <i className="bi bi-exclamation-circle me-2"></i>No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllAppointments;
