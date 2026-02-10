"use client";

import { useMemo, useRef } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

export default function RevenueChart() {
  const chartRef = useRef(null);

  const revenueData = [42000, 38000, 52000, 61000, 58000, 69000, 74500];

  const data = useMemo(() => {
    const chart = chartRef.current;
    if (!chart) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(249,115,22,0.35)");
    gradient.addColorStop(1, "rgba(249,115,22,0.05)");

    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          data: revenueData,
          borderColor: "#f97316",
          backgroundColor: gradient,
          tension: 0.45,
          fill: true,
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [revenueData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (ctx) => `$${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (val) => `$${val / 1000}k`,
          color: "#6b7280",
        },
        grid: { color: "#f3f4f6" },
      },
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Revenue Analytics</h3>
          <p className="text-sm text-gray-500">Monthly revenue performance</p>
        </div>

        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <TrendingUp size={16} />
          +18.7%
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-lg font-semibold">$284,500</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Avg / Month</p>
          <p className="text-lg font-semibold">$47,400</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Best Month</p>
          <p className="text-lg font-semibold">July</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
