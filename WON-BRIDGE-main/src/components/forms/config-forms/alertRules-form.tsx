import React, { useState, useEffect } from "react";
import { type IconType } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

/* ---------------- Types ---------------- */

// API response data type (from backend)
interface AlertData {
  id: number;
  code: string;
  name: string;
  description: string;
  min_value: number | null;
  max_value: number | null;
  severity: "CRITICAL" | "WARNING" | "INFO";
  enabled: 0 | 1;
  last_synced?: string;
}

// Normalized internal UI type
interface AlertRule {
  id: number;
  code: string;
  name: string;
  description: string;
  min_value: number | null;
  max_value: number | null;
  severity: "critical" | "warning" | "info";
  enabled: boolean;
  last_synced?: string;
}

interface SeverityConfigEntry {
  color: string;
  headerColor: string;
  icon: IconType;
  label: string;
  dot: string;
  strip: string;
}

/* ---------------- Severity Config ---------------- */
const SEVERITY_CONFIG: Record<AlertData["severity"], SeverityConfigEntry> = {
  CRITICAL: {
    color: "border-red-500 bg-red-100 text-red-800",
    headerColor: "bg-red-500",
    icon: FaExclamationTriangle,
    label: "Critical",
    dot: "bg-red-500",
    strip: "bg-red-500",
  },
  WARNING: {
    color: "border-amber-500 bg-amber-100 text-amber-800",
    headerColor: "bg-amber-500",
    icon: FaExclamationTriangle,
    label: "Warning",
    dot: "bg-amber-500",
    strip: "bg-amber-500",
  },
  INFO: {
    color: "border-blue-500 bg-blue-100 text-blue-800",
    headerColor: "bg-blue-500",
    icon: AiOutlineInfoCircle,
    label: "Informational",
    dot: "bg-blue-500",
    strip: "bg-blue-500",
  },
};


const ThresholdDisplay = ({
  min,
  max,
}: {
  min: number | null;
  max: number | null;
}) => {
  if (min == null && max == null) return null;
  return (
    <div className="pt-2 border-t-2 border-dotted border-gray-200 text-sm text-gray-700">
      <span className="font-semibold">Threshold: </span>
      <span className="text-gray-600 font-medium">
        {min != null && `Min ${min}`}
        {min != null && max != null && " / "}
        {max != null && `Max ${max}`}
      </span>
    </div>
  );
};

/* ---------------- Alert Card ---------------- */
const AlertDetailCard: React.FC<{ alertData: AlertRule }> = ({ alertData }) => {
  const [isEnabled, setIsEnabled] = useState(alertData.enabled);

  // Convert severity to uppercase for config lookup
  const config =
    SEVERITY_CONFIG[alertData.severity.toUpperCase() as AlertData["severity"]];
  const Icon = config.icon;

  return (
    <div
      className={`font-inter w-full rounded-2xl overflow-hidden transition-all duration-300 ${
        isEnabled
          ? "bg-white"
          : "opacity-60 grayscale bg-gray-100 pointer-events-none sm:pointer-events-auto"
      }`}
      aria-live="polite"
      role="region"
    >
      {/* Header */}
      <div
        className={`p-3 text-white flex justify-between items-center ${
          isEnabled ? config.headerColor : "bg-gray-400"
        }`}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-2" />
          <span className="text-sm font-semibold">
            {config.label.toUpperCase()}
          </span>
        </div>

        <button
          aria-checked={isEnabled}
          role="switch"
          onClick={() => setIsEnabled(!isEnabled)}
          className={`${
            isEnabled ? "bg-green-400" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer shadow-inner`}
        >
          <span
            className={`${
              isEnabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-900">{alertData.name}</h3>
        <p className="text-xs font-mono text-gray-500 border-b-2 border-dotted border-gray-200 pb-2">
          {alertData.code}
        </p>
        <p className="text-sm text-gray-700">{alertData.description}</p>
        <ThresholdDisplay min={alertData.min_value} max={alertData.max_value} />
      </div>
    </div>
  );
};

/* ---------------- Loader ---------------- */
const Loader = () => (
  <div className="flex items-center justify-center h-full w-full p-8">
    <div className="h-7 w-7 border-3 border-black/20 border-t-blue-400 rounded-full animate-spin" />
  </div>
);

/* ---------------- Main Component ---------------- */
interface AlertRulesFormProps {
  rules: AlertRule[];
}

const AlertRulesForm: React.FC<AlertRulesFormProps> = ({ rules }) => {
  const [alerts, setAlerts] = useState<AlertRule[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rules?.length) {
      setAlerts(rules);
    }
  }, [rules]);

  if (loading) return <Loader />;

  return (
    <div className="font-inter">
      <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
        {alerts.map((alert) => (
          <AlertDetailCard key={alert.code} alertData={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertRulesForm;
