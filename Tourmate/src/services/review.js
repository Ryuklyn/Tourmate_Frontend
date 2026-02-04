import api from "../utils/axiosInterceptor";

// Get reviews for a guide
export const getGuideReviews = async (guideId) => {
  try {
    const res = await api.get(`/traveller/guide/review/${guideId}/reviews`);

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

// Post a review for a guide
export const postGuideReview = async (guideId, review) => {
  try {
    const res = await api.post(`/traveller/guide/review/${guideId}`, review);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error posting review:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const getTourReviews = async (tourId) => {
  try {
    const res = await api.get(`/traveller/tour/review/${tourId}/reviews`);

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

export const postTourReview = async (tourId, review) => {
  try {
    const res = await api.post(`/traveller/tour/review/${tourId}`, review);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error posting review:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};


export const getReviewGuides = async () => {
  try {
    const res = await api.get(`/guides/reviews/guide`);

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
export const getReviewTours = async () => {
  try {
    const res = await api.get(`/guides/reviews/tour`);

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

// Guide comments on a review
export const commentOnGuideReview = async (reviewId, comment) => {
  try {
    const res = await api.post(
      `/guides/reviews/guide/${reviewId}/comment`,
      { comment }
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.error(
      "Error commenting on review:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
};


export const commentOnTourReview = async (reviewId, comment) => {
  try {
    const res = await api.post(
      `/guides/reviews/tour/${reviewId}/comment`,
      { comment }
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.error(
      "Error commenting on review:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
};