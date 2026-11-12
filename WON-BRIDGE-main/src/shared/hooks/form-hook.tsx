import { useCallback, useReducer } from 'react';

// Types
type InputState = {
  value: string;
  isValid: boolean;
};

type FormInputs = {
  [key: string]: InputState | FormInputs; // allow nested inputs
};

type FormState = {
  inputs: FormInputs;
  isValid: boolean;
};

type FormAction =
  | {
      type: 'INPUT_CHANGE';
      inputId: string; // dot notation key, e.g. 'mines.mine1.name'
      value: string;
      isValid: boolean;
    }
  | {
      type: 'SET_DATA';
      inputs: FormInputs;
      formIsValid: boolean;
    };

// Helper: set nested value by dot path
const setNestedValue = (obj: any, path: string, newValue: any) => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let temp = obj;
  for (const key of keys) {
    if (!temp[key]) temp[key] = {};
    temp = temp[key];
  }
  temp[lastKey] = newValue;
};

// Helper: recursively validate inputs
const validateInputs = (inputs: FormInputs): boolean => {
  for (const key in inputs) {
    const input = inputs[key];
    if (
      typeof input === 'object' &&
      'value' in input &&
      'isValid' in input
    ) {
      if (!input.isValid) return false;
    } else if (typeof input === 'object') {
      if (!validateInputs(input)) return false;
    }
  }
  return true;
};

// Reducer
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      // shallow copy inputs to update
      const updatedInputs = { ...state.inputs };

      setNestedValue(updatedInputs, action.inputId, {
        value: action.value,
        isValid: action.isValid
      });

      const formIsValid = validateInputs(updatedInputs);

      return {
        inputs: updatedInputs,
        isValid: formIsValid
      };
    }

    case 'SET_DATA': {
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    }

    default:
      return state;
  }
};

// Hook
export const useForm = (
  initialInputs: FormInputs,
  initialFormValidity: boolean
): [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (inputs: FormInputs, formIsValid: boolean) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        inputId: id,
        value,
        isValid
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: FormInputs, formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
