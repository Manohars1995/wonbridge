import PieChartWithCustomizedLabel from "../components/Dash-Charts/pie-chart";
import SameDataComposedChart from "../components/Dash-Charts/bar-composed-chart";
import AdminDashboard from "@/components/Dashbords/AdminDashboard";
import ManagerDashboard from "../components/Dashbords/ManagerDashboard";
import SupervisorDashboard from "../components/Dashbords/SupervisorDashboard";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import { useContext } from "react";

const Dashboard = () => {
  const { userRole } = useContext(WonBridgeContext);
  const isAdminRole = ["admin", "super_admin"].includes(userRole);
  return (
    <div className="bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg  ">
      <div className="h-full overflow-auto">
        {isAdminRole && <AdminDashboard />}
        {userRole === "manager" && <ManagerDashboard />}
        {userRole === "supervisor" && <SupervisorDashboard />}
        {/* <PieChartWithCustomizedLabel /> */}
        {/* <SameDataComposedChart /> */}
        {/* <PieChartWithCustomizedLabel /> */}
      </div>
    </div>
  );
};

export default Dashboard;
