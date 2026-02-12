
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";


const Navigation = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-gray-900">Tour Mate</h1>

          {/* Desktop Links */}
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

        {/* Right Section - Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition">
            Create a Guide
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 border-t border-gray-200 pt-3 space-y-3 px-2">
          <a href="#" className="block text-gray-700 hover:text-gray-900">
            Find Guides
          </a>
          <a href="#" className="block text-gray-700 hover:text-gray-900">
            Explore Packages
          </a>
          <a href="#" className="block text-gray-700 hover:text-gray-900">
            How It Works
          </a>
          <a href="#" className="block text-gray-700 hover:text-gray-900">
            About
          </a>
          <a href="#" className="block text-gray-700 hover:text-gray-900">
            Support
          </a>

          <div className="flex flex-col gap-2 mt-3">
            <button
              className="w-full text-sm text-gray-600 border border-gray-300 py-2 rounded-md hover:bg-gray-50"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600 transition">
              Create a Guide
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
