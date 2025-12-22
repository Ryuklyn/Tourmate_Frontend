// guideRegister.js
import axios from "axios";
import CONFIG from "../../config";

export const registerGuide = async (userId, token, guideData, profilePicFile, governmentPicFile) => {
  try {
    const formData = new FormData();

    formData.append("guide", JSON.stringify(guideData));
    if (profilePicFile) formData.append("profilePic", profilePicFile);
    if (governmentPicFile) formData.append("governmentPic", governmentPicFile);

    const response = await axios.post(
      `${CONFIG.API_URL}/user/guides/register/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Guide registration error:", error);
    throw error;
  }
};
