import { Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { getTopGuides } from "../../services/admin/dashboard";

export default function TopGuides() {
  const [guides, setGuides] = useState([]);
  const fetchTopGuides = async () => {
    const res = await getTopGuides();
    if (res.success) setGuides(res.data);
  }
  useEffect(() => {
    fetchTopGuides();
  },[])
  // const guides = [
  //   {
  //     name: "Marco Rivera",
  //     location: "Rome, Italy",
  //     rating: 4.9,
  //     earnings: "$12,450",
  //   },
  //   {
  //     name: "Yuki Tanaka",
  //     location: "Tokyo, Japan",
  //     rating: 4.8,
  //     earnings: "$11,200",
  //   },
  //   {
  //     name: "Pierre Dubois",
  //     location: "Paris, France",
  //     rating: 4.9,
  //     earnings: "$10,800",
  //   },
  //   {
  //     name: "Ana Santos",
  //     location: "Barcelona, Spain",
  //     rating: 4.7,
  //     earnings: "$9,650",
  //   },
  // ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900">Top Guides</h3>
          <p className="text-sm text-gray-500 -mt-1">
            Best performing this month
          </p>
        </div>
        <button className="text-red-400 text-sm font-medium hover:underline">
          View all
        </button>
      </div>

      <ul className="space-y-4">
        {guides.map((item, idx) => (
          <li
            key={idx}
            className="bg-gray-50 p-4 rounded-xl border border-gray-200 
                   flex justify-between items-center 
                   hover:bg-gray-100 transition"
          >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
              {/* RANK BADGE (perfect circle) */}
              <div
                className="w-10 h-10 flex items-center justify-center 
                       rounded-full bg-blue-100 text-blue-600 font-semibold"
              >
                {idx + 1}
              </div>

              {/* GUIDE INFO */}
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center space-x-4">
              {/* RATING */}
              <div className="flex items-center gap-1 text-gray-800 text-base font-semibold">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{item.avgRating}</span>
              </div>

              {/* EARNINGS */}
              <div className="font-semibold text-gray-900">{item.earnings}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
