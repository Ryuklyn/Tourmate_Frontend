import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-gray-900">Tour Mate</h1>
          <div className="hidden md:flex space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Find Guides
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Explore Packages
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              How It Works
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Support
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
            Create a Guide
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
