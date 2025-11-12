import React from "react";
import StatCard from "../../components/Userdashboard/StatCard";
import AdventureCard from "../../components/Userdashboard/AdventureCard";
import RecentSearches from "../../components/Userdashboard/RecentSearches";
import Kyoto from "../../assets/img/Kyoto.jpg";
import Barcelona from "../../assets/img/Barcelona.jpg";
import Mustang from "../../assets/img/Mustang.jpg";
import { CalendarDays, Star, MapPin, BookOpen, Map } from "lucide-react";

export default function TravelerOverview() {
  const stats = [
    {
      title: "Upcoming Trips",
      value: 3,
      subtitle: "Next trip in 5 days",
      icon: <CalendarDays className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Favorite Guides",
      value: 12,
      subtitle: "4 active this week",
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
      value: 45,
      subtitle: "Since joining",
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    },
  ];

  const adventures = [
    {
      title: "Kyoto, Japan",
      guide: "Yuki Tanaka",
      date: "Jan 15, 2025",
      image: Kyoto,
    },
    {
      title: "Barcelona, Spain",
      guide: "Maria Garcia",
      date: "Feb 3, 2025",
      image: Barcelona,
    },
    {
      title: "Mustang, Nepal",
      guide: "Niroj Shrestha",
      date: "Mar 20, 2025",
      image: Mustang,
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
          {adventures.map((adv, i) => (
            <AdventureCard key={i} {...adv} />
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <RecentSearches />
    </>
  );
}
