import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Userdashboard/Sidebar";
import Header from "../../components/Userdashboard/Header";
import { authenticateRole, validateAuthToken } from "../../services/auth";

export default function TravelerLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      const isValid = await validateAuthToken(navigate);
      if (!isValid) return;
      setLoading(false);
    };
    validate();
  }, [navigate]);

  // if (loading) return <div>Checking traveler access...</div>;
  return (
    <div className="min-h-screen w-screen bg-gray-50 text-gray-900">
      {/* ✅ Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        {/* <Header /> */}
        <Header role = "TRAVELLER"/>
      </header>

      <div className="flex pt-16">
        {/* ✅ Fixed Sidebar */}
        <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white z-40">
          <Sidebar />
        </aside>

        {/* ✅ Scrollable Main Content */}
        <main className="ml-64 flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Nested routes will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
