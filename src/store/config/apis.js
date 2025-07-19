import axiosInstance from ".";
// Auth APIs
export const refresh_token = (data) => axiosInstance.post("/accounts/refresh/", data);
export const login = (data) => axiosInstance.post("/accounts/login/", data);
export const logout = () => axiosInstance.post("/accounts/logout/");
export const register = (data) => axiosInstance.post("/accounts/create/", data);
// Project APIs
export const listAllUserProjects = (id) => axiosInstance.get(`/accounts/projects/${id}/`);
export const addProject = (data) => axiosInstance.post("/accounts/projects/add/", data);
export const updateProject = (id, data) => axiosInstance.put(`/accounts/projects/update/${id}/`, data);
export const deleteProject = (id) => axiosInstance.delete(`/accounts/projects/delete/${id}/`);
// search for products 
export const searchProduct = (query) => {
    return axiosInstance.get("products/search/", {
      params: { q: query },
    });
  };