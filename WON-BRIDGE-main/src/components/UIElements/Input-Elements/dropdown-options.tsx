import { useEffect, useState, useContext } from "react";
import { getAdminAsOptions } from "@/services/admin/admin";
import { WonBridgeContext } from "@/store/WonBridge-Context";

export const useOwnersOptions = () => {
  const { userRole } = useContext(WonBridgeContext);
  const [adminOptions, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [adminLoading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole !== "super_admin") {
      // Not authorized → return empty options
      setOptions([]);
      setLoading(false);
      return;
    }

    getAdminAsOptions()
      .then(setOptions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userRole]);

  return { adminOptions, adminLoading };
};
