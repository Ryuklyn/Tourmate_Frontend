// components/SignupForm.jsx
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import InputField from "./InputField";
import Button from "./Button";
import { registerUser } from "../../services/user";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    purpose: "Find Amazing tours (Traveler)",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async() => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    const registerStatus = registerUser(formData)
    if (registerStatus){
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        purpose: "Find Amazing tours (Traveler)",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
      navigate("/login");
    }

  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          placeholder="Enter First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <InputField
        label="Email address"
        type="email"
        name="email"
        placeholder="Enter your email"
        icon={Mail}
        value={formData.email}
        onChange={handleChange}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          I want to
        </label>
        <select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
        >
          <option>Find Amazing tours (Traveler)</option>
          <option>List my tours (Tour Guide)</option>
          <option>Explore destinations</option>
        </select>
      </div>

      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Create a strong password"
        icon={Lock}
        value={formData.password}
        onChange={handleChange}
      />

      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        icon={Lock}
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      <Button onClick={handleSubmit}>Create Account</Button>
    </div>
  );
};

export default SignupForm;
