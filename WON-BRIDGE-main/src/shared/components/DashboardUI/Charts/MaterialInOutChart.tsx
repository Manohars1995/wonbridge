import { Bar } from "react-chartjs-2";
import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from "chart.js";
import { ReactSelect } from "@/components/UIElements/Input-Elements/Input-tags";
import { getMaterialInOutStock } from "@/services/dashboards/dashboards";
import ChartSkeleton from "@/components/UI/SkeletonLoaders/chart-skeleton";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

// ---------------- TYPES ----------------

type MaterialItem = {
  product: string;
  in_stock: number;
  out_stock: number;
};

type MonthlyWeek = {
  week: string;
  data: MaterialItem[];
};

type StockData = {
  daily: MaterialItem[];
  weekly: MaterialItem[];
  monthly: MonthlyWeek[];
};

type ChartItem = {
  name: string;
  in_stock: number;
  out: number;
};

type ViewKey = "daily" | "weekly" | "monthly";

type OptionType = {
  label: string;
  value: ViewKey;
};

// ---------------- OPTIONS ----------------

const viewOptions: OptionType[] = [
  { label: "Today", value: "daily" },
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" }
];

const colorMap: Record<string, string> = {
  Cement: "#f97316",
  Sand: "#3b82f6",
  Steel: "#10b981"
};

// ---------------- COMPONENT ----------------

const MaterialInOutChart = () => {
  const [view, setView] = useState<OptionType>(viewOptions[0]);
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState<StockData | null>(null);

  // -------- FETCH --------

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getMaterialInOutStock();
        const apiData: StockData | undefined = res?.data?.data;

        if (apiData) {
          setStock(apiData);
        } else {
          setStock(null);
        }
      } catch (error) {
        console.error("Material fetch error:", error);
        setStock(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------- NORMALIZE --------

  const currentData: ChartItem[] = useMemo(() => {
    if (!stock) return [];

    if (view.value === "monthly") {
      if (!Array.isArray(stock.monthly)) return [];

      const merged: Record<string, ChartItem> = {};

      stock.monthly.forEach((week) => {
        if (!Array.isArray(week?.data)) return;

        week.data.forEach((item) => {
          if (!merged[item.product]) {
            merged[item.product] = {
              name: item.product,
              in_stock: 0,
              out: 0
            };
          }

          merged[item.product].in_stock += item.in_stock ?? 0;
          merged[item.product].out += item.out_stock ?? 0;
        });
      });

      return Object.values(merged);
    }

    const list = stock[view.value];
    if (!Array.isArray(list)) return [];

    return list.map((item) => ({
      name: item.product,
      in_stock: item.in_stock ?? 0,
      out: item.out_stock ?? 0
    }));
  }, [stock, view]);

  // -------- CHART DATA --------

  const chartData = useMemo(() => {
    const labels = currentData.map((item) => item.name);

    return {
      labels,
      datasets: [
        {
          label: "In Stock",
          data: currentData.map((item) => item.in_stock),
          backgroundColor: currentData.map(
            (item) => colorMap[item.name] || "#22c55e"
          ),
          stack: "stack1",
          borderRadius: 8
        },
        {
          label: "Out",
          data: currentData.map((item) => item.out),
          backgroundColor: "#9ca3af",
          stack: "stack1",
          borderRadius: 8
        }
      ]
    };
  }, [currentData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#4B5563",
          boxWidth: 16,
          boxHeight: 6,
          padding: 20
        }
      },
      tooltip: { mode: "index" as const, intersect: false }
    },
    scales: {
      x: { stacked: true },
      y: { beginAtZero: true, stacked: true }
    }
  };

  return (
    <div className="bg-black/5 flex flex-col justify-between p-2 h-full min-h-0 rounded-xl w-full">
      {loading ? (
        <>
          <ChartSkeleton />
        </>
      ) : (
        <>
          <div className="flex justify-between items-start mb-3 h-13 ">
            <h2 className="text-lg font-bold">Material In/Out Stock</h2>
            <div className="w-36">
              <ReactSelect
                id="entry_view"
                label=""
                value={view}
                options={viewOptions}
                validators={[]}
                onChange={(val: string, isValid: boolean) => {
                  if (!isValid) return;
                  const selected = viewOptions.find((opt) => opt.value === val);
                  if (selected) setView(selected);
                }}
              />
            </div>
          </div>

          <Bar data={chartData} options={options} />
        </>
      )}
    </div>
  );
};

export default React.memo(MaterialInOutChart);
