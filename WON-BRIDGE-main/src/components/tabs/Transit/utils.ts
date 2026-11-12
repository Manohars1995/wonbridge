
export interface Entry {
  weight?: number | null;
  product?: string[];
  images?: string[]; // parsed from JSON string
  timestamp?: string | null;
  weight_type?: string | null;
}

export interface Transit {
  _id?: string;
  admin_id?: string;
  operator_id?: string;
  reference_id?: string;
  site_id?: string;

  vehicle_no?: string;
  driver_name?: string;

  supplier?: string;
  customer?: string;
  customer_no?: string;

  // In & Out Entries
  in_entry?: Entry;
  out_entry?: Entry;

  tare_weight?: number | null;
  net_weight?: number | null;
  rate_per_ton?: number | null;
  material_cost?: number;
  tax?: number | null;
  total_tax?: number;
  gross_amount?: number;

  weighed_by?: string;
  remarks?: string;
  status?: string;
  status_reason?: string | null;

  flagged?: boolean;
  synced?: boolean;
  retry_count?: number;
  sync_error?: string | null;

  aadhar?: string;
  driving_license?: string;
  permit?: string;

  created_at?: string;
  createdAt?: string;
  updatedAt?: string;

  custom_id?: string;
}




const safeParseImages = (value: any): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
};


export const mapToTransit = (item: any): Transit => {
  return {
    _id: item._id,
    admin_id: item.admin_id,
    operator_id: item.operator_id,
    reference_id: item.reference_id,
    site_id: item.site_id,

    vehicle_no: item.vehicle_no,
    driver_name: item.driver_name,

    supplier: item.supplier,
    customer: item.customer,
    customer_no: item.customer_no,

    // ---- IN ENTRY ----
    in_entry: {
      weight: item.in_weight,
      product: item.in_product,
      images: safeParseImages(item.in_images),
      timestamp: item.in_timestamp,
      weight_type: item.in_weight_type
    },

    // ---- OUT ENTRY ----
    out_entry: {
      weight: item.out_weight,
      product: item.out_product,
      images: safeParseImages(item.out_images),
      timestamp: item.out_timestamp,
      weight_type: item.out_weight_type
    },

    tare_weight: item.tare_weight,
    net_weight: item.net_weight,
    rate_per_ton: item.rate_per_ton,
    material_cost: item.material_cost,
    tax: item.tax,
    total_tax: item.total_tax,
    gross_amount: item.gross_amount,

    weighed_by: item.weighed_by,
    remarks: item.remarks,
    status: item.status,
    status_reason: item.status_reason,

    flagged: item.flagged,
    synced: item.synced,
    retry_count: item.retry_count,
    sync_error: item.sync_error,

    aadhar: item.aadhar,
    driving_license: item.driving_license,
    permit: item.permit,

    created_at: item.created_at,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    custom_id: item.custom_id
  };
};
