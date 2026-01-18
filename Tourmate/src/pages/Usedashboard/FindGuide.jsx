import { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../../components/FindGuide/FilterSidebar";
import GuideList from "../../components/FindGuide/GuideList";
import CONFIG from "../../../config";
import { toggleFavouriteGuide } from "../../services/guideData";

const FindGuide = () => {
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

  const [guides, setGuides] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch guides whenever filters change
  useEffect(() => {
    const fetchGuides = async () => {
      const token = localStorage.getItem("AUTH_TOKEN");
      try {
        const res = await axios.get(`${CONFIG.API_URL}/traveller/guides/filter`, {
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
          setGuides(res.data.data);
          setTotalPages(res.data.totalPages);
          console.log(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching guides:", err);
      }
    };
    fetchGuides();
  }, [filters]);

  // Favorite toggle handler
  const handleToggleFavourite = async (guideId) => {


    const res = await toggleFavouriteGuide(guideId);
    if (res.success) {
      setGuides((prev) =>
        prev.map((g) =>
          g.guideId === guideId ? { ...g, favorited: !g.favorited } : g
        )
      );
    }
    if (!res.success) {
      // Rollback if API fails
      setGuides((prev) =>
        prev.map((g) =>
          g.guideId === guideId ? { ...g, favorited: !g.favorited } : g
        )
      );
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setFilters({ ...filters, page: newPage });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <p className="text-2xl font-bold mb-6 text-gray-900">Find Your Perfect Guide</p>

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

      <div className="flex gap-6">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          <GuideList guides={guides} onToggleFavourite={handleToggleFavourite} />

          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 0}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-4 py-2 border border-gray-300 rounded-md font-medium ${i === filters.page ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => handlePageChange(i)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page + 1 >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindGuide;
