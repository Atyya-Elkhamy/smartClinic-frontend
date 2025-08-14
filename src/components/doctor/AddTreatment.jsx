import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointmentTreatment } from "../../store/slices/doctor/appointments";

export default function CreateTreatment({ appointmentId }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.doctorAppointments);

  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment_plan: "",
    prescribed_medications: "",
    start_date: "",
    end_date: "",
    follow_up_date: "",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentId) return alert("Appointment ID is missing!");
    dispatch(createAppointmentTreatment({ id: appointmentId, data: formData }));
  };

  return (
    <div className="container mt-3">
      <h4 className="mb-4 text-primary">
        Create Treatment for Appointment #{appointmentId}
      </h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <label className="form-label fw-bold">Diagnosis</label>
          <textarea
            className="form-control"
            name="diagnosis"
            rows="2"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-bold">Treatment Plan</label>
          <textarea
            className="form-control"
            name="treatment_plan"
            rows="2"
            value={formData.treatment_plan}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-bold">Prescribed Medications</label>
          <textarea
            className="form-control"
            name="prescribed_medications"
            rows="2"
            value={formData.prescribed_medications}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Start Date</label>
          <input
            type="date"
            className="form-control"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">End Date</label>
          <input
            type="date"
            className="form-control"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Follow-up Date</label>
          <input
            type="date"
            className="form-control"
            name="follow_up_date"
            value={formData.follow_up_date}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label fw-bold">Notes</label>
          <textarea
            className="form-control"
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Treatment"}
          </button>
        </div>
      </form>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
