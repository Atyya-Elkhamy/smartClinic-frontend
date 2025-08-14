import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodayAppointments, deleteAppointmentById } from "../../store/slices/patient/patientAppointment";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../ConfirmationModal";

const TodayAppointments = () => {
  const dispatch = useDispatch();
  const { today, loading, error } = useSelector((state) => state.appointments);
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchTodayAppointments());
  }, [dispatch]);

  const handleCancelClick = (id) => {
    setSelectedAppointmentId(id);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointmentId) return;
    setIsDeleting(true);
    await dispatch(deleteAppointmentById(selectedAppointmentId));
    setIsDeleting(false);
    setShowModal(false);
    setSelectedAppointmentId(null);
  };

  if (loading) {
    return <p className="text-center text-info">{t("loading_today_appointments")}</p>;
  }

  if (error) {
    return <p className="text-danger text-center">{t("error")}: {error}</p>;
  }

  if (today.length === 0) {
    return <p className="text-center">{t("no_appointments_today")}</p>;
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">{t("today_appointments")}</h2>
      <div className="row justify-content-center">
        {today.map((appt) => (
          <div key={appt.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{t("appointment_id")}: {appt.id}</h5>
              </div>
              <div className="card-body">
                <p><strong>{t("visit_reason")}:</strong> {appt.visit_reason}</p>
                <p><strong>{t("symptoms")}:</strong> {appt.symptoms}</p>
                <p><strong>{t("queue_number")}:</strong> {appt.queue_number}</p>
                <p><strong>{t("expected_check_time")}:</strong> {appt.expected_check_time}</p>
                <p>
                  <strong>{t("status")}:</strong>{" "}
                  <span className={`badge ${appt.status === "waiting" ? "bg-warning" : "bg-success"}`}>
                    {appt.status}
                  </span>
                </p>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleCancelClick(appt.id)}
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmCancel}
        title={t("confirm_cancel_title")}
        body={t("confirm_cancel_message")}
        confirmText={t("yes_cancel")}
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TodayAppointments;
