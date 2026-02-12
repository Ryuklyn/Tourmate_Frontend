
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/axiosInterceptor";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/forgot-password", { email });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center justify-center h-screen w-screen overflow-hidden 
                 bg-linear-to-br from-blue-100 via-[#EDFBFF] to-blue-50"
        >
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-5 left-5 flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
                {/* Back Icon */}
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
                Back
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md relative">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Tour Mate</h1>
                    <p className="text-gray-600">
                        Welcome back <br />
                        Reset your password to sign in to your account to continue your journey
                    </p>
                </div>

                <label className="block text-sm font-medium text-gray-700 text-left">Forgot Password</label>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full border text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Send Reset Link
                    </button>
                </form>
                <ToastContainer position="top-right" autoClose={2500} />
            </div>
        </div>


    )
};

export default ForgotPassword;
