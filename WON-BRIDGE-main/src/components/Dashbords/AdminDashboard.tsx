import InOutChart from "@/shared/components/DashboardUI/Charts/InOutChart";
import MissedEntriesChart from "@/shared/components/DashboardUI/Charts/MissedEntries";
import StatTiles from "@/shared/components/DashboardUI/Charts/StatTiles";
import MaterialInOutChart from "@/shared/components/DashboardUI/Charts/MaterialInOutChart";
import BackupStatusTile from "@/shared/components/DashboardUI/Charts/BackupStatusTile";

const AdminDashboard = () => {
  return (
    <div
      className="
      grid w-full gap-3
      grid-cols-1
      sm:grid-cols-2 pr-3
      lg:grid-cols-3 lg:grid-rows-2
      lg:h-[calc(100vh-80px)] 
    "
    >
      <div className="min-h-[250px]">
        <InOutChart />
      </div>

      <div className="min-h-[250px]">
        <MissedEntriesChart />
      </div>

      <div
        className="
        sm:col-span-2
        lg:col-span-1 lg:row-span-2
        min-h-[250px]
      "
      >
        <StatTiles />
      </div>

      <div className="min-h-[250px]">
        <MaterialInOutChart />
      </div>

      <div className="min-h-[250px]">
        <BackupStatusTile mode="online" />
      </div>
    </div>
  );
};

export default AdminDashboard;
