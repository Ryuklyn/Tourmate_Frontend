import axios from "axios";
import CONFIG from "../../config";

export const getPendingGuideRequest = async (guideId) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
        const response = await axios.get(`${CONFIG.API_URL}/admin/guides/pending`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error fetching guide Requests:", error);
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
};

export const decideGuide = async (guideId, action) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const res = await axios.post(
        `${CONFIG.API_URL}/admin/guides/${guideId}/decision`,
        null,
        {
          params: { action },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Error deciding guide:", err);
      return { success: false, error: err.message };
    }
  };