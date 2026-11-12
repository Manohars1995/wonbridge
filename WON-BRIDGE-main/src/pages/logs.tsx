import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";

import ActivityTable from "@/components/AuditLogs/AuditTable";
import { getAuditLogs } from "@/services/auditLogs/auditLogs";
import { normalizeChanges } from "@/components/AuditLogs/utils";
import AuditLogsHeader from "@/components/AuditLogs/AuditHeader";

interface ChangeRecord {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

interface AuditLog {
  id: number;
  custom_id: string | null;
  user: string;
  email: string | null;
  phone: string | null;
  action: string | null;
  by: string | null;
  date: string;
  time: string;
  subject: string;
  details: string;
  changes: ChangeRecord[];
}

interface FilterState {
  date: Date;
  user_type: string;
  action_type: string;
}

interface AuditLogApiResponse {
  success: boolean;
  data: {
    timestamp: string;
    performedByModel?: string;
    performedByName?: string;
    action?: string;
    description?: string;
    changes?: unknown;
    user_details?: {
      custom_id?: string;
      name?: string;
      email?: string;
      phone?: string;
    };
  }[];
  totalCount?: number;
}

interface SelectOption {
  value: string;
  label: string;
}

const options: SelectOption[] = [
  { value: "all", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "supervisor", label: "Supervisor" },
  { value: "operator", label: "Operator" }
];

const ActionOptions: SelectOption[] = [
  { value: "all", label: "All" },
  { value: "create", label: "Create" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" }
];

const LIMIT = 20;

const RecordLogs: React.FC = () => {
  const [data, setData] = useState<AuditLog[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    date: new Date(),
    user_type: "all",
    action_type: "all"
  });
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // --------------- fetch data -----------------
  const fetchAuditLogs = useCallback(
    async (customDate: Date | null = null) => {
      setLoading(true);
      try {
        const date = customDate || filters.date;

        const params = {
          performedByModel: filters.user_type,
          action: filters.action_type,
          from: dayjs(date).startOf("day").toISOString(),
          to: dayjs(date).endOf("day").toISOString(),
          page,
          limit: LIMIT
        };

        const res = (await getAuditLogs(params)) as {
          data: AuditLogApiResponse;
        };

        if (res.data.success) {
          const logs: AuditLog[] = (res.data.data || []).map((log, index) => {
            const dateObj = new Date(log.timestamp);
            return {
              id: (page - 1) * LIMIT + index + 1,
              custom_id: log.user_details?.custom_id || null,
              user: log.user_details?.name || log.performedByName || "Unknown",
              email: log.user_details?.email || null,
              phone: log.user_details?.phone || null,
              action: log.action
                ? log.action.charAt(0).toUpperCase() + log.action.slice(1)
                : null,
              by: log.performedByModel || null,
              date: dateObj.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              }),
              time: dateObj.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              }),
              subject: log.description || "",
              changes: normalizeChanges(log.changes),
              details: JSON.stringify(log.changes || {}, null, 2)
            };
          });

          setData(logs);
          setTotalItems(res.data.totalCount || logs.length);
          setTotalPages(
            Math.ceil((res.data.totalCount || logs.length) / LIMIT)
          );
        }
      } catch (err) {
        console.error("Error fetching audit logs:", err);
      } finally {
        setLoading(false);
      }
    },
    [filters, page]
  );

  useEffect(() => {
    fetchAuditLogs();
  }, [
    page,
    filters.user_type,
    filters.action_type,
    filters.date,
    fetchAuditLogs
  ]);

  const onChange = <K extends keyof FilterState>(
    id: K,
    value: FilterState[K]
  ) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const startItem = (page - 1) * LIMIT + 1;
  const endItem = Math.min(page * LIMIT, totalItems);

  const onPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const onNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div
      className="
      w-full h-full
      flex flex-col
      min-w-0
      p-2 sm:p-4 lg:p-6
      bg-[var(--background-default)]
      rounded-lg border border-gray-300
      overflow-hidden
    "
    >
      <AuditLogsHeader
        title="Audit Logs"
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
        page={page}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
        userTypeOptions={options}
        actionOptions={ActionOptions}
        filters={filters}
        onChange={onChange}
      />

      {/* IMPORTANT: flex-1 + min-w-0 */}
      <div className="flex-1 min-w-0 min-h-0 overflow-hidden">
        <ActivityTable data={data} loading={loading} />
      </div>

      {loading && (
        <div className="text-center py-2 text-sm sm:text-base">Loading...</div>
      )}
    </div>
  );
};

export default RecordLogs;
