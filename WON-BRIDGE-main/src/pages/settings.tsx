import { useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { BiSliderAlt } from "react-icons/bi";
import { BiCloudUpload } from "react-icons/bi";
import { HiOutlineFingerPrint } from "react-icons/hi";
import { FaRoadBarrier } from "react-icons/fa6";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { AiFillPrinter } from "react-icons/ai";


import ConfigTabs from "@/components/setting-tabs/config-card";
import ConfigForm from "@/components/setting-tabs/config-form";

const AdminSettings = () => {
  const [activeConfig, setActiveConfig] = useState<string>("camara");
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  const onEdit = (id: string) => {
    console.log("Edit clicked for ID:", id);
    setActiveConfig(id);
    setFormIsOpen(true);
  };

  const onCloseForm = () => {
    setFormIsOpen(false);
  };
  return (
    <div className="bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg min-h-0">
      <div className="relative flex-1 h-full w-full flex flex-col min-h-0 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto max-h-full">


          <div className="flex flex-1">
            <ConfigTabs
              details={{
                id: "notifications",
                title: "Notifications",
                description: "",
                icon: <HiOutlineBell />
              }}
              edit={onEdit}
            />
          </div>

          <div className="flex flex-1">
            <ConfigTabs
              details={{
                id: "printer-meta",
                title: "Printer-Meta",
                description: "",
                icon: <AiFillPrinter />
              }}
              edit={onEdit}
            />
          </div>

          <div className="flex flex-1">
            <ConfigTabs
              details={{
                id: "threshold",
                title: "Threshold",
                description: "1Ton - 10Tons",
                icon: <BiSliderAlt />
              }}
              edit={onEdit}
            />
          </div>

          <div className="flex flex-1">
            <ConfigTabs
              details={{
                id: "backup",
                title: "Back-Up",
                description: "12 H",
                icon: <BiCloudUpload />
              }}
              edit={onEdit}
            />
          </div>

          <div className="flex flex-1">
            <ConfigTabs
              details={{
                id: "biometric",
                title: "Bio-Metric",
                description: "ON",
                icon: <HiOutlineFingerPrint />
              }}
              edit={onEdit}
            />
          </div>

          <div className="flex flex-1">
            <ConfigTabs
              details={{
                id: "barriergate",
                title: "Barrier Gates",
                description: "ON",
                icon: <FaRoadBarrier />
              }}
              edit={onEdit}
            />
          </div>

          <div className="flex flex-1">
            <ConfigTabs
              details={{
                id: "Alert Rules",
                title: "Alert Rules",
                description: "Operator application alert rules",
                icon: <TbAlertOctagonFilled />
              }}
              edit={onEdit}
            />
          </div>
        </div>

        <ConfigForm
          id={activeConfig}
          isOpen={formIsOpen}
          onClose={onCloseForm}
        />
      </div>
    </div>
  );
};

export default AdminSettings;
