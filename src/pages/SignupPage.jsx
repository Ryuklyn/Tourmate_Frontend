// pages/SignupPage.jsx
import SignupForm from "../components/Signup/SignupForm";

export default function SignupPage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-screen overflow-hidden 
               bg-linear-to-br from-blue-100 via-[#EDFBFF] to-blue-50 py-10"
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

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 py-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          Tour Mate
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Create your account and start exploring
        </p>
        <SignupForm />
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
