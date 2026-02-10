import api from "../../utils/axiosInterceptor";

export const getAdminDashboard = async () => {
  try {
    const response = await api.get("/admin/dashboard");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};
export const getRecentBookings = async () => {
  try {
    const response = await api.get("/admin/recent-bookings");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};
export const getTopGuides = async () => {
  try {
    const response = await api.get("/admin/top-guides");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

