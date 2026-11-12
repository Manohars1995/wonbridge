import { Bar } from "react-chartjs-2";
import React, { useCallback, useEffect, useState } from "react";
import { ReactSelect } from "@/components/UIElements/Input-Elements/Input-tags";
import { type OptionType } from "./utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from "chart.js";
import { getInOutData } from "@/services/dashboards/dashboards";
import ChartSkeleton from "@/components/UI/SkeletonLoaders/chart-skeleton";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const viewOptions: OptionType[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" }
];

type InOutResponse = {
  daily: ChartData<"bar">;
  weekly: ChartData<"bar">;
  monthly: ChartData<"bar">;
};

const InOutChart = () => {
  const [view, setView] = useState<OptionType>(viewOptions[0]);
  const [chartData, setChartData] = useState<InOutResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInOutData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getInOutData();

      if (res?.data?.success && res.data.data) {
        setChartData(res.data.data as InOutResponse);
      } else {
        setChartData(null);
      }
    } catch (err) {
      console.error("Error fetching In/Out data:", err);
      setChartData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInOutData();
  }, [fetchInOutData]);

  const selectedChartData = chartData?.[view.value];

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#4B5563",
          boxWidth: 16,
          boxHeight: 6,
          padding: 20,
          font: { size: 10 }
        }
      },
      tooltip: {
        backgroundColor: "#f3f4f6",
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        titleFont: { size: 12 },
        bodyFont: { size: 10 }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: { size: 10 }
        },
        grid: { color: "#f3f4f6" }
      },
      y: {
        ticks: {
          color: "#6b7280",
          font: { size: 10 }
        },
        grid: { color: "#f3f4f6" },
        beginAtZero: true
      }
    }
  };

  return (
    <div
      className="bg-black/5 flex flex-col p-2 rounded-2xl 
                  w-full h-full min-h-0 overflow-hidden"
    >
      {loading ? (
        <ChartSkeleton />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-start mb-3 shrink-0">
            <h2 className="text-lg font-bold">In/Out Entries</h2>

            <div className="w-36">
              <ReactSelect
                id="entry_view"
                label=""
                value={view}
                options={viewOptions}
                validators={[]}
                onChange={(val: string, isValid: boolean) => {
                  if (!isValid) return;
                  const selected = viewOptions.find((v) => v.value === val);
                  if (selected) setView(selected);
                }}
              />
            </div>
          </div>

          {/* Chart Container */}
          {selectedChartData ? (
            <div className="flex-1 min-h-0 relative">
              <Bar data={selectedChartData} options={options} />
            </div>
          ) : (
            <div className="flex items-center justify-center flex-1 min-h-0 text-gray-500 text-sm">
              No data available
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(InOutChart);
