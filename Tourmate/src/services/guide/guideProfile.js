import axios from "axios";
import CONFIG from "../../../config";

export const getProfile = async (guideId) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
        const response = await axios.get(`${CONFIG.API_URL}/guides/profile`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error"
        };
    }
};

export const updateGuideInfo = async (guidePayload) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("AUTH_TOKEN");
  
      const response = await axios.put(
        `${CONFIG.API_URL}/guides/edit/${userId}/info`,
        guidePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // JSON only
          },
        }
      );
  
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  
  export const updateProfilePic = async (file) => {
    try {
      if (!file) throw new Error("No file provided");
  
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("AUTH_TOKEN");
  
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await axios.put(
        `${CONFIG.API_URL}/guides/edit/${userId}/profile-pic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ✅ Do NOT set Content-Type manually for multipart
          },
        }
      );
  
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };
  