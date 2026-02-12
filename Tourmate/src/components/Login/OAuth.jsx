import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import { fetchUserInfoOAuth } from "../../services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OAuth = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") || localStorage.getItem("jwtToken");

    if (t) {
      setToken(t);
      localStorage.setItem("AUTH_TOKEN", t);
      fetchUserInfoOAuth().then(() => {
        // After the user info is fetched successfully, redirect to the dashboard
        toast.success("Login successful, welcome!");
         if(localStorage.getItem("role") === "ADMIN") {
          navigate("/dashboard/admin");
        }else if(localStorage.getItem("role") === "GUIDE") {
          navigate("/dashboard/guide");
        } else {
          navigate("/dashboard");
        }
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
