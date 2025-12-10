import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import { fetchUserInfo } from "../../services/auth";

const OAuth = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") || localStorage.getItem("jwtToken");

    if (t) {
      setToken(t);
      localStorage.setItem("AUTH_TOKEN", t);
      fetchUserInfo().then(() => {
        // After the user info is fetched successfully, redirect to the dashboard
        navigate("/dashboard");  // Redirect to /dashboard
      }).catch((error) => {
        // Handle errors (optional)
        console.error("Error fetching user info:", error);
        alert("Error fetching user info. Please try again.");
      });

      window.history.replaceState({}, document.title, "/"); // Clean URL
    }
  }, [navigate]);  // Dependency array to ensure useEffect runs only once

  return (
    <>
      <p>Loading...</p>  {/* You can show a loading message while waiting */}
    </>
  );
};

export default OAuth;
