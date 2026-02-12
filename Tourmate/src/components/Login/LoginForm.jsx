import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doLogin } from "../../services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password");
      return;
    }

    const loginStatus = await doLogin(formData.email, formData.password);

    if (loginStatus.error) {
      toast.error(loginStatus.error);
    } else {
      toast.success("Login successful, welcome!");

      const role = localStorage.getItem("role");
      if (role === "ADMIN") {
        navigate("/dashboard/admin");
      } else if (role === "GUIDE") {
        navigate("/dashboard/guide");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 text-left">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full border text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 text-left">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full border text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" /> Remember me
        </label>
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forget Password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Sign In
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up now
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
