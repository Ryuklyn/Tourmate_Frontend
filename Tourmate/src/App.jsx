import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TourMateLanding from "./pages/TourMateLanding";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FindGuidePage from "./pages/FindGuidePage";
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
import SettingsPage from "./pages/Guidedashboard/SettingsPage";
import OAuth from "./components/Login/OAuth";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import UserManage from "./pages/Admin/UserManage";
import GuideApproval from "./pages/Admin/GuideApproval";
import FinancialManagement from "./pages/Admin/FinancialManagement";
import Support1 from "./pages/Admin/Support";
import { BecomeGuideProvider } from "./pages/BecomeGuide/BecomeGuideContext";
import GuideTourPackage from "./pages/Guidedashboard/GuideTourPackages";
import FindTour from "./pages/Usedashboard/FindTour";
import TourDetails from "./components/Guidedashboard/TourPackages/TourDetails";
import GuideSupport from "./components/Guidedashboard/GuideSupport";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TourMateLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-guide" element={<FindGuidePage />} />
        <Route path="/oauth2/redirect" element={<OAuth />} />

        {/*Traveler Guide Dashboard*/}
        <Route path="/dashboard" element={<TravelerLayout />}>
          <Route index element={<TravelerOverview />} />
          <Route path="findguide" element={<FindGuide />} />
          <Route path="findtour" element={<FindTour />} />
          <Route path="tourdetails/:tourId" element={<TourDetails />} />
          <Route path="favorites" element={<FavoriteGuides />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookingsdetails/:bookingId" element={<BookingDetails />} />
          <Route path="guideprofile/:guideId" element={<GuideProfile />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="support" element={<Support />} />
          <Route path="become-guide" element={<PreGuide />} />
          <Route
            path="become-guide/*"
            element={
              <BecomeGuideProvider>
                <Routes>
                  <Route index element={<PreGuide />} />
                  <Route path="form1" element={<Form1 />} />
                  <Route path="form2" element={<Form2 />} />
                  <Route path="form3" element={<Form3 />} />
                  <Route path="form4" element={<Form4 />} />
                  <Route path="review-form" element={<ReviewForm />} />
                  <Route path="submit-form" element={<SubmitForm />} />
                </Routes>
              </BecomeGuideProvider>
            }
          />
        </Route>

        {/*GuideDashboard*/}
        <Route path="/dashboard/guide" element={<GuideLayout />}>
          <Route index element={<GuideOverview />} />
          <Route path="profile" element={<GuideProfileManage />} />
          <Route path="bookings" element={<GuideBookings />} />
          <Route path="tourpackages" element={<GuideTourPackage />} />
          <Route path="earnings" element={<EarningsOverview />} />
          <Route path="reviews" element={<GuideReview />} />
          <Route path="availability" element={<Availability />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="support" element={<GuideSupport />} />
        </Route>

        <Route path="/dashboard/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="usermanage" element={<UserManage />} />
          <Route path="guideapproval" element={<GuideApproval />} />
          <Route path="finance" element={<FinancialManagement />} />
          <Route path="review" element={<Support1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
