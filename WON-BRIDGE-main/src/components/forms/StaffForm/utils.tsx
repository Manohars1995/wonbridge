export interface Field<T> {
  value: T;
  isValid: boolean;
}

export interface stateVals {
  full_name: Field<string>;
  email: Field<string>;
  phone: Field<string>;
  assigned_shift: Field<string>;
  image: Field<string>;
  pincode: Field<string>;
  street: Field<string>;
  city: Field<string>;
  district: Field<string>;
  state: Field<string>;
  gender: Field<string>;
  work_location: Field<string>;
  date_of_joining: Field<string>;
  date_of_resignation: Field<string>;
  role: Field<string>;
  status: Field<boolean>;
  admin_id: Field<string>;
  [key: string]: Field<any>;
}

export const initialStaffState: stateVals = {
  full_name: { value: "", isValid: false },
  email: { value: "", isValid: false },
  phone: { value: "", isValid: false },
  assigned_shift: { value: "", isValid: false },
  image: { value: "", isValid: true },
  pincode: { value: "", isValid: false },
  street: { value: "", isValid: false },
  city: { value: "", isValid: false },
  district: { value: "", isValid: false },
  state: { value: "", isValid: false },
  gender: { value: "", isValid: false },
  work_location: { value: "", isValid: false },
  date_of_joining: { value: "", isValid: false },
  date_of_resignation: { value: "", isValid: false },
  role: { value: "", isValid: false },
  status: { value: true, isValid: true },
  admin_id: { value: "", isValid: true }
};
export interface SelectOption {
  value: string;
  label: string;
}

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

export const flattenStaffData = (
  backendData: any,
  initialFormState: stateVals
): stateVals => {
  const newManagerDetails: stateVals = { ...initialFormState };

  for (const key in initialFormState) {
    if (Object.prototype.hasOwnProperty.call(initialFormState, key)) {
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
        if (
          typedKey === "date_of_resignation" ||
          typedKey === "date_of_joining"
        ) {
          valueToAssign = formatDateForInput(valueToAssign);
        }

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


