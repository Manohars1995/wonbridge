import { useState, useContext } from "react";

import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { TbBellFilled } from "react-icons/tb";

import { WonBridgeContext } from "@/store/WonBridge-Context";
import SlideModal from "@/shared/components/UIElements/screens/notify/slider-modal";
import NotifyModal from "@/shared/components/UIElements/screens/notify/notifications";

const HeaderElement = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { activeTab, userDetails, setActiveTab } = useContext(
    WonBridgeContext
  ) as {
    activeTab: string;
    userDetails: { image: string; company_name: string; full_name: string };
    setActiveTab: (tab: string) => void;
  };

  const onProfile = () => {
    setActiveTab("profile");
    console.log("getting gsdfgasdf");
    navigate("/profile");
  };

  const onSettings = () => {
    setActiveTab("settings");
    navigate("/settings");
  };

  const onNotification = () => {
    setOpen(true);
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <button
        title="Settings"
        onClick={onSettings}
        className={`flex items-center justify-center w-10 h-10  rounded-2xl text-2xl cursor-pointer
        ${
          activeTab === "settings"
            ? "bg-[var(--activeBgColor)]"
            : "bg-[var(--border-secondary)]"
        }
        hover:bg-[var(--hover-primary)] hover:text-[var(--background-default)] group
      `}
      >
        <IoIosSettings className="transform transition-transform duration-1300 group-hover:rotate-[120deg]" />
      </button>

      <button
        title="Notifications"
        onClick={onNotification}
        className={`flex items-center justify-center w-10 h-10 rounded-2xl text-2xl cursor-pointer bg-[var(--border-secondary)]
        ${open && "bg-[var(--scrollbar-thumb-hover)]"}
        hover:bg-[var(--hover-primary)] hover:text-[var(--background-default)] group
      `}
      >
        <TbBellFilled className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:rotate-[10deg]" />
      </button>

      <button
        title="Profile"
        onClick={onProfile}
        className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-200 hover:bg-gray-300 cursor-pointer bg-cover bg-center border-2 border-[#ccc]"
        style={{
          backgroundImage: userDetails?.image
            ? `url(${userDetails.image})`
            : "none"
        }}
      >
        {!userDetails?.image && (
          <span className="text-2xl font-bold text-gray-700">
            {userDetails?.full_name?.charAt(0)?.toUpperCase() || "W"}
          </span>
        )}
      </button>

      <SlideModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Notifications"
      >
        <NotifyModal />
      </SlideModal>
    </div>
  );
};

export default HeaderElement;
