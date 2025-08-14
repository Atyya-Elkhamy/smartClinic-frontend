import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAppointment } from "../store/slices/patient/patientAppointment";
import { useTranslation } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";

const AddAppointment = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.appointments);

  const [formData, setFormData] = useState({
    visit_reason: "",
    symptoms: "",
    diseases: "",
    treatments: "",
    symptom_start_date: "",
    has_visited_before: false,
    same_reason_as_before: false,
    has_allergy_or_sensitivity: false,
    allergy_details: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [generalMessage, setGeneralMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setGeneralMessage("");

    try {
      const resultAction = await dispatch(addNewAppointment(formData));

      if (addNewAppointment.fulfilled.match(resultAction)) {
        setGeneralMessage(t("appointment_created_successfully"));
        setFormData({
          visit_reason: "",
          symptoms: "",
          diseases: "",
          treatments: "",
          symptom_start_date: "",
          has_visited_before: false,
          same_reason_as_before: false,
          has_allergy_or_sensitivity: false,
          allergy_details: ""
        });
      } else if (addNewAppointment.rejected.match(resultAction)) {
        const errors = resultAction.payload;
        if (typeof errors === "object") {
          setFormErrors(errors);
        } else {
          setGeneralMessage(errors || t("failed_to_create_appointment"));
        }
      }
    } catch {
      setGeneralMessage(t("unexpected_error"));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-8">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">{t("create_appointment")}</h3>

          {generalMessage && (
            <div
              className={`alert ${
                generalMessage.includes("✅") || generalMessage.includes(t("success"))
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {generalMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                {t("visit_reason")}
              </label>
              <textarea
                name="visit_reason"
                className={`form-control ${formErrors.visit_reason ? "is-invalid" : ""}`}
                value={formData.visit_reason}
                onChange={handleChange}
                required
              />
              {formErrors.visit_reason && (
                <div className="invalid-feedback">{formErrors.visit_reason}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                {t("symptoms")}
              </label>
              <textarea
                name="symptoms"
                className={`form-control ${formErrors.symptoms ? "is-invalid" : ""}`}
                value={formData.symptoms}
                onChange={handleChange}
                required
              />
              {formErrors.symptoms && (
                <div className="invalid-feedback">{formErrors.symptoms}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                {t("diseases")}
              </label>
              <textarea
                name="diseases"
                className="form-control"
                value={formData.diseases}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                {t("treatments")}
              </label>
              <textarea
                name="treatments"
                className="form-control"
                value={formData.treatments}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                {t("symptom_start_date")}
              </label>
              <input
                type="date"
                name="symptom_start_date"
                className="form-control"
                value={formData.symptom_start_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="has_visited_before"
                checked={formData.has_visited_before}
                onChange={handleChange}
              />
              <label className="form-check-label">{t("has_visited_before")}</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="same_reason_as_before"
                checked={formData.same_reason_as_before}
                onChange={handleChange}
              />
              <label className="form-check-label">{t("same_reason_as_before")}</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="has_allergy_or_sensitivity"
                checked={formData.has_allergy_or_sensitivity}
                onChange={handleChange}
              />
              <label className="form-check-label">{t("has_allergy_or_sensitivity")}</label>
            </div>

            {formData.has_allergy_or_sensitivity && (
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">
                  {t("allergy_details")}
                </label>
                <textarea
                  name="allergy_details"
                  className="form-control"
                  value={formData.allergy_details}
                  onChange={handleChange}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading && <Spinner animation="border" size="sm" className="me-2" />}
              {t("create_appointment")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
