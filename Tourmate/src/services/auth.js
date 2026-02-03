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

export const fetchUserInfoOAuth = async () => {
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
localStorage.clear();
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
      localStorage.clear();
      navigate("/login");
      return false;
    }
  };



  
  export const authenticateRole = async (role, navigate) => {
    const token = localStorage.getItem("AUTH_TOKEN");
  
    if (!token) {
      navigate("/login");
      return false;
    }
  
    try {
      await axios.get(
        `${CONFIG.API_URL}/auth/validate-role/${role}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return true;
    } catch {
      localStorage.clear();
      navigate("/login");
      return false;
    }
  };