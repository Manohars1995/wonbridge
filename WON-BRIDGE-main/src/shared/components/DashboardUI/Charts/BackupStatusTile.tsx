import { FaCloud, FaSyncAlt } from "react-icons/fa";
import dayjs from "dayjs";
import React, { useEffect, useState, useCallback } from "react";
import { getLatestBackupTimestamp } from "@/services/dashboards/dashboards";

type BackupMode = "interval" | "online";

interface BackupStatusProps {
  intervalHours?: number;
  mode: BackupMode;
}

const BackupStatusTile = ({ intervalHours, mode }: BackupStatusProps) => {
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLastBackup = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getLatestBackupTimestamp();

      // expected response: { last_backup_time: string | null }
      setLastBackup(res?.data?.last_backup_time ?? null);
    } catch (err: any) {
      console.error("Failed to fetch backup timestamp:", err);
      setError("Failed to fetch backup info");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLastBackup();
  }, [fetchLastBackup]);

  useEffect(() => {
    const interval = setInterval(fetchLastBackup, 30000);
    return () => clearInterval(interval);
  }, [fetchLastBackup]);

  const last = lastBackup ? dayjs(lastBackup) : null;
  const next = last && intervalHours ? last.add(intervalHours, "hour") : null;

  return (
    <div className="bg-black/5 rounded-xl w-full">
      <div className="rounded-xl shadow h-full flex flex-col px-5 py-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <FaSyncAlt className="text-blue-500 text-lg" />
          <h2 className="text-lg font-semibold text-gray-700">Backup Status</h2>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 flex-1 justify-center items-center">
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : mode === "online" ? (
            <>
              <div className="flex items-center gap-2 text-green-600">
                <FaCloud className="text-base" />
                <span className="font-medium">Real-Time Sync Enabled</span>
              </div>

              <div className="text-sm text-gray-500">
                Last Sync:{" "}
                <span className="font-medium">
                  {last ? last.format("D MMM, hh:mm A") : "No data"}
                </span>
              </div>

              <div className="text-sm text-green-600 font-medium">
                All data is backed up automatically.
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Last Backup</span>
                <span className="font-medium">
                  {last ? last.format("D MMM, hh:mm A") : "No data"}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span>Next Backup</span>
                <span className="font-medium">
                  {next ? next.format("D MMM, hh:mm A") : "—"}
                </span>
              </div>

              <div className="text-sm text-blue-500 pt-2">
                Every {intervalHours} Hour
                {intervalHours && intervalHours > 1 ? "s" : ""}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BackupStatusTile);
