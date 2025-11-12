import React from "react";
import Sidebar from "../../components/Userdashboard/Sidebar";
import Header from "../../components/Userdashboard/Header";
import StatCard from "../../components/Userdashboard/StatCard";
import AdventureCard from "../../components/Userdashboard/AdventureCard";
import RecentSearches from "../../components/Userdashboard/RecentSearches";

export default function Dashboard() {
  const stats = [
    {
      title: "Upcoming Trips",
      value: 3,
      subtitle: "Next trip in 5 days",
      icon: "📅",
    },
    {
      title: "Favorite Guides",
      value: 12,
      subtitle: "4 active this week",
      icon: "⭐",
    },
    {
      title: "Places Visited",
      value: 28,
      subtitle: "Across 8 countries",
      icon: "📍",
    },
    {
      title: "Total Bookings",
      value: 45,
      subtitle: "Since joining",
      icon: "📘",
    },
  ];

  const adventures = [
    {
      title: "Kyoto, Japan",
      guide: "Yuki Tanaka",
      date: "Jan 15, 2025",
      image: "https://source.unsplash.com/400x250/?kyoto",
    },
    {
      title: "Barcelona, Spain",
      guide: "Maria Garcia",
      date: "Feb 3, 2025",
      image: "https://source.unsplash.com/400x250/?barcelona",
    },
    {
      title: "Marrakech, Morocco",
      guide: "Hassan Ali",
      date: "Mar 20, 2025",
      image: "https://source.unsplash.com/400x250/?marrakech",
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mt-2">Welcome back, John! 👋</h1>
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
              <span>🗺️</span> Upcoming Adventures
            </h2>
            <div className="flex flex-col gap-4">
              {adventures.map((adv, i) => (
                <AdventureCard key={i} {...adv} />
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <RecentSearches />
        </main>
      </div>
    </div>
  );
}
