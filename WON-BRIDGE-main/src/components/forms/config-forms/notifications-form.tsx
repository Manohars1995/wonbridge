import { useContext, useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import { updateNotifyStatus } from "@/services/admin/admin";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import { showToast } from "@/components/UI/toast";

interface NotificationSettings {
  threshold: boolean;
}

const NotificationsForm = ({
  settings
}: {
  settings: NotificationSettings;
}) => {
  const { userID } = useContext(WonBridgeContext);

  const [notificationOptions, setNotificationOptions] =
    useState<NotificationSettings>({
      threshold: false
    });

  useEffect(() => {
    if (settings) {
      setNotificationOptions({
        threshold: settings?.threshold ?? false
      });
    }
  }, [settings]);

  const sendDebouncedApi = async (
    key: keyof NotificationSettings,
    value: boolean
  ) => {
    try {
      const res = await updateNotifyStatus(userID, { key, value });
      if (res?.data?.success) {
        showToast.success("Updated");
      }
    } catch (err) {
      console.error("❌ API error:", err);
      showToast.error("Failed to update.");
    }
  };

  const onChangeHandler = (key: keyof NotificationSettings, val: boolean) => {
    setNotificationOptions((prev) => ({
      ...prev,
      [key]: val
    }));
    sendDebouncedApi(key, val);
  };

  const CheckboxCard = ({
    label,
    name,
    checked
  }: {
    label: string;
    name: keyof NotificationSettings;
    checked: boolean;
  }) => (
    <div className="h-fit p-3 flex flex-col gap-2 rounded-2xl shadow-sm bg-[var(--background-default)]">
      <div className="flex gap-3 items-center">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={(e) => onChangeHandler(name, e.target.checked)}
            className="peer hidden"
          />
          <div className="w-6 h-6 border-4 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-100 rounded-lg transition" />
        </label>
        <h3>{label}</h3>
      </div>
    </div>
  );

  return (
    <div className="w-full grid grid-cols-2 gap-3 p-3">
      <CheckboxCard
        label="Threshold Alerts"
        name="threshold"
        checked={notificationOptions.threshold}
      />
    </div>
  );
};

export default NotificationsForm;
