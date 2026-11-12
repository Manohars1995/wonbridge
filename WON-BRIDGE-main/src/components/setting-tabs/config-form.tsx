import { useContext, useEffect, useState } from "react";

import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import CameraForm from "@/components/forms/config-forms/camera-form";
import ThresholdForm from "@/components/forms/config-forms/threshold-form";
import NotificationsForm from "@/components/forms/config-forms/notifications-form";
import BackUpForm from "@/components/forms/config-forms/back-up-form";
import AlertRulesForm from "@/components/forms/config-forms/alertRules-form";
import PrinterForm from "../forms/config-forms/printer-meta";

import { WonBridgeContext } from "@/store/WonBridge-Context";
import { getSettingsData } from "@/services/admin/admin";
import Loader from "@/components/UI/SkeletonLoaders/Loader";

interface AlertRule {
  id: number;
  code: string;
  name: string;
  description: string;
  min_value: number | null;
  max_value: number | null;
  severity: "critical" | "warning" | "info";
  enabled: boolean;
}

interface ThresholdLimit {
  min: number;
  max: number;
}

interface PrinterMeta {
  short_address: string;
  weighbridgecap: string;
}

interface Settings {
  backup_schedule_preference: string;
  threshold: boolean;
  threshold_limit: ThresholdLimit;
  alert_rules: AlertRule[];
  printer_meta: PrinterMeta;
}

interface ConfigProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const ConfigForm = ({ id, isOpen, onClose }: ConfigProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({
    backup_schedule_preference: "",
    threshold: false,
    threshold_limit: { min: 0, max: 0 },
    alert_rules: [],
    printer_meta: { short_address: "", weighbridgecap: "" }
  });

  const { userID } = useContext(WonBridgeContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getSettingsData(userID);
      const data = res?.data?.data;
      console.log("Fetched settings data:", data);

      if (data) {
        setSettings({
          backup_schedule_preference: data.backup_schedule_preference || "",
          threshold: data.threshold ?? false,
          threshold_limit: data.threshold_limit || { min: 0, max: 0 },
          alert_rules: data.alert_rules || [],
          printer_meta: {
            short_address: data?.short_address || "",
            weighbridgecap: data?.weighbridgecap || ""
          }
        });
      }
    } catch (err) {
      console.error("❌ Error fetching settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav
      className={`z-[100] flex flex-col justify-between absolute top-0 p-3 overflow-hidden
    ${isOpen ? "right-0" : "-right-6"}
    h-full bg-[var(--background-secondary)] rounded-lg shadow-lg transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "translate-x-full"}
    w-full sm:w-[20rem] md:w-[24rem] lg:w-[28rem]
  `}
    >
      <RightTabHeader onClose={onClose}>Configure - {id}</RightTabHeader>

      <div className="overflow-y-auto flex flex-1 h-[85%] p-2">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {id === "camera" && <CameraForm />}
            {id === "notifications" && (
              <NotificationsForm settings={settings} />
            )}
            {id === "printer-meta" && (
              <PrinterForm settings={settings.printer_meta} />
            )}
            {id === "threshold" && <ThresholdForm settings={settings} />}
            {id === "backup" && <BackUpForm settings={settings} />}
            {id === "Alert Rules" && (
              <AlertRulesForm rules={settings?.alert_rules || []} />
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default ConfigForm;
