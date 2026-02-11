import {
  Home,
  Users,
  FileCheck,
  Calendar,
  BarChart2,
  Settings,
  LogOut,
  Briefcase,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doLogout } from "../../services/auth";

const menuItems = [
  { label: "Dashboard", icon: <Home size={18} />, path: "/dashboard/admin" },
  {
    label: "User Management",
    icon: <Users size={18} />,
    path: "/dashboard/admin/usermanage",
  },
  {
    label: "Guide Approvals",
    icon: <FileCheck size={18} />,
    path: "/dashboard/admin/guideapproval",
  },
  {
    label: "Finance",
    icon: <Briefcase size={18} />,
    path: "/dashboard/admin/finance",
  },
  {
    label: "Reviews & Reports",
    icon: <BarChart2 size={18} />,
    path: "/dashboard/admin/review",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-[#0D1B2A] text-white h-screen p-6 relative">
      <h2 className="text-2xl font-semibold mb-10">Tourmate</h2>

      <ul className="space-y-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={idx}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-2 pl-1 rounded-lg transition
                  hover:bg-white/10
                  ${isActive ? "bg-red-400 text-white" : "text-gray-400 w-full"}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="absolute bottom-8 left-6 flex items-center cursor-pointer opacity-70 hover:opacity-100"
        onClick={() => doLogout(navigate)}
      >
        <LogOut size={18} className="mr-2" />
        Logout
      </div>
    </aside>
  );
}
