import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodayAppointments,
} from "../../store/slices/patient/patientAppointment";
import { fetchPatientHistory, changeAppointmentStatus } from "../../store/slices/doctor/appointments";
import CreateTreatment from "./AddTreatment";
import AppointmentDetails from "../patient/AppointmentDetails";

export default function TodayAppointments() {
  const dispatch = useDispatch();
  const { today, loading, error } = useSelector((state) => state.appointments);
  const { history } = useSelector((state) => state.doctorAppointments);

  const [selectedApptId, setSelectedApptId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showCreateTreatment, setShowCreateTreatment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    dispatch(fetchTodayAppointments());
  }, [dispatch]);

  const handleChangeStatus = (id) => {
    dispatch(changeAppointmentStatus({ id, data: { status: "completed" } }));
  };

  const handleViewDetails = (id) => {
    setSelectedApptId(id);
    setShowDetails(true);
  };

  const handleViewHistory = (patientId, patientName) => {
    setSelectedPatient(patientName);
    dispatch(fetchPatientHistory(patientId)).then(() => {
      setShowHistory(true);
    });
  };

  const handleCreateTreatmentClick = (appt) => {
    setSelectedAppointment(appt);
    setShowCreateTreatment(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Today's Appointments</h2>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Queue #</th>
            <th>Patient Name</th>
            <th>Visit Reason</th>
            <th>Symptoms</th>
            <th>Status</th>
            <th style={{ width: "340px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {today.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.queue_number}</td>
              <td>{appt.patient_name || "Unknown"}</td>
              <td>{appt.visit_reason}</td>
              <td>{appt.symptoms}</td>
              <td>{appt.status}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleChangeStatus(appt.id)}
                >
                  Complete
                </button>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleViewDetails(appt.id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    handleViewHistory(appt.patient, appt.patient_name)
                  }
                >
                  History
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleCreateTreatmentClick(appt)}
                >
                  Create Treatment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal - Create Treatment */}
      {showCreateTreatment && selectedAppointment && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Create Treatment for {selectedAppointment.patient_name}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowCreateTreatment(false)}
                ></button>
              </div>
              <div className="modal-body">
                <CreateTreatment appointmentId={selectedAppointment.id} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Appointment Details */}
      {showDetails && selectedApptId && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Appointment Details</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDetails(false)}
                ></button>
              </div>
              <div className="modal-body">
                <AppointmentDetails id={selectedApptId} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Patient History */}
      {showHistory && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  History for {selectedPatient || "Patient"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowHistory(false)}
                ></button>
              </div>
              <div className="modal-body">
                {loading ? (
                  <p>Loading history...</p>
                ) : history.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Diagnosis</th>
                        <th>Treatment Plan</th>
                        <th>Medications</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Follow-up</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((h, idx) => (
                        <tr key={idx}>
                          <td>{h.diagnosis}</td>
                          <td>{h.treatment_plan}</td>
                          <td>{h.prescribed_medications}</td>
                          <td>{h.start_date}</td>
                          <td>{h.end_date}</td>
                          <td>{h.follow_up_date}</td>
                          <td>{h.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No history found for this patient.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
