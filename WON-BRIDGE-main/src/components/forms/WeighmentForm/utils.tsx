import { formatDateTime } from "@/shared/util/helper-functions";

export interface SelectOption {
  value: string;
  label: string;
}

export interface Field<T> {
  value: T;
  isValid: boolean;
}

export interface StagedWeighmentState {
  custom_id: Field<string>;
  trip_id: Field<string>;
  admin_id: Field<string>;
  operator_id: Field<string>;
  weight: Field<string>;
  images: Field<string[]>; // stored as string in DB, but array in UI is correct
  timestamp: Field<string>;
  status: Field<string>; // default PENDING
  resolved_on: Field<string>;
  resolve_message: Field<string>;

  [key: string]: Field<any>;
}

export const initialStagedWeighmentState: StagedWeighmentState = {
  _id: { value: "", isValid: false },
  custom_id: { value: "", isValid: false },
  trip_id: { value: "", isValid: false },
  admin_id: { value: "", isValid: false },
  operator_id: { value: "", isValid: false },

  weight: { value: "", isValid: false },
  images: { value: [], isValid: true },

  timestamp: { value: "", isValid: true },
  status: { value: "PENDING", isValid: true },
  resolved_on: { value: "", isValid: true },
  resolve_message: { value: "", isValid: true }
};

export interface propVals {
  Id: string | null;
  isOpen: boolean;
  onClose: () => void;
  UID?: string | null;
  type?: string;
}

export interface FormFieldsProps {
  weighmentDetails: StagedWeighmentState;
  handleInputChange: (
    field: keyof StagedWeighmentState,
    val: string | string[],
    isValid: boolean
  ) => void;
  setModalRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export function extractAndFormatResolvedOn(value?: string) {
  if (!value) return "N/A";

  // Extract ISO timestamp after "resolved on "
  const iso = value.replace("resolved on ", "").trim();

  return formatDateTime(iso);
}
