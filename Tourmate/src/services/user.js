import axios from "axios";
import CONFIG from "../../config";



export const registerUser = async (newUser) => {
  try {
    const response = await axios.post(`${CONFIG.API_URL}/auth/register`, newUser);
    if(response.data.success) {
      return response.data; // { success: true/false, message: "..." }
    }
    else{
      console.error("Registration failed:", response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: error.message };
  }
};

export const getUserData = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const response = await axios.get(`${CONFIG.API_URL}/user/getDetails`,
      {
          headers: { Authorization: `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data, 
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  };

  export const updateProfile = async (userData) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("AUTH_TOKEN");
  
      const response = await axios.put(
        `${CONFIG.API_URL}/user/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` } // include token
        }
      );
  
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error saving users:", error);
      return { success: false, error: error.message || "Unknown error" };
    }
  };


  export const changePassword = async ({ oldPassword, newPassword }) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("AUTH_TOKEN");
  
      const response = await axios.put(
        `${CONFIG.API_URL}/user/changePassword?currentUserId=${userId}`,
        { oldPassword, newPassword }, // body
        { headers: { Authorization: `Bearer ${token}` } } // headers
      );
  
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error changing password:", error);
      const errorMessage =
        error.response?.data?.error || // backend sends { error: "Incorrect Password" }
        error.response?.data || // backend sends "User not found"
        "Server error";
  
      return { success: false, error: errorMessage };
    }
  };
  

  export const changeProfilePic = async (file, userId) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
  
      const res = await axios.put(
        `${CONFIG.API_URL}/user/change-profile-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}` // include token
          },
        }
      );
  
      return { success: true, data: res.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Upload failed";
      return { success: false, error: message };
    }
  };