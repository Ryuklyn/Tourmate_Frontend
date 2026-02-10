import api from "../utils/axiosInterceptor";

// Register a new user
export const registerUser = async (newUser) => {
  try {
    const response = await api.post("/auth/register", newUser);
    if (response.data.success) {
      return response.data; // { success: true/false, message: "..." }
    } else {
      console.error("Registration failed:", response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: error.message };
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
    const userId = localStorage.getItem("userId");
    const response = await api.put(
      `/user/changePassword?currentUserId=${userId}`,
      { oldPassword, newPassword }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error changing password:", error);
    const errorMessage =
      error.response?.data?.error || // backend sends { error: "Incorrect Password" }
      error.response?.data || // backend sends "User not found"
      "Server error";

    return { success: false, error: errorMessage };
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