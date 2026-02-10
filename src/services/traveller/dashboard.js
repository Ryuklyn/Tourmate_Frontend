import api from "../../utils/axiosInterceptor";


export const getUpcomingTrips = async (page, size) => {
    try {
      const response = await api.get(`/traveller/tour/upcoming-trips?page=${page}&size=${size}`);
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

  export const getTravellerDashboard = async () => {
    try {
      const response = await api.get("/traveller/dashboard");
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

  