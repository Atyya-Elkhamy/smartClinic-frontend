import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './slices/accounts';
import appointmentReducer from './slices/patient/patientAppointment';
import languageReducer from './slices/language';
import doctorAppointmentReducer from './slices/doctor/appointments';
import doctorProfileReducer from './slices/doctor/profile';
import docterDiseasesReducer from './slices/doctor/diseases';
import doctorSymptomsReducer from './slices/doctor/symptoms';
import doctorVacationsReducer from './slices/doctor/vacations';
import doctorDaysOffReducer from './slices/doctor/days-off';
import patientProfileReducer from './slices/patient/profile';

const store = configureStore({
  reducer: {
    auth: accountReducer,
    appointments: appointmentReducer,
    doctorAppointments: doctorAppointmentReducer,
    language: languageReducer,
    doctorProfile: doctorProfileReducer,
    doctorDiseases: docterDiseasesReducer,
    doctorSymptoms: doctorSymptomsReducer,
    doctorVacations: doctorVacationsReducer,
    doctorDaysOff: doctorDaysOffReducer,
    patientProfile: patientProfileReducer,
  }
});
export default store;
