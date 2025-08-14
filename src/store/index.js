import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './slices/accounts';
import appointmentReducer from './slices/patient/patientAppointment';
import languageReducer from './slices/language';
import doctorAppointmentReducer from './slices/doctor/appointments';

const store = configureStore({
  reducer: {
    auth: accountReducer,
    appointments: appointmentReducer,
    doctorAppointments: doctorAppointmentReducer,
    language: languageReducer,
  }
});
export default store;
