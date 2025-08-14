import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPatients,
  fetchPatientHistory,
} from "../../store/slices/doctor/appointments";

export default function AllPatients() {
  const dispatch = useDispatch();
  const { patients, history, loading, error } = useSelector(
    (state) => state.doctorAppointments
  );

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, [dispatch]);

  const handleViewHistory = (id, username) => {
    setSelectedPatient(username);
    dispatch(fetchPatientHistory(id)).then(() => {
      setShowHistory(true);
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Patients</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, index) => (
            <tr key={index}>
              <td>{p.username}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleViewHistory(index + 1, p.username)} // assuming index+1 is ID; replace with p.id if available
                >
                  View History
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Patient History */}
      {showHistory && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  History for {selectedPatient}
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
