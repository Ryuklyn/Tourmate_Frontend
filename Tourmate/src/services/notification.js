import api from "../utils/axiosInterceptor";

export const getAllNotifications = async () => {
    try {
      const res = await api.get("/notifications/all");
  
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  };

  export const getUnreadNotifications = async () => {
    try {
      const res = await api.get("/notifications/unread");
  
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Failed to fetch unread notifications:", error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  };

  export const markNotificationAsRead = async (id) => {
    try {
      const res = await api.put(`/notifications/mark-read/${id}`);
  
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  };

  
  export const markAllNotificationsAsRead = async () => {
    try {
      const res = await api.put("/notifications/mark-read-all");
  
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  };
  