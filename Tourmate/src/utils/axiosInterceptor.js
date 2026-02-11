import axios from "axios";
import CONFIG from "./config";

const api = axios.create({
  baseURL: CONFIG.API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      try {
        const res = await axios.post(
          `${CONFIG.API_URL}/auth/refresh`,
          { refreshToken }
        );

        localStorage.setItem("AUTH_TOKEN", res.data.token);

        error.config.headers.Authorization = `Bearer ${res.data.token}`;
        return axios(error.config);
      } catch {
        // // alert("hehe");
        // localStorage.clear();
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;