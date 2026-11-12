import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BiLogOutCircle } from "react-icons/bi";

import { WonBridgeContext } from "@/store/WonBridge-Context";
import navItems from "./SideNavItems";
import ConfirmModal from "@/components/UI/Modals/ConfirmModal";

const Sidenav = () => {
  const { userRole, logoutHandler } = useAuth();
  const navigate = useNavigate();

  const { activeTab, userID, setActiveTab } = useContext(WonBridgeContext);

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const roleAccessMap: Record<string, string[]> = {
    super_admin: [
      "dashboard",
      "admins",
      "managers",
      "staff",
      "customers",
      "suppliers",
      "Logs"
    ],
    admin: [
      "dashboard",
      "managers",
      "staff",
      "customers",
      "suppliers",
      "Logs",
      "Transit History",
      "Weighment History"
    ],
    manager: ["dashboard", "staff", "customers"],
    supervisor: ["dashboard", "customers", "suppliers", "operators"]
  };

  console.log(userRole,'wfbsdhvbsdhgvhdfgvd')

  const allowedTabs = roleAccessMap[userRole] || [];

  const filteredNavItems = navItems.filter(({ key }) =>
    allowedTabs.includes(key)
  );

  const handleLogoutClick = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = useCallback(async () => {
    try {
      await logoutHandler(); // supports async logout
      setShowLogoutModal(false);
      navigate("/"); // ensure redirect if logoutHandler doesn't
    } catch (error) {
      console.error("Logout failed:", error);
      setShowLogoutModal(false);
    }
  }, [logoutHandler, navigate]);

  const cancelLogout = useCallback(() => {
    setShowLogoutModal(false);
  }, []);

  return (
    <div className="flex flex-col relative flex-1 h-screen p-1 overflow-y-auto">
      <div>
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center justify-center h-16 mb-10 cursor-pointer"
        >
          <img
            src="https://efftabs.com/wp-content/uploads/2017/07/MostovaPC.png"
            alt="Logo"
          />
        </div>

        <ul className="p-1">
          {filteredNavItems.map(({ key, icon: Icon, nav }) => {
            const isActive = activeTab === key;
            const isHovered = hoveredTab === key;

            const backgroundColor = isActive
              ? "var(--activeBgColor)"
              : isHovered
                ? "var(--hover-primary)"
                : "transparent";

            const iconColor = isHovered
              ? "var(--background-default)"
              : isActive
                ? "var(--primary-main)"
                : "var(--text-secondary)";

            return (
              <li
                key={key}
                onClick={() => {
                  setActiveTab(key);

                  let route = "";

                  if (typeof nav === "function") {
                    if (!userID) {
                      console.error("Required ID missing");
                      return;
                    }
                    route = nav(userID);
                  } else {
                    route = nav;
                  }

                  navigate(route);
                }}
                onMouseEnter={() => setHoveredTab(key)}
                onMouseLeave={() => setHoveredTab(null)}
                title={key}
                className="flex justify-center text-3xl my-3 p-2 rounded-2xl transition-all duration-200"
                style={{
                  backgroundColor,
                  cursor: "pointer"
                }}
              >
                <Icon
                  className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
                  style={{ color: iconColor }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        aria-label="signout"
        title="signout"
        type="button"
        onClick={handleLogoutClick}
        className="cursor-pointer absolute bottom-10 left-1/2 transform text-[#ef233c] -translate-x-1/2 bg-[#ccc] p-2 rounded-full text-3xl"
      >
        <BiLogOutCircle />
      </button>

      {showLogoutModal && (
        <ConfirmModal
          title="Confirm Logout"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        >
          <p>Are you sure you want to logout?</p>
        </ConfirmModal>
      )}
    </div>
  );
};

export default Sidenav;
