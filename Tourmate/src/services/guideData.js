import api from "../utils/axiosInterceptor";

// Get all approved guides
export const getApprovedGuides = async () => {
  try {
    const response = await api.get("/traveller/guides/filter");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching guides:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Get guide by ID
export const getGuideById = async (guideId) => {
  try {
    const response = await api.get(`/traveller/guides/${guideId}`);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Get favourited guides
export const getFavouritedGuides = async () => {
  try {
    const response = await api.get("/traveller/favourites/guides");
    console.log(response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching guides:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Get tours by guide
export const getToursByGuide = async (guideId) => {
  try {
    const res = await api.get(`/traveller/tours/guide/${guideId}`);

    return {
      success: res.data.status === "success",
      data: res.data.data || [],
    };
  } catch (error) {
    console.error("Error fetching tours:", error);
    return {
      success: false,
      data: [],
      error: error.message || "Unknown error",
    };
  }
};

// Toggle favourite guide
export const toggleFavouriteGuide = async (guideId) => {
  try {
    const res = await api.post(`/traveller/favourites/guide/${guideId}`, {});

    return {
      success: true,
      favorited: res.data?.data?.favorited,
    };
  } catch (error) {
    console.error("Error toggling favourite:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Toggle failed",
    };
  }
};