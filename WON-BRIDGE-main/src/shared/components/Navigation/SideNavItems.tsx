import { RiHome6Line } from "react-icons/ri";
import { LuCrown, LuBriefcaseBusiness, LuLogs } from "react-icons/lu";
import { FaUsersGear } from "react-icons/fa6";
import { PiUserListBold } from "react-icons/pi";
import { GiMineTruck } from "react-icons/gi";
import { MdTimeline } from "react-icons/md";
import { MdHistory } from "react-icons/md";

const navItems = [
  { key: "dashboard", icon: RiHome6Line, nav: "/dashboard" },
  { key: "admins", icon: LuCrown, nav: "/admins" },
  { key: "managers", icon: LuBriefcaseBusiness, nav: "/managers" },
  { key: "staff", icon: FaUsersGear, nav: "/staff" },
  { key: "customers", icon: PiUserListBold, nav: "/customers" },
  { key: "suppliers", icon: GiMineTruck, nav: "/suppliers" },
  { key: "Logs", icon: LuLogs, nav: "/logs" },
  {
    key: "Transit History",
    icon: MdTimeline,
    nav: (id?: string) => `/transit-history/${id ?? ""}`
  },
  {
    key: "Weighment History",
    icon: MdHistory,
    nav: (id?: string) => `/weighments/${id ?? ""}`
  }
];

export default navItems;
