export interface SelectOption {
  value: string;
  label: string;
}

export interface Field<T> {
  value: T;
  isValid: boolean;
}

export interface stateVals {
  // Reference & Site
  reference_id: Field<string>;
  site_id: Field<string>;

  // Vehicle & Driver
  vehicle_no: Field<string>;
  driver_name: Field<string>;
  aadhar: Field<string>;
  driving_license: Field<string>;
  permit: Field<string>;

  // Parties
  supplier: Field<string>;
  customer: Field<string>;
  customer_no: Field<string>;

  // Weighing
  tare_weight: Field<string>;
  in_weight: Field<string>;
  out_weight: Field<string>;
  net_weight: Field<string>;

  // Attachments
  in_product: Field<string>;
  in_images: Field<string[]>; // Keep as array of strings (safe)
  in_timestamp: Field<string>;
  in_weight_type: Field<string>;

  out_product: Field<string>;
  out_images: Field<string[]>; // Keep as array of strings (safe)
  out_timestamp: Field<string>;
  out_weight_type: Field<string>;

  // Finance
  rate_per_ton: Field<string>;
  material_cost: Field<string>;
  tax: Field<string>;
  total_tax: Field<string>;
  gross_amount: Field<string>;

  // System / Status
  weighed_by: Field<string>;
  remarks: Field<string>;
  status: Field<string>;
  status_reason: Field<string>;
  flagged: Field<string>;
  synced: Field<string>;
  retry_count: Field<string>;
  sync_error: Field<string>;
  created_at: Field<string>;

  [key: string]: Field<any>;
}

export const initialWeightState: stateVals = {
  reference_id: { value: "", isValid: false },
  site_id: { value: "", isValid: false },

  vehicle_no: { value: "", isValid: false },
  driver_name: { value: "", isValid: false },
  aadhar: { value: "", isValid: false },
  driving_license: { value: "", isValid: false },
  permit: { value: "", isValid: false },

  supplier: { value: "", isValid: false },
  customer: { value: "", isValid: false },
  customer_no: { value: "", isValid: false },

  tare_weight: { value: "", isValid: false },
  in_weight: { value: "", isValid: false },
  out_weight: { value: "", isValid: false },
  net_weight: { value: "", isValid: false },

  in_product: { value: "", isValid: false },
  in_images: { value: [], isValid: true },
  in_timestamp: { value: "", isValid: true },
  in_weight_type: { value: "", isValid: true },

  out_product: { value: "", isValid: false },
  out_images: { value: [], isValid: true },
  out_timestamp: { value: "", isValid: true },
  out_weight_type: { value: "", isValid: true },

  rate_per_ton: { value: "", isValid: false },
  material_cost: { value: "", isValid: false },
  tax: { value: "", isValid: false },
  total_tax: { value: "", isValid: false },
  gross_amount: { value: "", isValid: false },

  weighed_by: { value: "", isValid: false },
  remarks: { value: "", isValid: true },
  status: { value: "", isValid: false },
  status_reason: { value: "", isValid: true },
  flagged: { value: "", isValid: true },
  synced: { value: "", isValid: true },
  retry_count: { value: "", isValid: true },
  sync_error: { value: "", isValid: true },
  created_at: { value: "", isValid: true }
};

export interface propVals {
  Id: string | null;
  isOpen: boolean;
  onClose: () => void;
  UID?: string | null;
}

export interface FormFieldsProps {
  transitDetails: stateVals;
  handleInputChange: (
    field: keyof stateVals,
    val: string | string[],
    isValid: boolean
  ) => void;
  adminOptions?: SelectOption[];
  adminLoading?: boolean;
  setModalRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
