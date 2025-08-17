import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAppointments,
  deleteAppointmentById,
} from "../../store/slices/patient/patientAppointment";
import AppointmentDetails from "./AppointmentDetails";
import AppointmentTreatments from "./AppointmentTreatments";

const AllAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [viewMode, setViewMode] = useState(null); // "details" or "treatment"

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      dispatch(deleteAppointmentById(id));
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!appointments || appointments.length === 0)
    return <p>No appointments found.</p>;

  return (
    <div className="p-4">
      <h2 className="mb-3">All Appointments</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Visit Reason</th>
            <th>Symptoms</th>
            <th>Diseases</th>
            <th>Status</th>
            <th>Queue</th>
            <th>Expected Time</th>
            <th>Appointment Date</th>
            <th>Treatment Diagnosis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.id}</td>
              <td>{appt.visit_reason}</td>
              <td>{appt.symptoms}</td>
              <td>{appt.diseases}</td>
              <td>{appt.status}</td>
              <td>{appt.queue_number}</td>
              <td>{appt.expected_check_time}</td>
              <td>{appt.appointment_date}</td>
              <td>{appt.treatment ? appt.treatment.diagnosis : "N/A"}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => {
                    setSelectedAppointmentId(appt.id);
                    setViewMode("details");
                  }}
                >
                  Details
                </button>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => {
                    setSelectedAppointmentId(appt.id);
                    setViewMode("treatment");
                  }}
                >
                  View Treatment
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(appt.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Details OR Treatment depending on button */}
      {selectedAppointmentId && viewMode === "details" && (
        <div className="mt-4">
          <AppointmentDetails id={selectedAppointmentId} />
        </div>
      )}

      {selectedAppointmentId && viewMode === "treatment" && (
        <div className="mt-4">
          <AppointmentTreatments appointmentId={selectedAppointmentId} />
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
