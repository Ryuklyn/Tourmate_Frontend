"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendingUp } from "lucide-react";
import { getMonthlyRevenue } from "../../services/admin/dashboard";
import { Range, getTrackBackground } from "react-range";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fillMissingMonths(data) {
  if (!data || data.length === 0) return [];
  const parseLabel = (label) => {
    const [monthStr, yearStr] = label.split(" ");
    const month = new Date(`${monthStr} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr, 10);
    return { month, year };
  };

  const sortedData = [...data].sort((a, b) => {
    const da = parseLabel(a.label);
    const db = parseLabel(b.label);
    return new Date(da.year, da.month) - new Date(db.year, db.month);
  });

  const first = parseLabel(sortedData[0].label);
  const now = new Date();
  const last = { month: now.getMonth(), year: now.getFullYear() };

  const result = [];
  let curYear = first.year;
  let curMonth = first.month;

  while (curYear < last.year || (curYear === last.year && curMonth <= last.month)) {
    const label = `${monthNames[curMonth]} ${curYear}`;
    const existing = sortedData.find(d => d.label === label);
    result.push({ label, revenue: existing ? existing.revenue : 0 });

    curMonth++;
    if (curMonth > 11) {
      curMonth = 0;
      curYear++;
    }
  }

  return result;
}

export default function RevenueChart() {
  const chartRef = useRef(null);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMissingMonths, setShowMissingMonths] = useState(true);
  const [selectedYear, setSelectedYear] = useState("all");
  const [monthRange, setMonthRange] = useState([0, 11]);

  useEffect(() => {
    const fetchRevenue = async () => {
      const res = await getMonthlyRevenue();
      if (res.success) setRevenueData(res.data);
      setLoading(false);
    };
    fetchRevenue();
  }, []);

  const filteredData = useMemo(() => {
    if (selectedYear === "all") return revenueData;
    return revenueData.filter(d => d.label.endsWith(selectedYear));
  }, [revenueData, selectedYear]);

  const filledData = useMemo(() => showMissingMonths ? fillMissingMonths(filteredData) : filteredData, [filteredData, showMissingMonths]);

  useEffect(() => {
    if (filledData.length > 1) setMonthRange([0, filledData.length - 1]);
  }, [filledData]);

  const chartDataArray = useMemo(() => filledData.slice(monthRange[0], monthRange[1] + 1), [filledData, monthRange]);

  const totalRevenue = useMemo(() => chartDataArray.reduce((sum, r) => sum + r.revenue, 0), [chartDataArray]);
  const avgRevenue = useMemo(() => chartDataArray.length ? totalRevenue / chartDataArray.length : 0, [chartDataArray, totalRevenue]);
  const bestMonth = useMemo(() => {
    if (!chartDataArray.length) return "—";
    return chartDataArray.reduce((best, curr) => curr.revenue > best.revenue ? curr : best).label;
  }, [chartDataArray]);

  const data = useMemo(() => {
    if (!chartRef.current || !chartDataArray.length) return { labels: [], datasets: [] };
    const ctx = chartRef.current.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(249,115,22,0.35)");
    gradient.addColorStop(1, "rgba(249,115,22,0.05)");

    return {
      labels: chartDataArray.map(d => d.label),
      datasets: [
        {
          data: chartDataArray.map(d => d.revenue),
          borderColor: "#f97316",
          backgroundColor: gradient,
          tension: 0.45,
          fill: true,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 12,
        },
      ],
    };
  }, [chartDataArray]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "nearest", intersect: false, axis: "x" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: { label: (ctx) => `$${ctx.raw.toLocaleString()}` },
      },
    },
    scales: {
      y: {
        min: 0,
        suggestedMax: Math.max(...chartDataArray.map(d => d.revenue)) * 1.2,
        ticks: {
          callback: val => {
            if (val >= 1_000_000) return `$${(val/1_000_000).toFixed(1)}M`;
            if (val >= 1_000) return `$${(val/1_000).toFixed(0)}k`;
            return `$${val}`;
          },
          color: "#6b7280",
        },
        grid: { color: "#f3f4f6" },
      },
      x: { ticks: { color: "#6b7280" }, grid: { display: false } },
    },
  };

  const years = useMemo(() => Array.from(new Set(revenueData.map(d => d.label.split(" ")[1]))).sort(), [revenueData]);

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Revenue Analytics</h3>
          <p className="text-sm text-gray-500">Monthly revenue performance</p>
        </div>
        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <TrendingUp size={16}/> Live
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-6 mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showMissingMonths} onChange={e => setShowMissingMonths(e.target.checked)} className="h-4 w-4 text-orange-500 border-gray-300 rounded"/>
          <span className="text-gray-700 text-sm font-medium">Show missing months</span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-sm font-medium">Year:</span>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500">
            <option value="all">All</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Month Range Slider */}
      {filledData.length > 1 && (
        <div className="my-4">
          <p className="text-gray-700 text-sm font-medium mb-2">Select Month Range:</p>
          <Range
            values={monthRange}
            step={1}
            min={0}
            max={filledData.length - 1}
            onChange={setMonthRange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "8px",
                  width: "100%",
                  background: getTrackBackground({
                    values: monthRange,
                    colors: ["#ddd", "#f97316", "#ddd"],
                    min: 0,
                    max: filledData.length - 1,
                  }),
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div {...props} className="h-5 w-5 bg-orange-500 rounded-full shadow-lg border-2 border-white"/>
            )}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {filledData.map((d, i) => (
              <span key={i} className="flex-1 text-center">{d.label.split(" ")[0]}</span>
            ))}
          </div>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-lg font-semibold">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Avg / Month</p>
          <p className="text-lg font-semibold">${avgRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Best Month</p>
          <p className="text-lg font-semibold">{bestMonth}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Loading revenue data…
          </div>
        ) : (
          <Line ref={chartRef} data={data} options={options}/>
        )}
      </div>
    </div>
  );
}
