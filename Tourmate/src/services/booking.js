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

export const fetchBookings = async ({ status, page, size }) => {
  try {
    const res = await api.get("/guides/tour/bookings/view", {
      params: { status, page, size },
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.error("Failed to fetch bookings", err);
    return { success: false };
  }
};



export const getMyTourBookings = async ({ status, page = 0, size = 10 }) => {
  try {
    const params = { page, size };
    if (status) params.status = status;

    const response = await api.get("/traveller/tour/mytourbookings", {
      params,
    });

    return {
      success: true,
      data: response.data.data,
      total: response.data.totalBookings,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to load bookings",
    };
  }
};

export const cancelTourBooking = async (bookingId) => {
  try {
    const response = await api.delete(
      `/traveller/tour/${bookingId}/cancel`
    );

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to cancel booking",
    };
  }
};
export const getBookingDetails = async (bookingId) => {
  try {
    const response = await api.get("/traveller/tour/bookingDetails", {
      params: { bookingId },
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch booking details",
    };
  }
};




