import React from "react";
import TourmateLogo from "../../assets/img/TourmateLogo.png";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      {/* Centered and larger logo */}
      <img
        src={TourmateLogo}
        onClick={() => navigate("/dashboard")}
        alt="TourMate Logo"
        className="h-24 w-auto mx-auto cursor-pointer" // increased height, centered with mx-auto
      />

      {/* Header text */}
      <h1 className="text-4xl font-extrabold text-gray-900 mt-4 mb-2">
        Tour Mate
      </h1>

      {/* Optional sub-header or tagline */}
      <p className="text-gray-600 text-lg">
        Welcome back <br />
        Sign in to your account to continue your journey
      </p>
    </div>
  );
};

export default LoginHeader;
