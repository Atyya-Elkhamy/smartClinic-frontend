import AppointmentTreatments from "../components/patient/AppointmentTreatments";
import TodayAppointments from "../components/patient/TodayAppointments";
import AllAppointments from "../components/patient/AllAppointments";

const PatientData = () => {
  return (
    <div>
      <AppointmentTreatments />
      <TodayAppointments />
      <AllAppointments />
    </div>
  );
};

export default PatientData;
