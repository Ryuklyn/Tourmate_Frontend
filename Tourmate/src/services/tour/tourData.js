import axios from "axios";
import CONFIG from "../../../config";


export const getToursByGuide = async (guideId) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const res = await axios.get(`${CONFIG.API_URL}/guide/tour/mytours`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // Map to expected format
      return {
        success: res.data.status === "success",
        data: res.data.data || [],
      };
    } catch (error) {
      console.error("Error fetching tours:", error);
      return {
        success: false,
        data: [],
        error: error.message || "Unknown error",
      };
    }
  };
  


export const deleteTourById = async (tourId) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const res = await axios.delete(`${CONFIG.API_URL}/guide/tour/${tourId}/delete`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return {
      success: res.data.status === "success",
      message: res.data.message,
    };
  } catch (error) {
    console.error("Error deleting tour:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Unknown error",
    };
  }
};

export const createTour = async (formData) => {
  try {
    const token = localStorage.getItem("AUTH_TOKEN"); // or your auth logic
    const res = await axios.post(`${CONFIG.API_URL}/guide/tour/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false, message: err.response?.data?.message || err.message };
  }
};
