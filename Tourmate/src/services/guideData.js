import axios from "axios";
import CONFIG from "../../config";

export const getApprovedGuides = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
        const response = await axios.get(`${CONFIG.API_URL}/traveller/guides/filter`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
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

export const getGuideById = async (guideId) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      const response = await axios.get(`${CONFIG.API_URL}/traveller/guides/${guideId}`,
        { 
            headers: { Authorization: `Bearer ${token}`} 
        }
      );
      return { 
        success: true, 
        data: response.data.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || "Unknown error" };
    }
  };
  export const getFavouritedGuides = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
        const response = await axios.get(`${CONFIG.API_URL}/traveller/favourites/guides`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
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

export const getToursByGuide = async (guideId) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const res = await axios.get(`${CONFIG.API_URL}/traveller/tours/guide/${guideId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Map to expected format
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

export const toggleFavourite = async (guideId) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const res = await axios.post(
      `${CONFIG.API_URL}/traveller/favourites/guide/${guideId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      favorited: res.data?.data?.favorited, // may be undefined
    };
  } catch (error) {
    console.error("Error toggling favourite:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Toggle failed",
    };
  }
};


