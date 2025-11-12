import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TourMateLanding from "./pages/TourMateLanding";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FindGuidePage from "./pages/FindGuidePage";
import GuideDetailsPage from "./pages/GuideDetailsPage";
import Dashboard from "./pages/Usedashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TourMateLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-guide" element={<FindGuidePage />} />
        <Route path="/guidedetails" element={<GuideDetailsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
