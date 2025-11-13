import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/dashboard");
    console.log("TravelerLayout rendered");
  };

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 text-left ">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" /> Remember me
        </label>
        {/* <button className="text-blue-600 hover:underline font-medium">
          Forget Password?
        </button> */}
        <Link to="#A" className="text-blue-600 hover:underline">
          Forget Password?
        </Link>
      </div>

      {/* <button
        type="submit"
        className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Sign In
      </button> */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        onClick={handleSignin}
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
