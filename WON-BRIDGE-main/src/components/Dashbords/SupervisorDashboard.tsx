import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { MdGroups2 } from "react-icons/md";

import DashTail1 from "@/shared/components/DashboardUI/Tiles/DashTail1";
import InOutChart from "@/shared/components/DashboardUI/Charts/InOutChart";
import MaterialInOutChart from "@/shared/components/DashboardUI/Charts/MaterialInOutChart";
import StatTiles from "@/shared/components/DashboardUI/Charts/StatTiles";
import { useEffect, useState } from "react";
import { getDailyActivityNums } from "@/services/dashboards/dashboards";

interface ActivityNumbers {
  total_in_entries: number;
  total_out_entries: number;
  missed_entries: number;
  operators_in_duty: number;
}

const SupervisorDashboard = () => {
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
  <div className="flex flex-col flex-1 min-h-0 w-full gap-3">

    {/* Top Stat Tiles */}
    <div className="grid gap-3
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3">
      <DashTail1
        title="In Entries"
        value={loading ? "..." : activity.total_in_entries}
      >
        <CiInboxIn />
      </DashTail1>

      <DashTail1
        title="Out Entries"
        value={loading ? "..." : activity.total_out_entries}
      >
        <CiInboxOut />
      </DashTail1>

      <DashTail1
        title="Operators On Duty"
        value={loading ? "..." : activity.operators_in_duty}
      >
        <MdGroups2 />
      </DashTail1>
    </div>

    {/* Charts Section */}
    <div
      className="grid flex-1 min-h-0 gap-3
                 grid-cols-1
                 md:grid-cols-2
                 xl:grid-cols-3
                 auto-rows-fr"
    >
      {/* Chart 1 */}
      <div className="h-full min-h-0 overflow-hidden">
        <InOutChart />
      </div>

      {/* Chart 2 */}
      <div className="h-full min-h-0 overflow-hidden">
        <MaterialInOutChart />
      </div>

      {/* Right Side - only span on xl */}
      <div className="h-full min-h-0 xl:row-span-2 overflow-hidden">
        <StatTiles />
      </div>
    </div>
  </div>
);
};

export default SupervisorDashboard;
