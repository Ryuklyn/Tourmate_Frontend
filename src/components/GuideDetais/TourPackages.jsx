import React from "react";

const tours = [
  {
    title: "Gothic Quarter Walking Tour",
    price: "$135",
    image: "https://images.unsplash.com/photo-1584956868903-4ca1c1a1599a",
  },
  {
    title: "Barcelona Food & Culture Experience",
    price: "$180",
    image: "https://images.unsplash.com/photo-1604908177522-0403d19ad32d",
  },
  {
    title: "Modernist Architecture Tour",
    price: "$225",
    image: "https://images.unsplash.com/photo-1573997883791-5e07dc1c0d8b",
  },
];

const TourPackages = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Tour Packages</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <div
            key={tour.title}
            className="border rounded-lg overflow-hidden shadow-sm bg-white"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-medium">{tour.title}</h4>
              <p className="text-blue-600 font-semibold mt-1">{tour.price}</p>
              <button className="bg-blue-600 text-white w-full mt-3 py-2 rounded-md hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourPackages;
