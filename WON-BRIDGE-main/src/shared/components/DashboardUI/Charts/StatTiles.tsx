import React, { useEffect, useState } from "react";
import { getTodayEntriesData } from "@/services/dashboards/dashboards";

//  shape of an entry
interface Entry {
  _id?: string;
  vehicle_no?: string;
  material?: string;
  in_time?: string | null;
  out_time?: string | null;
  weight?: string;
}

// Props
interface StatTilesProps {
  userType?: "admin" | "manager" | "staff" | string;
}

interface staff {
  total: number;
  active: number;
}

// const xentries = [
//   {
//     id: 1,
//     vehicle_no: "AP16XY1234",
//     material: "Iron Ore",
//     in_time: "10:23 AM",
//     out_time: "12:10 PM",
//     weight: "18,200 kg"
//   },
//   {
//     id: 2,
//     vehicle_no: "TS09CD5678",
//     material: "Coal",
//     in_time: "11:15 AM",
//     out_time: null,
//     weight: "20,000 kg"
//   },
//   {
//     id: 3,
//     vehicle_no: "KA01AB3344",
//     material: "Granite",
//     in_time: "12:45 PM",
//     out_time: "02:00 PM",
//     weight: "15,700 kg"
//   },
//   {
//     id: 4,
//     vehicle_no: "AP10BC9988",
//     material: "Sand",
//     in_time: "01:30 PM",
//     out_time: null,
//     weight: "22,000 kg"
//   }
// ];

const StatTiles = ({ userType = "manager" }: StatTilesProps) => {
  const [staffCount, setStaffCount] = useState<staff>({
    total: 0,
    active: 0
  });
  const [managerCount, setManagerCount] = useState<staff>({
    total: 0,
    active: 0
  });
  const [entries, setEntries] = useState<Entry[]>([]);

  const fetchTodayEntries = async () => {
    try {
      const res = await getTodayEntriesData();
      console.log(res, "res");
      if (!res.data.success) {
        setEntries([]);
        setStaffCount({ total: 0, active: 0 });
        setManagerCount({ total: 0, active: 0 });
      }

      setEntries((res.data.data as Entry[]) ?? []);
      setStaffCount(res?.data?.staffData?.staff ?? { total: 0, active: 0 });
      setManagerCount(
        res?.data?.staffData?.managers ?? { total: 0, active: 0 }
      );
    } catch (err) {
      console.error("Error fetching today's entries:", err);
      setEntries([]);
      setStaffCount({ total: 0, active: 0 });
      setManagerCount({ total: 0, active: 0 });
    }
  };

  useEffect(() => {
    fetchTodayEntries();
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 w-full">
      {userType !== "admin" && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-100 p-2 rounded-xl text-center shadow flex">
            <span className="w-15 flex items-center justify-center text-5xl">
              🧑‍✈️
            </span>
            <div className="flex-1 ml-2">
              <h3 className="text-lg text-left font-semibold">Managers</h3>
              <p className="text-2xl text-left font-bold">
                {managerCount?.total}
              </p>
            </div>
          </div>
          <div className="bg-green-100 p-2 rounded-xl text-center shadow flex">
            <span className="w-15 flex items-center justify-center text-5xl">
              🧑‍🔧
            </span>
            <div className="ml-2">
              <h3 className="text-lg text-left font-semibold">Staff</h3>
              <p className="text-2xl text-left font-bold">
                {staffCount?.total}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-2 bg-black/5 h-full rounded-xl">
        <div className="text-center flex justify-between items-center">
          <h3 className="text-md font-semibold">Total Entries Today</h3>
          <p className="text-sm font-bold mr-3">{entries.length}</p>
        </div>
        <div className="overflow-y-auto space-y-1 mt-1">
          {entries?.length > 0 ? (
            entries.map((entry, idx) => (
              <div
                key={entry._id || idx}
                className="bg-black/10 p-2 rounded-md text-sm"
              >
                <div className="grid grid-cols-5 gap-3 items-center">
                  <span
                    title={entry.vehicle_no || ""}
                    className="font-semibold text-blue-800 truncate"
                  >
                    {entry.vehicle_no || "-"}
                  </span>
                  <span className="text-gray-500 font-semibold">
                    {entry.in_time || "-"}
                  </span>
                  <span className="text-gray-500 font-semibold">
                    {entry.out_time || "-"}
                  </span>
                  <span className="text-gray-500 font-semibold">
                    {entry.weight || "-"}
                  </span>
                  <span className="text-gray-500 font-semibold">
                    {entry.material || "-"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-6 text-sm text-gray-500 font-medium">
              No records found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default React.memo(StatTiles)