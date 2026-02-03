import api from "../../utils/axiosInterceptor";

// Get all pending guide requests
export const getPendingGuideRequest = async () => {
  try {
    const response = await api.get("/admin/guides/pending");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching guide requests:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Approve or reject a guide
export const decideGuide = async (guideId, action) => {
  try {
    const res = await api.post(`/admin/guides/${guideId}/decision`, null, {
      params: { action },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Error deciding guide:", err);
    return { success: false, error: err.message };
  }
};