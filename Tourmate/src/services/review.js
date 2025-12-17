import axios from "axios";
import CONFIG from "../../config";

export const getGuideReviews = async (guideId) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const res = await axios.get(`${CONFIG.API_URL}/traveller/guide/review/${guideId}/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: res.data.status === "success",
      reviews: res.data.reviews || [],
      averageRating: res.data.averageRating || 0,
      totalReviews: res.data.totalReviews || 0,
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: false, reviews: [], averageRating: 0, totalReviews: 0 };
  }
};

export const postGuideReview = async (guideId, review) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const res = await axios.post(
        `${CONFIG.API_URL}/traveller/guide/review/${guideId}`,
        review,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Error posting review:", error.response?.data || error.message);
      return { success: false, error: error.response?.data || error.message };
    }
  };
