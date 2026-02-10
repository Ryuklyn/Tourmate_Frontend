import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { displayName } from "../../services/enumFormatter";
import api from "../../utils/axiosInterceptor";


const FilterSidebar = ({ filters, setFilters }) => {
  const [languagesEnum, setLanguagesEnum] = useState([]);
  const [categoriesEnum, setCategoriesEnum] = useState([]);

  // Fetch enums from backend

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const [langsRes, catsRes] = await Promise.all([
          api.get("/user/enums/languages"),
          api.get("/user/enums/categories"),
        ]);

        setLanguagesEnum(langsRes.data);   // ["ENGLISH", "NEPALI", ...]
        setCategoriesEnum(catsRes.data);   // ["CITY_TOUR", "FOOD_TOUR", ...]
      } catch (err) {
        console.error("Failed to fetch enums", err);
      }
    };
    fetchEnums();
  }, []);

  const handleStarClick = (rating) => {
    setFilters({ ...filters, rating, page: 0 });
  };

  const toggleItem = (item, listName) => {
    const list = filters[listName];
    const updated = list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
    setFilters({ ...filters, [listName]: updated, page: 0 });
  };

  return (
    <div className="w-64 bg-white rounded-2xl shadow-md p-5 h-fit">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Filters</h3>

      {/* Price Range */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Number(e.target.value), page: 0 })
            }
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Min $"
          />
          <input
            type="number"
            min={filters.minPrice}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value), page: 0 })
            }
            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Max $"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          ${filters.minPrice} - ${filters.maxPrice}/hour
        </p>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Star
              key={rating}
              size={22}
              className={`cursor-pointer transition-colors duration-200 ${rating <= filters.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              onClick={() => handleStarClick(rating)}
            />
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-5">
        <h4 className="font-medium mb-2 text-gray-800">Languages</h4>
        {languagesEnum.map((lang) => (
          <label key={lang} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filters.languages.includes(lang)}
              onChange={() => toggleItem(lang, "languages")}
              className="accent-blue-500"
            />
            <span className="text-sm text-gray-700">{displayName(lang)}</span>
          </label>
        ))}
      </div>

      {/* Categories */}
      <div className="mb-5">
        <h4 className="font-medium mb-2 text-gray-800">Tour Types</h4>
        {categoriesEnum.map((cat) => (
          <label key={cat} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => toggleItem(cat, "categories")}
              className="accent-blue-500"
            />
            <span className="text-sm text-gray-700">{displayName(cat)}</span>
          </label>
        ))}
      </div>

      <button
        className="mt-4 text-sm text-blue-600 hover:underline"
        onClick={() =>
          setFilters({
            ...filters,
            location: "",
            minPrice: 0,
            maxPrice: 100000,
            rating: 0,
            languages: [],
            categories: [],
            page: 0,
          })
        }
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
