import api from "../../utils/axiosInterceptor";

// Get all travellers
export const getUsers = async () => {
  try {
    const response = await api.get("/admin/management/travellers");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching Users", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Get all guides
export const getGuides = async () => {
  try {
    const response = await api.get("/admin/management/guides");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching Guides", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Suspend a guide
export const suspendGuide = async (guideId) => {
  try {
    const response = await api.put(`/admin/management/guides/suspend/${guideId}`, null);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || "Something went wrong while suspending guide",
    };
  }
};

// Suspend a traveller
export const suspendTraveller = async (userId) => {
  try {
    const response = await api.put(`/admin/management/travellers/suspend/${userId}`, null);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error suspending traveller", error);
    return { success: false, error: error.message };
  }
};