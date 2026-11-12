import { useEffect, useState } from "react";
import { getRecentMissedEntries } from "@/services/dashboards/dashboards";

interface MissedEntry {
  custom_id: string;
  weight: string;
  operator_name: string | null;
  timestamp: string;
}

const MissedEntriesList = () => {
  const [data, setData] = useState<MissedEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getRecentMissedEntries();

      if (res?.data?.success) {
        setData(res.data.data || []);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching missed entries:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full min-h-0">
      <div className="p-2 bg-black/5 h-full rounded-xl min-h-0">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold">Recent Missed Entries</h3>
          <p className="text-sm font-bold mr-3">{data.length}</p>
        </div>

        <div className="overflow-y-auto min-h-0 h-[90%] slot-scroll space-y-1 pr-1 mt-2">
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center text-sm text-gray-500">
              No missed entries found.
            </div>
          ) : (
            data.map((entry) => {
              const formattedWeight = entry.weight
                ? `${Number(entry.weight).toLocaleString("en-IN")} kg`
                : "-";

              return (
                <div
                  key={entry.custom_id}
                  className="bg-black/10 p-2 rounded-md text-sm"
                >
                  <div className="grid grid-cols-4 gap-3 items-center">
                    <span
                      title={entry.custom_id}
                      className="font-semibold text-blue-800 truncate"
                    >
                      {entry.custom_id}
                    </span>

                    <span
                      title={entry.operator_name || "Operator"}
                      className="text-gray-600 font-medium truncate"
                    >
                      {entry.operator_name || "-"}
                    </span>

                    <span
                      title={formattedWeight}
                      className="text-gray-600 font-medium truncate"
                    >
                      {formattedWeight}
                    </span>

                    <span
                      title={entry.timestamp}
                      className="text-gray-500 text-xs truncate"
                    >
                      {entry.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MissedEntriesList;