import { useEffect, useState } from "react";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { MdCallMissed, MdGroups2 } from "react-icons/md";

import DashTail1 from "@/shared/components/DashboardUI/Tiles/DashTail1";
import InOutChart from "@/shared/components/DashboardUI/Charts/InOutChart";
import MaterialInOutChart from "@/shared/components/DashboardUI/Charts/MaterialInOutChart";
import StatTiles from "@/shared/components/DashboardUI/Charts/StatTiles";
import MissedEntriesList from "@/shared/components/DashboardUI/Tiles/MissedEntriesList";
import { getDailyActivityNums } from "@/services/dashboards/dashboards";

interface ActivityNumbers {
  total_in_entries: number;
  total_out_entries: number;
  missed_entries: number;
  operators_in_duty: number;
}

const ManagerDashboard = () => {
  const [activity, setActivity] = useState<ActivityNumbers>({
    total_in_entries: 0,
    total_out_entries: 0,
    missed_entries: 0,
    operators_in_duty: 0
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getDailyActivityNums();

      if (res?.data?.success) {
        setActivity(res.data.data);
      }
    } catch (err) {
      console.error("Dashboard activity fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="flex flex-col w-full gap-4 
                  min-h-[calc(100vh-4rem)] 
                  lg:h-full"
    >
      {/* Top Tiles */}
      <div
        className="grid gap-4
                    grid-cols-1 
                    sm:grid-cols-2 
                    xl:grid-cols-4"
      >
        <DashTail1
          title="In Entries"
          value={loading ? "..." : activity.total_in_entries}
        >
          <CiInboxIn size={22} />
        </DashTail1>

        <DashTail1
          title="Out Entries"
          value={loading ? "..." : activity.total_out_entries}
        >
          <CiInboxOut size={22} />
        </DashTail1>

        <DashTail1
          title="Missed Entries"
          value={loading ? "..." : activity.missed_entries}
        >
          <MdCallMissed size={22} />
        </DashTail1>

        <DashTail1
          title="Operators On Duty"
          value={loading ? "..." : activity.operators_in_duty}
        >
          <MdGroups2 size={22} />
        </DashTail1>
      </div>

      {/* Main Grid */}
      <div
        className="grid gap-4 flex-1
                 grid-cols-1
                 md:grid-cols-2
                 xl:grid-cols-3
                 auto-rows-[minmax(250px,1fr)]
                 lg:auto-rows-fr"
      >
        <div className="h-full min-h-0 overflow-hidden">
          <InOutChart />
        </div>

        <div className="h-full min-h-0 overflow-hidden">
          <MaterialInOutChart />
        </div>

        <div className="h-full min-h-0 xl:row-span-2 overflow-hidden">
          <StatTiles />
        </div>

        <div className="h-full min-h-0 overflow-auto">
          <MissedEntriesList />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
