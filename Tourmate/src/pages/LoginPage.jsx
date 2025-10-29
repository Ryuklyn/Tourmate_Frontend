import React from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/Login/LoginHeader";
import LoginForm from "../components/Login/LoginForm";
import SocialLoginButtons from "../components/Login/SocialLoginButtons";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center h-screen w-screen overflow-hidden 
                 bg-gradient-to-br from-blue-100 via-[#EDFBFF] to-blue-50"
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
        {/* Login Content */}
        <LoginHeader />
        <LoginForm />
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default LoginPage;
