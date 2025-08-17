import axiosInstance from ".";
// Auth APIs
export const refresh_token = (data) => axiosInstance.post("/accounts/refresh/", data);
export const login = (data) => axiosInstance.post("/accounts/login/", data);
export const logout = () => axiosInstance.post("/accounts/logout/");
export const register = (data) => axiosInstance.post("/accounts/create/", data);
// doctor APIs
export const createTreatment = (id,data) => axiosInstance.post(`/doctor/treatment/${id}/`,data);
export const todayAppointments = () => axiosInstance.get("/doctor/today/");
export const getPatientHistory = (id) => axiosInstance.get(`/doctor/history/${id}/`);
export const changeStatus = (id,data) => axiosInstance.put(`/doctor/status/${id}/`,data);
export const allPatients = () => axiosInstance.get(`/accounts/all-patients/`);
export const getAppointments = () => axiosInstance.get(`/patient/show-all-appointments/`);

// patient APIs
export const getAllAppointments = () => axiosInstance.get(`patient/appointments/all/`);
export const addPatientAppointment = (data) => axiosInstance.post("/patient/appointments/", data);
export const updatePatientAppointment = (id, data) => axiosInstance.put(`/patient/appointments/update/${id}/`, data);
export const deletePatientAppointment = (id) => axiosInstance.delete(`/patient/appointments/delete/${id}/`);
export const getTodayAppointment = () => axiosInstance.get(`/patient/appointments/today/`);
export const getAppointmentTime = (id) => axiosInstance.get(`/patient/expected-time/${id}/`);
export const getAppointmentTreatment = (id) => axiosInstance.get(`/patient/treatments/${id}/`);
export const getAppointmentDetails = (id) => axiosInstance.get(`/patient/appointments/${id}/`);