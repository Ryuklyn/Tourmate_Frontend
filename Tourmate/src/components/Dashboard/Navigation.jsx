import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import TourmateLogo from "../../assets/img/TourmateLogo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleCreateGuide = () => {
    navigate("/create-guide");
  };

  // Scroll to section smoothly
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close mobile menu
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-8">
          <div
            className="flex items-center gap-2 text-xl font-bold cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={TourmateLogo}
              alt="TourMate Logo"
              className="h-12 w-auto object-contain"
            />
            <span>TourMate</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-sm">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => navigate("/dashboard/find-guide")}
            >
              Find Guides
            </button>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => navigate("/dashboard/tour-tour")}
            >
              Explore Packages
            </button>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection("how-it-works")}
            >
              How It Works
            </button>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => scrollToSection("support")}
            >
              Support
            </button>
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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
            onClick={handleCreateGuide}
          >
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
          <button
            className="block w-full text-left text-gray-700 hover:text-gray-900"
            onClick={() => navigate("/dashboard/find-guide")}
          >
            Find Guides
          </button>
          <button
            className="block w-full text-left text-gray-700 hover:text-gray-900"
            onClick={() => navigate("/dashboard/tour-tour")}
          >
            Explore Packages
          </button>
          <button
            className="block w-full text-left text-gray-700 hover:text-gray-900"
            onClick={() => scrollToSection("how-it-works")}
          >
            How It Works
          </button>
          <button
            className="block w-full text-left text-gray-700 hover:text-gray-900"
            onClick={() => scrollToSection("about")}
          >
            About
          </button>
          <button
            className="block w-full text-left text-gray-700 hover:text-gray-900"
            onClick={() => scrollToSection("support")}
          >
            Support
          </button>

          <div className="flex flex-col gap-2 mt-3">
            <button
              className="w-full text-sm text-gray-600 border border-gray-300 py-2 rounded-md hover:bg-gray-50"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600 transition"
              onClick={handleCreateGuide}
            >
              Create a Guide
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
