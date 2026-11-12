import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface ChangeRecord {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

interface ActivityRecord {
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

interface ActivityTableProps {
  data: ActivityRecord[];
  loading: boolean;
}

const actionColors: Record<string, string> = {
  Create: "bg-green-100 text-green-600",
  Update: "bg-orange-100 text-orange-600",
  Delete: "bg-red-100 text-red-600",
  Login: "bg-blue-100 text-blue-600",
  Logout: "bg-purple-100 text-purple-600"
};

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

export default function ActivityTable({
  data,
  loading
}: ActivityTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-gray-500">No activity data to display.</div>
      </div>
    );
  }

  return (
    <div className="max-w-full h-full mt-1 rounded-md flex flex-col min-w-0 overflow-hidden">
      {/* Scroll wrapper */}
      <div className="flex-1 w-full min-w-0 overflow-x-auto overflow-y-auto min-h-0">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center py-6">
            <span className="h-6 w-6 border-2 border-gray-300 rounded-full animate-spin border-b-blue-500" />
          </div>
        ) : (
          <table className="w-full min-w-[720px] divide-y divide-gray-200">
            {/* Header */}
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Subject
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((record) => (
                <React.Fragment key={record.id}>
                  {/* Main Row */}
                  <tr
                    className="cursor-pointer transition-colors duration-200"
                    onClick={() => toggleRow(record.id)}
                  >
                    <td
                      className={`px-4 py-3 text-sm ${
                        expandedRow === record.id
                          ? "border-l-4 border-blue-500"
                          : "border-l-4 border-transparent"
                      }`}
                    >
                      <div className="font-medium text-gray-800 flex items-center gap-2">
                        {record.user}
                        {expandedRow === record.id ? (
                          <FiChevronUp size={16} />
                        ) : (
                          <FiChevronDown size={16} />
                        )}
                      </div>
                      <div className="text-gray-500 truncate max-w-[200px]">
                        {record.email}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          actionColors[record.action || ""] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {record.action}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {record.date}
                      <br />
                      <span className="text-gray-500">
                        {record.time}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-700 break-words max-w-[260px]">
                      “{record.subject}”
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRow === record.id && (
                    <tr>
                      <td
                        colSpan={4}
                        className="bg-gray-50 px-6 py-4 border-l-4 border-blue-500"
                      >
                        <div className="text-sm text-gray-700 mb-4">
                          {record.details}
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[600px] text-sm border border-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-3 py-2 text-left">
                                  Field
                                </th>
                                <th className="px-3 py-2 text-left">
                                  Old Value
                                </th>
                                <th className="px-3 py-2 text-left">
                                  New Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {record.changes.map((change, idx) => (
                                <tr
                                  key={idx}
                                  className="border-t border-gray-200"
                                >
                                  <td className="px-3 py-2">
                                    {change.field}
                                  </td>
                                  <td className="px-3 py-2 text-red-600 break-words">
                                    {formatValue(change.oldValue)}
                                  </td>
                                  <td className="px-3 py-2 text-green-600 break-words">
                                    {formatValue(change.newValue)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}