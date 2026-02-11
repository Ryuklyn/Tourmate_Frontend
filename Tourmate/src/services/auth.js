import CONFIG from "../utils/config";
import api from "../utils/axiosInterceptor";
import axios from "axios";

export const doLogin = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    // const res = await axios.post(`${CONFIG.API_URL}/auth/login`, { email, password });
    localStorage.setItem("AUTH_TOKEN", res.data.token);
    localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("role", res.data.role);

    return true;
  } catch (error) {
    return { error: error.response?.data?.error || "Login failed" };
  }
};

export const handleLoginGoogle = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

export const fetchUserInfoOAuth = async () => {
  try {
    const res = await api.get("/user/getOAuth");

    localStorage.setItem("AUTH_TOKEN", res.data.token);
    localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("role", res.data.role);
  } catch (error) {
    console.error(error);
    alert("Error fetching user info");
  }
};

export const doLogout = (navigate) => {
  localStorage.clear();
  navigate("/login");
};

export const validateAuthToken = async (navigate) => {
  try {
    await api.get("/auth/validate");
    return true;
  } catch {
    localStorage.clear();
    navigate("/login");
    return false;
  }
};

export const authenticateRole = async (role, navigate) => {
  try {
    await api.get(`/auth/validate-role/${role}`);
    return true;
  } catch {
    localStorage.clear();
    navigate("/login");
    return false;
  }
};