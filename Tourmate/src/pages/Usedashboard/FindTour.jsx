import axios from "axios";
import { useEffect, useState } from "react";
import FilterSidebar from "../../components/FindGuide/FilterSidebar";
import GuideList from "../../components/FindGuide/GuideList";
import CONFIG from "../../../config";
import FilterSidebarTour from "../../components/FindTour/FilterSidebarTour";
import TourList from "../../components/FindTour/TourList";
import { toggleFavouriteTour } from "../../services/tour/tourData";

const FindTour = () => {
  const [filters, setFilters] = useState({
    search: "",
    minPrice: 0,
    maxPrice: 100000,
    rating: 0,
    languages: [],
    categories: [],
    page: 0,
    size: 10,
    sortBy: "price",
    sortDir: "asc",
  });

  const [tours, setTours] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const handleToggleFavourite = async (id) => {
    const res = await toggleFavouriteTour(id);
    if (res.success) {
      setTours((prev) =>
        prev.map((tour) =>
          tour.id === id ? { ...tour, favorited: !tour.favorited } : tour
        )
      );
    }
  };
  // Fetch guides whenever filters change
  useEffect(() => {
    const fetchTours = async () => {
      const token = localStorage.getItem("AUTH_TOKEN");
      try {
        const res = await axios.get(`${CONFIG.API_URL}/traveller/tours`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            search: filters.search,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            category: filters.categories,
            language: filters.languages,
            page: filters.page,
            size: filters.size,
            sortBy: filters.sortBy,
            sortDir: filters.sortDir,
            rating: filters.rating,

          },
        });
        if (res.data.status === "success") {
          setTours(res.data.data);
          setTotalPages(res.data.totalPages);
          console.log(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
    fetchTours();
  }, [filters]);
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Title */}
      <p className="text-2xl font-bold mb-6 text-gray-900">
        Find Your Perfect Tour
      </p>

      {/* Search & Sort Bar */}
      <div className="flex items-center justify-between py-3 mb-6">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 0 })}
          placeholder="Search by location, guide name, or specialty..."
          className="flex-1 border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-4"
        />
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value, page: 0 })}
          className="border border-gray-200 px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
        <select
          value={filters.sortDir}
          onChange={(e) => setFilters({ ...filters, sortDir: e.target.value, page: 0 })}
          className="border border-gray-200 px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        <FilterSidebarTour filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          <TourList tours={tours} onToggleFavourite={handleToggleFavourite} />

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-10">

            {/* Previous */}
            <button
              disabled={filters.page === 0}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className={`px-4 py-2 border rounded-md transition
    ${filters.page === 0
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: index,
                  }))
                }
                className={`px-4 py-2 border rounded-md transition
      ${filters.page === index
                    ? "bg-blue-600 text-white border-blue-600 font-medium"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={filters.page === totalPages - 1}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className={`px-4 py-2 border rounded-md transition
    ${filters.page === totalPages - 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
export default FindTour;
