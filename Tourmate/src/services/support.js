import { SquareCheckBig } from "lucide-react";
import api from "../utils/axiosInterceptor";

export const sendSupport = async (subject, message,role) => {
  try {
    const res = await api.post("/support/send", {
      subject : subject,
      message : message,
      role : role
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Suport error", error);
    return {
      success: false,
      error: error.response?.data?.message || "Support failed",
    };
  }
};