export default function RecentBookings() {
  const data = [
    {
      tour: "Rome Historical Tour",
      name: "Sarah Wilson",
      date: "Dec 15, 2024",
      price: "$450",
      status: "Confirmed",
    },
    {
      tour: "Tokyo Food Adventure",
      name: "James Chen",
      date: "Dec 18, 2024",
      price: "$320",
      status: "Pending",
    },
    {
      tour: "Paris Art Walk",
      name: "Emma Davis",
      date: "Dec 20, 2024",
      price: "$280",
      status: "Confirmed",
    },
    {
      tour: "Barcelona Architecture",
      name: "Alex Murphy",
      date: "Dec 22, 2024",
      price: "$390",
      status: "Cancelled",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* <h3 className="font-semibold text-lg">Recent Bookings</h3>
        <p className="font-medium text-gray-200">Latest tour reservations</p> */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900">
            Recent Bookings
          </h3>
          <p className="text-sm text-gray-500 -mt-1">
            Latest tour reservations
          </p>
        </div>

        <button className="text-red-400 text-sm font-medium hover:underline">
          View all
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-center hover:bg-gray-100 transition"
          >
            {/* Left Section */}
            <div>
              <p className="font-semibold text-gray-800">{item.tour}</p>
              <p className="text-sm text-gray-600 mt-1">
                {item.name} • {item.date}
              </p>
            </div>

            {/* Right Section */}
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">
                {item.price}
              </p>

              <span
                className={`px-2 py-1 text-xs font-medium rounded-full inline-block mt-1
                  ${
                    item.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }
                `}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
