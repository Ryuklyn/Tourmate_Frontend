// guideRegister.js
import api from "../utils/axiosInterceptor";

export const registerGuide = async (userId, guideData, profilePicFile, governmentPicFile) => {
  try {
    const formData = new FormData();
    formData.append("guide", JSON.stringify(guideData));
    if (profilePicFile) formData.append("profilePic", profilePicFile);
    if (governmentPicFile) formData.append("governmentPic", governmentPicFile);

    const response = await api.post(
      `/user/guides/register/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // token auto-added by interceptor
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Guide registration error:", error);
    throw error;
  }
};