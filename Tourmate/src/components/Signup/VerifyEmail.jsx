import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../utils/axiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const calledRef = useRef(false); // prevent double toast in Strict Mode

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const verify = async () => {
      try {
        const response = await api.get(`/auth/verify?token=${token}`);
        toast.success(response.data.message, {
          autoClose: 3000,
          onClose: () => navigate("/login"),
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Invalid or expired verification token",
          {
            autoClose: 3000,
            onClose: () => navigate("/login"),
          }
        );
      }
    };

    if (token) verify();
    else {
      toast.error("No verification token provided", {
        autoClose: 3000,
        onClose: () => navigate("/login"),
      });
    }
  }, [token, navigate]);

  return <ToastContainer position="top-right" />;
};

export default VerifyEmail;
