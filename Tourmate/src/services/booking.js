import api from "../utils/axiosInterceptor";

// Book a guide
export const bookGuide = async ({ guideId, hours, groupSize }) => {
  try {
    const res = await api.post("/traveller/guide/book-request", {
      guideId,
      hours,
      groupSize,
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Booking error", error);
    return {
      success: false,
      error: error.response?.data?.message || "Booking failed",
    };
  }
};

// Book a tour
export const bookTour = async ({ guideId, tourId, travellers, startDate }) => {
  try {
    const res = await api.post("/traveller/tour/book-request", {
      guideId,
      tourId,
      travellers,
      startDate,
    });

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Booking error", error);
    return {
      success: false,
      error: error.response?.data?.message || "Booking failed",
    };
  }
};