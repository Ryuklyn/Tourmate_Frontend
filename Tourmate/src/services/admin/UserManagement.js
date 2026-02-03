

import axios from "axios";
import CONFIG from "../../../config";


export const getUsers = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
        const response = await axios.get(`${CONFIG.API_URL}/admin/management/travellers`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error fetching Users", error);
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
};

export const getGuides = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
        const response = await axios.get(`${CONFIG.API_URL}/admin/management/guides`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error fetching Guides", error);
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
};


export const suspendGuide = async (guideId) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const response = await axios.put(
      `${CONFIG.API_URL}/admin/management/guides/suspend/${guideId}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {

    return {
      success: false,
      error:
        error.response?.data || "Something went wrong while suspending guide",
    };
  }
};

export const suspendTraveller = async (userId) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const response = await axios.put(
      `${CONFIG.API_URL}/admin/management/travellers/suspend/${userId}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error suspending traveller", error);
    return { success: false, error: error.message };
  }
};

