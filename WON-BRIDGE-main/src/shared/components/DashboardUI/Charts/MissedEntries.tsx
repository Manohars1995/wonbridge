import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartData
} from "chart.js";
import React, { useCallback, useEffect, useState } from "react";

import { ReactSelect } from "@/components/UIElements/Input-Elements/Input-tags";
import { getMissedEntriesData } from "@/services/dashboards/dashboards";
import ChartSkeleton from "@/components/UI/SkeletonLoaders/chart-skeleton";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// --- Types ---
type ViewKey = "daily" | "weekly" | "monthly";

type OptionType = {
  label: string;
  value: ViewKey;
};

type ApiData = {
  labels: string[];
  data: number[];
};

const viewOptions: OptionType[] = [
  { label: "Today", value: "daily" },
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" }
];

const MissedEntriesChart = () => {
  const [view, setView] = useState<OptionType>(viewOptions[0]);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(false);

  const fetchMissedEntriesData = useCallback(async (viewType: ViewKey) => {
    setLoading(true);
    try {
      const res = await getMissedEntriesData();
      if (
        res?.data?.success &&
        res.data.data &&
        res.data.data[viewType]?.labels &&
        res.data.data[viewType]?.data
      ) {
        const apiData: ApiData = res.data.data[viewType];
        setChartData({
          labels: apiData.labels,
          datasets: [
            {
              label: "Missed Entries",
              data: apiData.data,
              backgroundColor: "#f87171",
              borderRadius: 8
            }
          ]
        });
      } else {
        throw new Error("Incomplete API data");
      }
    } catch (err) {
      console.error("Error fetching missed entries:", err);
      setChartData({
        labels: [],
        datasets: []
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMissedEntriesData(view.value);
  }, [view, fetchMissedEntriesData]);

  return (
    <div className="bg-black/5 flex flex-col justify-between p-2 rounded-2xl shadow w-full ">
      {loading ? (
        <ChartSkeleton />
      ) : (
        <>
          <div className="flex justify-between items-start mb-3 h-11 ">
            <h2 className="text-lg font-bold">Missed Entries</h2>
            <div className="w-36">
              <ReactSelect
                id="entry_view"
                label=""
                value={view}
                options={viewOptions}
                validators={[]}
                onChange={(val: string, isValid: boolean) => {
                  const selected = viewOptions.find(
                    (v) => v.value === (val as ViewKey)
                  );
                  if (isValid && selected) setView(selected);
                }}
              />
            </div>
          </div>

          {!loading && (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => ` ${ctx.raw} missed`
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                  }
                }
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(MissedEntriesChart);
