import { useContext, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { showToast } from "@/components/UI/toast";
import { updateBackupSchedule } from "@/services/admin/admin";
import { WonBridgeContext } from "@/store/WonBridge-Context";

const backupOptions = [
  { label: "6 Hours", value: "6h" },
  { label: "12 Hours", value: "12h" },
  { label: "24 Hours", value: "24h" },
  { label: "When Online", value: "online" }
];

const BackUpForm = ({
  settings
}: {
  settings: { backup_schedule_preference: string };
}) => {
  const [activeBackup, setActiveBackup] = useState<string>("6h");
  const { userID } = useContext(WonBridgeContext);

  useEffect(() => {
    if (settings?.backup_schedule_preference) {
      setActiveBackup(settings.backup_schedule_preference);
    }
  }, [settings?.backup_schedule_preference]);

  const sendDebouncedApi = async (value: string) => {
    try {
      const res = await updateBackupSchedule(userID, { value });
      if (res?.data?.success) {
        showToast.success("Updated");
      } else {
        showToast.error("Update failed");
      }
    } catch (err) {
      console.error("❌ API error:", err);
      showToast.error("Failed to update.");
    }
  };

  const onChangeHandler = async (value: string) => {
    setActiveBackup(value);
    sendDebouncedApi(value);
  };

  const BackupCard = ({ label, value }: { label: string; value: string }) => (
    <div className="h-fit p-3 flex flex-col gap-2 rounded-2xl shadow-sm bg-[var(--background-default)]">
      <div className="flex gap-3 items-center">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="backup"
            value={value}
            checked={activeBackup === value}
            onChange={() => onChangeHandler(value)}
            className="peer hidden"
          />
          <div className="w-6 h-6 border-4 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-100 rounded-full transition" />
        </label>
        <h3>{label}</h3>
      </div>
    </div>
  );

  return (
    <div className="w-full h-fit grid grid-cols-2 gap-3">
      {backupOptions.map((option) => (
        <BackupCard
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </div>
  );
};

export default BackUpForm;
