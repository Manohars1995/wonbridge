export interface Entry {
  weight?: number | null;
  product?: string[];
  images?: string[]; // parsed from JSON string
  timestamp?: string | null;
  weight_type?: string | null;
}

export interface weighment {
  _id?: string;
  custom_id?: string;
  trip_id?: string;

  admin_id?: string;
  operator_id?: string;

  weight?: string;
  images?: string | string[]; // DB stores string; UI may use array
  timestamp?: string;

  status?: string; // default: "PENDING"
  synced?: boolean; // default: true
  retry_count?: number; // default: 1
  sync_error?: string | null;
}

export const mapToWighment = (item: any): weighment => {
  return {
    _id: item?._id,
    custom_id: item.custom_id,
    trip_id: item.trip_id,

    admin_id: item.admin_id,
    operator_id: item.operator_id,

    weight: item.weight,
    images:
      typeof item.images === "string"
        ? item.images.split(",")
        : item.images || [],

    timestamp: item.timestamp,

    status: item.status,
    synced: item.synced,
    retry_count: item.retry_count,
    sync_error: item.sync_error
  };
};
