export interface Field<T> {
  value: T;
  isValid: boolean;
}

export type OwnershipStatus = "individual" | "partnership" | "company";

export interface stateVals {
  full_name: Field<string>;
  image: Field<string>;
  email: Field<string>;
  phone: Field<string>;
  company_name: Field<string>;
  pincode: Field<string>;
  street: Field<string>;
  city: Field<string>;
  district: Field<string>;
  state: Field<string>;
  crusher_name: Field<string>;
  crusher_location: Field<string>;
  capacity: Field<string>;
  machine_brand: Field<string>;
  year_installed: Field<string>;
  ownership_type: Field<OwnershipStatus>;
  operational_status: Field<string>;
  status: Field<boolean>;
}

export const initialAdminState = {
  full_name: { value: "", isValid: false },
  image: { value: "", isValid: false },
  email: { value: "", isValid: false },
  phone: { value: "", isValid: false },
  company_name: { value: "", isValid: false },
  pincode: { value: "", isValid: false },
  street: { value: "", isValid: false },
  city: { value: "", isValid: false },
  district: { value: "", isValid: false },
  state: { value: "", isValid: false },
  crusher_name: { value: "", isValid: false },
  crusher_location: { value: "", isValid: false },
  capacity: { value: "", isValid: false },
  machine_brand: { value: "", isValid: false },
  year_installed: { value: "", isValid: false },
  ownership_type: { value: "individual" as OwnershipStatus, isValid: true },
  operational_status: {
    value: "operational",
    isValid: true
  },
  status: { value: true, isValid: true }
};

export interface propVals {
  Id: string | null;
  isOpen: boolean;
  onClose: () => void;
  UID?: string | null;
}

export const isFormValid = (details: stateVals): boolean => {
  return Object.entries(details).every(([key, field]) => {
    if (key === "image") return true;
    return field.isValid;
  });
};

export const extractFormValues = (details: stateVals) => {
  const result: Record<string, any> = {};
  const addressFields = ["street", "city", "state", "pincode", "country"];
  const address: Record<string, any> = {};

  for (const [key, field] of Object.entries(details)) {
    if (addressFields.includes(key)) {
      address[key] = field.value;
    } else {
      result[key] = field.value;
    }
  }

  result.address = {
    ...address,
    country: address.country ?? "India"
  };

  return result;
};

export const flattenData = (
  backendData: any,
  initialFormState: stateVals
): stateVals => {
  const newManagerDetails: stateVals = { ...initialFormState };

  for (const key in initialFormState) {
    if (initialFormState.hasOwnProperty(key)) {
      const typedKey = key as keyof stateVals;

      // Handle address fields (street, city, state, pincode) which are nested in backendData
      if (["street", "city", "state", "pincode"].includes(typedKey as string)) {
        if (
          backendData.address &&
          typeof backendData.address === "object" &&
          backendData.address[typedKey] !== undefined
        ) {
          (newManagerDetails[typedKey] as Field<string>) = {
            value: backendData.address[typedKey],
            isValid: true
          };
        }
      }
      // Handle other top-level fields (e.g., full_name, email, phone, etc.)
      else if (backendData[typedKey] !== undefined) {
        let valueToAssign = backendData[typedKey];

        // Format date fields to "YYYY-MM-DD" for HTML date inputs
        // if (
        //   typedKey === "contract_start_date" ||
        //   typedKey === "contract_end_date"
        // ) {
        //   valueToAssign = formatDateForInput(valueToAssign);
        // }

        (newManagerDetails[typedKey] as Field<any>) = {
          value: valueToAssign,
          isValid: true
        };
      }
      // Fields not present in backendData (or its nested address) retain their initialFormState values.
    }
  }
  return newManagerDetails;
};
