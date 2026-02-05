import api from "../../utils/axiosInterceptor";

export const getGuideDashboard = async () => {
  try {
    const response = await api.get("/guides/dashboard");
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