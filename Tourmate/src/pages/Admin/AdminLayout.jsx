import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authenticateRole } from "../../services/auth";

export default function AdminLayout() {
  // return (
  //   <div className="flex bg-gray-100 min-h-screen">
  //     {/* Fixed Sidebar */}
  //     <Sidebar />

  //     {/* Page Content */}
  //     <main className="flex-1 p-8 overflow-y-hidden">
  //       <Outlet />
  //     </main>
  //   </div>
  // );

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      const isValid = await authenticateRole("ADMIN", navigate);
      if (!isValid) return;
      setLoading(false);
    };
    validate();
  }, [navigate]);

  if (loading) return <div>Checking admin access...</div>;
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (fixed height, NOT scrollable) */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1">
        {/* Header (fixed, not scrollable) */}
        <Header />

        {/* Main Content - Only this should scroll */}
        <main className="flex-1 overflow-y-auto bg-[#F5F7FA] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
