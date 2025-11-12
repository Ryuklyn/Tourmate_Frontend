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
import TravelerLayout from "./pages/Usedashboard/TravelerLayout";
import TravelerOverview from "./pages/Usedashboard/TravelerOverview";

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

        {/*Traveler Guide Dashboard*/}
        <Route path="/dashboard" element={<TravelerLayout />}>
          <Route index element={<TravelerOverview />} />
          <Route path="/find-guide" element={<FindGuidePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
