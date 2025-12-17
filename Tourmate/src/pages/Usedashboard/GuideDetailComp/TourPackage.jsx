// import React from "react";
// import Patan from "../../../assets/img/Patan.jpg";
// import Everest from "../../../assets/img/Everest.jpg";
// import Pokhara from "../../../assets/img/Pokhara.jpg";
// import Chitwan from "../../../assets/img/Chitwan.jpg";
// import Lumbini from "../../../assets/img/Lumbini.jpg";

// export default function TourPackages() {
//   const tours = [
//     // Nepal Tours
//     {
//       title: "Kathmandu Heritage Tour",
//       hours: "6 hours",
//       price: "$120",
//       img: Patan,
//     },
//     {
//       title: "Everest Base Camp Trek (12 Days)",
//       hours: "12 days",
//       price: "$1450",
//       img: Everest,
//     },
//     {
//       title: "Pokhara Adventure & Lakeside Tour",
//       hours: "8 hours",
//       price: "$150",
//       img: Pokhara,
//     },
//     {
//       title: "Chitwan Jungle Safari",
//       hours: "2 days",
//       price: "$250",
//       img: Chitwan,
//     },
//     {
//       title: "Lumbini Buddhist Pilgrimage Tour",
//       hours: "1 day",
//       price: "$180",
//       img: Lumbini,
//     },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mt-6">
//       <h2 className="text-2xl font-semibold mb-4">Tour Packages</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {tours.map((t, i) => (
//           <div
//             key={i}
//             className="rounded-xl overflow-hidden shadow-sm bg-white"
//           >
//             <img src={t.img} className="h-40 w-full object-cover" />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">{t.title}</h3>
//               <p className="text-gray-600 text-sm mt-1">{t.hours}</p>

//               <div className="flex items-center justify-between mt-3">
//                 <p className="text-blue-600 font-semibold">{t.price}</p>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { getToursByGuide } from "../../../services/guideData";

export default function TourPackages({ guideId }) {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await getToursByGuide(guideId);
      if (res.success) setTours(res.data);
    };
    fetchTours();
  }, [guideId]);

  if (!tours.length) return <div className="mt-4 text-center">No tours found.</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Tour Packages</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tours.map((t) => (
          <div key={t.id} className="rounded-xl overflow-hidden shadow-sm bg-white">
            {/* Optional image if available */}
            {t.img && <img src={`data:image/*;base64,${t.img}`} className="h-40 w-full object-cover" />}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{t.duration || t.hours}</p>

              <div className="flex items-center justify-between mt-3">
                <p className="text-blue-600 font-semibold">${t.price}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

