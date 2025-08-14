import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "../../store/slices/doctor/appointments";
import AppointmentTreatments from "../patient/AppointmentTreatments";

const AllAppointments = () => {
  const dispatch = useDispatch();
  const { allAppointments, loading, error } = useSelector(
    (state) => state.doctorAppointments
  );

  const [search, setSearch] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const handleViewTreatment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  const filteredAppointments = (allAppointments || []).filter((appt) => {
    const searchLower = search.toLowerCase();
    return (
      String(appt.patient || "").toLowerCase().includes(searchLower) ||
      (appt.status || "").toLowerCase().includes(searchLower) ||
      (appt.visit_reason || "").toLowerCase().includes(searchLower) ||
      (appt.treatments || "").toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "badge bg-primary";
      case "waiting":
        return "badge bg-info text-dark";
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
        <hr
          className="bg-dark mx-auto"
          style={{ height: "4px", width: "150px", opacity: 0.75 }}
        />
      </div>

      {/* Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="input-group shadow rounded-4">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by patient ID, status, or visit reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded-4 overflow-hidden border mb-4">
        <table className="table table-striped table-hover align-middle mb-0 text-center">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Patient ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Visit Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-muted">
                  Loading appointments...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-danger py-4">
                  {typeof error === "string"
                    ? error
                    : error?.message || "An error occurred"}
                </td>
              </tr>
            ) : filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td className="fw-semibold">{index + 1}</td>
                  <td>{appt.patient}</td>
                  <td>{appt.appointment_date}</td>
                  <td>{appt.expected_check_time}</td>
                  <td>
                    <span className={getStatusBadgeClass(appt.status)}>
                      {appt.status}
                    </span>
                  </td>
                  <td>{appt.visit_reason || "—"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleViewTreatment(appt.id)}
                    >
                      View Treatment
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-muted py-4">
                  <i className="bi bi-exclamation-circle me-2"></i>No
                  appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Treatment Viewer */}
      {selectedAppointmentId && (
        <AppointmentTreatments appointmentId={selectedAppointmentId} />
      )}
    </section>
  );
};

export default AllAppointments;
