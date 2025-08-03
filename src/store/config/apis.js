import { data } from "react-router-dom";
import axiosInstance from ".";
// Auth APIs
export const refresh_token = (data) => axiosInstance.post("/accounts/refresh/", data);
export const login = (data) => axiosInstance.post("/api/patient/auth/login/", data);
export const doctorLogin = (data) => axiosInstance.post("/api/doctor/auth/login/", data);
export const logout = () => axiosInstance.post("/api/patient/auth/logout/");
export const register = (data) => axiosInstance.post("/api/patient/auth/register/", data);
// doctor APIs
export const listAllAppointments = () => axiosInstance.get(`/api/doctor/appointments/`);
export const waitingAppointments = () => axiosInstance.get("/api/doctor/appointments/waiting/status");
export const checkedAppointments = () => axiosInstance.get(`/api/doctor/appointments/checked/status/`);
export const latedAppointment = () => axiosInstance.get(`/api/doctor/appointments/lated/status/`);
export const patientAppointments = (id) => axiosInstance.get(`/api/doctor/appointments/${id}/patient`)
export const appointmentDetails = (id) => axiosInstance.get(`/api/doctor/appointments/${id}/`)
export const changeStatus = (id) => axiosInstance.post(`/api/doctor/appointments/${id}/`)
export const doctorProfile = (id) => axiosInstance.get(`/api/doctor/profile/${id}/`)
export const updateProfile = (id,data) => axiosInstance.put(`api/doctor/profile/${id}`,data)
export const updatePassword = (id ,data) => axiosInstance.put(`/api/doctor/change-password/${id}/`,data)
export const addDesisease = (data) => axiosInstance.post("/api/doctor/diseases/", data);
export const getDiseases = () => axiosInstance.get("/api/doctor/diseases/");
export const deleteDisease = (id) => axiosInstance.delete(`/api/doctor/diseases/${id}/`);
export const updateDisease = (id, data) => axiosInstance.put(`/api/doctor/diseases/${id}/`, data);
export const addsymptom = (data) => axiosInstance.post("/api/doctor/symptoms/", data);
export const getSymptoms = () => axiosInstance.get("/api/doctor/symptoms/");
export const deleteSymptom = (id) => axiosInstance.delete(`/api/doctor/symptoms/${id}/`);
export const updateSymptom = (id, data) => axiosInstance.put(`/api/doctor/symptoms/${id}/`, data);
export const getVacations = () => axiosInstance.get("/api/doctor/vacations/");
export const addVacation = (data) => axiosInstance.post("/api/doctor/vacations/add/", data);
export const updateVacation = (id, data) => axiosInstance.put(`/api/doctor/vacations/update/${id}/`, data);
export const deleteVacation = (id) => axiosInstance.delete(`/api/doctor/vacations/delete/${id}/`);
export const getDaysOff = () => axiosInstance.get("/api/doctor/days-off/");
export const addDayOff = (data) => axiosInstance.post("/api/doctor/days-off/add/", data);
export const updateDayOff = (id, data) => axiosInstance.put(`/api/doctor/days-off/update/${id}/`, data);
export const deleteDayOff = (id) => axiosInstance.delete(`/api/doctor/days-off/delete/${id}/`);

// patient APIs
export const getPatientProfile = (id) => axiosInstance.get(`/api/patient/${id}/`);
export const updatePatientProfile = (id, data) => axiosInstance.put(`/api/patient/${id}/`, data);
export const changePatientPassword = (id, data) => axiosInstance.put(`/api/patient/change-password/${id}/`, data);
export const getPatientAppointments = (id) => axiosInstance.get(`/api/patient/appointments/${id}/`);
export const addPatientAppointment = (data) => axiosInstance.post("/api/patient/appointments/add/", data);
export const updatePatientAppointment = (id, data) => axiosInstance.put(`/api/patient/appointments/update/${id}/`, data);
export const deletePatientAppointment = (id) => axiosInstance.delete(`/api/patient/appointments/delete/${id}/`);
