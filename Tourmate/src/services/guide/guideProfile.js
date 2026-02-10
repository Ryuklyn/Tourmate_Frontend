import api from "../../utils/axiosInterceptor";

// Get guide profile
export const getProfile = async () => {
  try {
    const response = await api.get("/guides/profile");
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Update guide info
export const updateGuideInfo = async (guidePayload) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.put(`/guides/edit/${userId}/info`, guidePayload, {
      headers: {
        "Content-Type": "application/json", // JSON only
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Update guide profile picture
export const updateProfilePic = async (file) => {
  try {
    if (!file) throw new Error("No file provided");

    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.put(`/guides/edit/${userId}/profile-pic`, formData, {
      // Do NOT set Content-Type manually for multipart
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};