import api from "../../utils/axiosInterceptor";

// Get tours of the guide
export const getToursByGuide = async () => {
  try {
    const res = await api.get("/guide/tour/mytours");
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

// Delete a tour
export const deleteTourById = async (tourId) => {
  try {
    const res = await api.delete(`/guide/tour/${tourId}/delete`);
    return {
      success: res.data.status === "success",
      message: res.data.message,
    };
  } catch (error) {
    console.error("Error deleting tour:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Unknown error",
    };
  }
};

// Create a new tour
export const createTour = async (formData) => {
  try {
    const res = await api.post("/guide/tour/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // token auto-added
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// Edit an existing tour
export const editTour = async (tourId, formData) => {
  try {
    const res = await api.put(`/guide/tour/${tourId}/edit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // token auto-added
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// Toggle favourite tour
export const toggleFavouriteTour = async (tourId) => {
  try {
    const res = await api.post(`/traveller/favourites/tour/${tourId}`, {});
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

// Get favourite tours
export const getFavouritedTours = async () => {
  try {
    const response = await api.get("/traveller/favourites/tours");
    console.log(response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching favourite tours:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

// Get tour by ID
export const getTourById = async (tourId) => {
  try {
    const response = await api.get(`/traveller/tours/${tourId}`);
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