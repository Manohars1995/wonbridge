function formatValue(value: any) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export const normalizeChanges = (
  changes: any
): { field: string; oldValue: any; newValue: any }[] => {
  if (!changes) return [];

  if ("new" in changes) {
    return Object.keys(changes.new || {}).map((field) => ({
      field,
      oldValue: formatValue(changes?.old?.[field]),
      newValue: formatValue(changes?.new?.[field])
    }));
  }

  return Object.entries(changes).map(([field, values]: [string, any]) => ({
    field,
    oldValue: formatValue(values?.old),
    newValue: formatValue(values?.new)
  }));
};
