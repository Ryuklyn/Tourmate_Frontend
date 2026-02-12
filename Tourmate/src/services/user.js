
import api from "../utils/axiosInterceptor";
// Register a new user
export const registerUser = async (newUser) => {
  try {
    const response = await api.post(`auth/register`, newUser);
    if (response.data.success) {
      return response.data; // { success: true, message: "..." }
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

// Get current user data
export const getUserData = async () => {
  try {
    const response = await api.get("/user/getDetails");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.put(`/user/update/${userId}`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error saving users:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

// Change user password
export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const response = await api.put(`/user/change-password`, { oldPassword, newPassword });
    // Backend returns { success: true, message: "Password changed successfully" }
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    // Backend returns { success: false, message: "Old password is incorrect" }
    const message = error.response?.data?.message || "Server error";
    return { success: false, message };
  }
};
// Change profile picture
export const changeProfilePic = async (file, userId) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    const res = await api.put("/user/change-profile-pic", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // token auto-added by interceptor
    });

    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Upload failed";
    return { success: false, error: message };
  }
};