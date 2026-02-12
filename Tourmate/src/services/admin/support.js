import api from "../../utils/axiosInterceptor";


// Fetch all support messages
export const getAllSupportMessages = async () => {
  try {
    const res = await api.get("/admin/support");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Fetch support messages error", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch support messages",
    };
  }
};


export const getSupportMessagesByRole = async (role) => {
  try {

    const url = role ? `/admin/support/role/${role}` : `/admin/support/role/ALL`;

    const res = await api.get(url);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Failed to fetch support messages:", error);
    return { success: false, error: error.response?.data || error.message };
  }
};


// Mark a support message as seen
export const markSupportAsSeen = async (id) => {
  try {
    const res = await api.put(`/admin/support/mark-seen/${id}`);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Mark as seen error", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to mark as seen",
    };
  }
};


export const sendEmail = async ({ to, subject, message }) => {
  try {
    const response = await api.post("/admin/email/send", { to, subject, message });
    return response.data; // { success: true/false, message: "..." }
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};