import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentTreatment } from "../../store/slices/patient/patientAppointment";
import { useTranslation } from "react-i18next";

const AppointmentTreatments = ({ appointmentId }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const treatment = useSelector(
        (state) => state.appointments.appointmentTreatments?.[appointmentId] || null
    );
    const { loading, error } = useSelector((state) => state.appointments);

    useEffect(() => {
        if (appointmentId) {
            dispatch(fetchAppointmentTreatment(appointmentId));
        }
    }, [dispatch, appointmentId]);

    if (loading) return <p className="text-info text-center">{t("loading_treatment")}</p>;
    if (error) return <p className="text-danger text-center">{t("error")}: {error}</p>;
    if (!treatment) return <p className="text-center">{t("no_treatment_found")}</p>;

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">{t("treatment_for_appointment")} #{appointmentId}</h2>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow border-0">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">{treatment.diagnosis}</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>{t("treatment_plan")}:</strong> {treatment.treatment_plan}</p>
                            <p><strong>{t("prescribed_medications")}:</strong> {treatment.prescribed_medications}</p>
                            <p><strong>{t("start_date")}:</strong> {treatment.start_date}</p>
                            <p><strong>{t("end_date")}:</strong> {treatment.end_date}</p>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-outline-primary">{t("download_prescription")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentTreatments;
