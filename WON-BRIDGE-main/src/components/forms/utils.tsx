import { getPincodeData } from "@/services/shared/shared";

export interface Field<T> {
  value: T;
  isValid: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

// pin code auto fill helper DEBOUNCE function
export type GenericFormState = Record<string, Field<any>>;


const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString || typeof dateString !== "string") {
    return "";
  }

  try {
    const dateObject = new Date(dateString);

    // Check for "Invalid Date" object resulting from unparseable strings
    if (isNaN(dateObject.getTime())) {
      return "";
    }

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (e) {
    // Catch any other parsing errors
    return "";
  }
};

export const flattenFormData = <T extends Record<string, Field<any>>>(
  backendData: any,
  initialFormState: T,
  options: {
    dateKeys?: (keyof T)[];
    addressKeys?: (keyof T)[];
  }
): T => {
  const { dateKeys = [], addressKeys = [] } = options;
  const newFormState: T = { ...initialFormState };

  for (const key in initialFormState) {
    if (!Object.prototype.hasOwnProperty.call(initialFormState, key)) continue;

    const typedKey = key as keyof T;

    // Address field
    if (
      addressKeys.includes(typedKey) &&
      backendData.address &&
      backendData.address[typedKey] !== undefined
    ) {
      newFormState[typedKey] = {
        value: backendData.address[typedKey],
        isValid: true
      } as T[typeof typedKey];
      continue;
    }

    // Top-level field
    if (backendData[typedKey] !== undefined) {
      let valueToAssign = backendData[typedKey];

      // Auto parse JSON-arrays if form state expects an array
      if (Array.isArray(initialFormState[typedKey].value)) {
        if (typeof valueToAssign === "string") {
          try {
            valueToAssign = JSON.parse(valueToAssign);
          } catch {
            valueToAssign = [];
          }
        }
      }

      // Format date fields
      if (dateKeys.includes(typedKey)) {
        valueToAssign = formatDateForInput(valueToAssign);
      }

      newFormState[typedKey] = {
        value: valueToAssign,
        isValid: true
      } as T[typeof typedKey];
    }
  }

  return newFormState;
};


export const extractFormValues = <T extends Record<string, Field<any>>>(
  details: T
): Record<string, any> => {
  const result: Record<string, any> = {};
  const addressFields = [
    "street",
    "city",
    "state",
    "district",
    "pincode",
    "country"
  ];
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



// ---------------------------------------------- form validation ------------------------------------------
interface ValidationResult {
  isValid: boolean;
  invalidFields: string[];
}

export const isFormValid = <
  T extends Record<string, any>
>(
  formState: T | null | undefined,
  optionalFields: string[] = []
): ValidationResult => {
  if (!formState || typeof formState !== "object") {
    return { isValid: false, invalidFields: [] };
  }

  const invalidFields: string[] = [];

  const walk = (obj: Record<string, any>, parentPath = ""): void => {
    Object.entries(obj).forEach(([key, value]) => {
      const path = parentPath ? `${parentPath}.${key}` : key;

      if (optionalFields.includes(path)) return;

      if (
        value &&
        typeof value === "object" &&
        "isValid" in value
      ) {
        if (value.isValid !== true) {
          invalidFields.push(path);
        }
        return;
      }

      if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, path);
      }
    });
  };

  walk(formState);

  return {
    isValid: invalidFields.length === 0,
    invalidFields
  };
};


