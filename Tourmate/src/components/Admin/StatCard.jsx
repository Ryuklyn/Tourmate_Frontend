import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ icon, title, value, percentage }) {
  const isNegative = percentage?.includes("-");
  const TrendIcon = isNegative ? TrendingDown : TrendingUp;

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
      {/* Top Row: Icon + Percentage Box */}
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="text-orange-500 bg-orange-100 p-3 rounded-xl">
          {icon}
        </div>

        {/* Percentage Box */}
        {percentage && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium 
              ${
                isNegative
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }
            `}
          >
            <TrendIcon size={16} />
            <span>{percentage.replace("+", "").replace("-", "")}%</span>
          </div>
        )}
      </div>

      {/* Title */}
      <p className="mt-4 text-sm text-gray-500">{title}</p>

      {/* Value */}
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}
