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
import FavoriteGuides from "./pages/Usedashboard/FavouritePage";
import Bookings from "./pages/Usedashboard/Bookings";
import BookingDetails from "./pages/Usedashboard/BookingDetails";
import GuideProfile from "./pages/Usedashboard/GuideProfile";
import ProfileSettings from "./pages/Usedashboard/ProfileSettings";
import PreGuide from "./pages/BecomeGuide/PreGuide";
import Form1 from "./pages/BecomeGuide/Form1";
import Form2 from "./pages/BecomeGuide/Form2";
import Form3 from "./pages/BecomeGuide/Form3";
import Form4 from "./pages/BecomeGuide/Form4";
import ReviewForm from "./pages/BecomeGuide/ReviewForm";
import SubmitForm from "./pages/BecomeGuide/SubmitForm";
import Support from "./pages/Usedashboard/Support";
import GuideLayout from "./pages/Guidedashboard/GuideLayout";
import GuideOverview from "./components/Guidedashboard/GuideOverview";
import EarningsOverview from "./pages/Guidedashboard/EarningsOverview";
import GuideProfileManage from "./pages/Guidedashboard/GuideProfileManage";
import GuideBookings from "./pages/Guidedashboard/GuideBookings";
import GuideReview from "./pages/Guidedashboard/GuideReview";
import Availability from "./pages/Guidedashboard/Availability";

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
          <Route path="guideprofile" element={<GuideProfile />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="support" element={<Support />} />
          <Route path="become-guide" element={<PreGuide />} />
          <Route path="become-guide/form1" element={<Form1 />} />
          <Route path="become-guide/form2" element={<Form2 />} />
          <Route path="become-guide/form3" element={<Form3 />} />
          <Route path="become-guide/form4" element={<Form4 />} />
          <Route path="become-guide/review-form" element={<ReviewForm />} />
          <Route path="become-guide/submit-form" element={<SubmitForm />} />
        </Route>

        {/*GuideDashboard*/}
        <Route path="/dashboard/guide" element={<GuideLayout />}>
          <Route index element={<GuideOverview />} />
          <Route path="profile" element={<GuideProfileManage />} />
          <Route path="bookings" element={<GuideBookings />} />
          <Route path="earnings" element={<EarningsOverview />} />
          <Route path="reviews" element={<GuideReview />} />\
          <Route path="availability" element={<Availability />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
