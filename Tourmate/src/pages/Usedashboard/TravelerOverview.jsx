import React, { use, useEffect, useState } from "react";
import StatCard from "../../components/Userdashboard/StatCard";
import AdventureCard from "../../components/Userdashboard/AdventureCard";
import RecentSearches from "../../components/Userdashboard/RecentSearches";
import Kyoto from "../../assets/img/Kyoto.jpg";
import Barcelona from "../../assets/img/Barcelona.jpg";
import Mustang from "../../assets/img/Mustang.jpg";
import { CalendarDays, Star, MapPin, BookOpen, Map } from "lucide-react";
import { getTravellerDashboard, getUpcomingTrips } from "../../services/traveller/dashboard";

export default function TravelerOverview() {
  const [dashboard, setDashboard] = useState({});
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const fetchDashboard = async () => {
    const res = await getTravellerDashboard();
    if (res.success) {
      setDashboard(res.data);
    }
  };
  
  const fetchUpcomingTrips = async () => {
    const res = await getUpcomingTrips(0,10);

      if (res.success) {
        setUpcomingTrips(res.data.data.map((b) => ({
          title: b.tourName,
          guide: b.guideName,
          date: b.startDate,
          image: b.tour.tourPic || Kyoto // fallback image
        })) || []);
      }else{
        setUpcomingTrips([]);

      }
  };
  useEffect(() => {
    fetchDashboard();
    fetchUpcomingTrips();
  },[]);
  const stats = [
    {
      title: "Upcoming Trips",
      value: dashboard.upcomingTrips,
      subtitle: `Next trip in ${dashboard.nextTripInDays} days`,
      icon: <CalendarDays className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Favorite Guides",
      value: dashboard.favouriteGuides,
      subtitle:  `${dashboard.favouriteGuidesThisWeek} guides added this week`,
      icon: <Star className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Places Visited",
      value: 28,
      subtitle: "Across 8 countries",
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Total Bookings",
      value: dashboard.totalBookings,
      subtitle: "Since joining",
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    },
  ];


  return (
    <>
      <h1 className="text-2xl font-bold mt-2">Welcome back, John!</h1>
      <p className="text-gray-500 text-sm mt-1">
        Ready for your next adventure? Here's what's happening with your
        travels.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Upcoming Adventures */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-green-600" /> Upcoming Adventures
        </h2>
        <div className="flex flex-col gap-4">
          {upcomingTrips.map((adv, i) => (
            <AdventureCard key={i} {...adv} />
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <RecentSearches />
    </>
  );
}
