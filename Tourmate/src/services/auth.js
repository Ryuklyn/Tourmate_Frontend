import axios from "axios";
import CONFIG from "../../config";



export const doLogin = async (email, password) => {
    try {
        const res = await axios.post(`${CONFIG.API_URL}/auth/login`, { email, password });
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("role", res.data.role);
        return true;
    } catch (error) {
        return { error: error.response?.data?.error || 'Login failed' };
    }
};
export const handleLoginGoogle = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

export const fetchUserInfo = async () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const res = await axios.get(
      "http://localhost:8080/api/user/getOAuth",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    localStorage.setItem("AUTH_TOKEN", res.data.token);
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("role", res.data.role);  } catch (error) {
    console.error(error);
    alert("Error fetching user info");
  }
};
export const doLogout = (navigate) => {
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("Email");        
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  navigate("/login");
}

export const validateAuthToken = async (navigate) => {
    const authToken = localStorage.getItem("AUTH_TOKEN");
  
    if (!authToken) {
      navigate("/login");
      return false;
    }
  
    try {
      await axios.get(`${CONFIG.API_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return true; // token valid
    } catch (error) {
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      navigate("/login");
      return false;
    }
  };



  
  export const authenticateAdmin = async (navigate) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) return false;
  
    try {
      await axios.get(`${CONFIG.API_URL}/auth/validate-admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true; // admin validated
    } catch (err) {
      // failed validation: remove token & role
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      navigate("/login");
      return false;
    }
  };
  