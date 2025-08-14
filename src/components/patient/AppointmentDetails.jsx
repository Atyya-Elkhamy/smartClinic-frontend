import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentDetails } from "../../store/slices/patient/patientAppointment";

export default function AppointmentDetails({ id }) {
  const dispatch = useDispatch();
  const { appointmentDetails, loading, error } = useSelector(
    (state) => state.appointments
  );

  const data = appointmentDetails[id];

  useEffect(() => {
    if (id && !data) {
      dispatch(fetchAppointmentDetails(id));
    }
  }, [id, data, dispatch]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!data) return <p>No details available.</p>;

  return (
    <div className="container">
      {/* General Info */}
      <div className="card mb-3">
        <div className="card-header bg-primary text-white">
          Appointment Info
        </div>
        <div className="card-body">
          <p><strong>Queue #:</strong> {data.queue_number}</p>
          <p><strong>Date:</strong> {data.appointment_date}</p>
          <p><strong>Expected Check Time:</strong> {data.expected_check_time}</p>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Visit Reason:</strong> {data.visit_reason}</p>
          <p><strong>Symptoms:</strong> {data.symptoms}</p>
          <p><strong>Diseases:</strong> {data.diseases}</p>
          <p><strong>Symptom Start Date:</strong> {data.symptom_start_date}</p>
        </div>
      </div>

      {/* Patient Medical History Info */}
      <div className="card mb-3">
        <div className="card-header bg-warning">
          Medical Conditions
        </div>
        <div className="card-body">
          <p><strong>Visited Before:</strong> {data.has_visited_before ? "Yes" : "No"}</p>
          <p><strong>Same Reason as Before:</strong> {data.same_reason_as_before ? "Yes" : "No"}</p>
          <p><strong>Allergy/Sensitivity:</strong> {data.has_allergy_or_sensitivity ? `Yes (${data.allergy_details})` : "No"}</p>
        </div>
      </div>

      {/* Treatment Section */}
      {data.treatment && (
        <div className="card mb-3">
          <div className="card-header bg-success text-white">
            Treatment Info
          </div>
          <div className="card-body">
            <p><strong>Diagnosis:</strong> {data.treatment.diagnosis}</p>
            <p><strong>Treatment Plan:</strong> {data.treatment.treatment_plan}</p>
            <p><strong>Medications:</strong> {data.treatment.prescribed_medications}</p>
            <p><strong>Start Date:</strong> {data.treatment.start_date}</p>
            <p><strong>End Date:</strong> {data.treatment.end_date}</p>
          </div>
        </div>
      )}
    </div>
  );
}
