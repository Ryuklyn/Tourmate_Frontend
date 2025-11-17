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
import FindGuide from "./pages/Usedashboard/FindGuide";
import FavoriteGuides from "./pages/Usedashboard/FavouriteGuides";
import Bookings from "./pages/Usedashboard/Bookings";
import BookingDetails from "./pages/Usedashboard/BookingDetails";

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
          <Route path="findguide" element={<FindGuide />} />
          <Route path="favorites" element={<FavoriteGuides />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookingsdetails" element={<BookingDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
