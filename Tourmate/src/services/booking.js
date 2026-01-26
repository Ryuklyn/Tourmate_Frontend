import axios from "axios";
import CONFIG from "../../config";

export const bookGuide = async ({ guideId, hours, groupSize }) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const res = await axios.post(
      `${CONFIG.API_URL}/traveller/guide/book-request`,
      {
        guideId,
        hours,
        groupSize,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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


export const bookTour = async ({
  guideId,
  tourId,
  travellers,
  startDate,
}) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const res = await axios.post(
      `${CONFIG.API_URL}/traveller/tour/book-request`,
      {
        guideId,
        tourId,
        travellers,
        startDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Booking error", error);
    return {
      success: false,
      error: error.response?.data?.message || "Booking failed",
    };
  }
};
