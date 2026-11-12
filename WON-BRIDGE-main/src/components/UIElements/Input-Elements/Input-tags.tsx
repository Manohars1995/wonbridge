import React, { useEffect, useMemo, useState } from "react";
import Select, {
  type StylesConfig,
  type SingleValue,
  type ActionMeta,
  type MultiValue
} from "react-select";
import type { Validator } from "./input-validators";
import { validate } from "./input-validators";

// Option type
type OptionType = {
  value: string;
  label: string;
};

// ----------------- InputTag Component -----------------
interface InputTagProps {
  id: string;
  type: string;
  label: string;
  value: string;
  validators?: Validator[];
  styles?: string;
  readonly?: boolean;
  max?: number;
  loading?: boolean;
  placeholder?: string;
  onChangeVal: (val: string, isValid: boolean) => void;
}

export const InputTag = ({
  id,
  type = "text",
  label = "",
  value = "",
  validators = [],
  styles,
  readonly = false,
  max,
  loading = false,
  placeholder = "",
  onChangeVal
}: InputTagProps) => {
  const [touched, setTouched] = useState(false);
  // const [isValid, setIsValid] = useState(true);
  const isValid = useMemo(
    () => validate(value, validators),
    [value, validators]
  );

  // useEffect(() => {
  //   const valid = validate(value, validators);
  //   setIsValid(valid);
  // }, [value, validators]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (readonly || loading) return;

    const newVal = e.target.value;
    const valid = validate(newVal, validators);
    onChangeVal(newVal, valid);
  };

  return (
    <div className={`h-20 `}>
      <label htmlFor={id} className="block text-sm font-medium pl-2 mb-1">
        {label}
      </label>
      <div
        className={`
          w-full h-[2.4rem] border-2 bg-[var(--background-default)] rounded-lg flex items-center relative
          ${!isValid && touched ? "border-red-500" : "border-gray-300"}
        `}
      >
        <input
          id={id}
          type={type || "text"}
          value={value || ""}
          maxLength={max}
          readOnly={readonly}
          onChange={handleChange}
          onBlur={() => !readonly && setTouched(true)}
          className={`flex-1 min-w-0 bg-transparent border rounded-lg focus:outline-none border-none h-full px-2  ${styles}`}
        />

        {loading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
            <span className="block h-4 w-4 rounded-full border-2 border-blue-600 border-b-gray-300 animate-spin " />
          </div>
        )}
      </div>

      {!isValid && touched && (
        <p className="text-red-500 text-xs mt-1 ml-1">Invalid {label}</p>
      )}
    </div>
  );
};

// ----------------- ReactSelect Component -----------------
type ReactSelectProps = {
  id: string;
  label?: string;
  value: OptionType | null;
  options: OptionType[];
  validators?: Validator[];
  onChange: (val: string, isValid: boolean) => void;
  loading?: boolean;
  readonly?: boolean;
};

const customStyles: StylesConfig<OptionType, boolean> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
    height: "fit-content"
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "2.4rem",
    borderRadius: "0.5rem",
    borderColor: "#d1d5db",
    boxShadow: "none",
    overflow: "hidden",
    "&:hover": {
      borderColor: "#d1d5db"
    },
    zIndex: 1
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "nowrap",
    maxWidth: "100%",
    paddingRight: "0.5rem",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%"
  }),
  multiValue: (provided) => ({
    ...provided,
    flexShrink: 0,
    maxWidth: "max-content",
    whiteSpace: "nowrap",
    marginRight: "0.25rem"
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    overflowX:'auto'
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    borderRadius: "0.5rem",
    padding: "4px",
    position: "absolute",
    overflow: "visible",
    maxHeight: "none",
    scrollbarWidth: "thin",
    WebkitOverflowScrolling: "touch",
    backgroundColor: "#fff"
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "12rem",
    overflowY: "auto",
    scrollbarWidth: "thin"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#ddd"
      : state.isFocused
        ? "#eee"
        : "#fff",
    color: "#000",
    padding: "0.5rem 0.75rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    cursor: "pointer",
    borderRadius: "0.5rem",
  })
};

export const ReactSelect: React.FC<ReactSelectProps> = ({
  id,
  label,
  value,
  options,
  validators = [],
  onChange,
  loading,
  readonly = false
}) => {
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const valid = validate(value?.value || "", validators);
    setIsValid(valid);
  }, [value, validators]);

  const handleChange = (
    newValue: SingleValue<OptionType>,
    _: ActionMeta<OptionType>
  ) => {
    const val = newValue?.value || "";
    const valid = validate(val, validators);
    setIsValid(valid);
    onChange(val, valid);
  };

  return (
    <div
      key={id}
      className={`w-full ${label ? "h-[5rem]" : "h-full"}  space-y-1 `}
    >
      {label && (
        <label className="block text-sm font-medium pl-2">{label}</label>
      )}
      <Select<OptionType, false>
        isMulti={false}
        isDisabled={readonly}
        isLoading={loading}
        menuPosition="fixed"
        menuPlacement="auto"
        value={value}
        options={options}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        styles={customStyles}
        menuPortalTarget={document.body}
        className={`text-sm font-medium ${
          !isValid && touched ? "border border-red-500 rounded-md" : ""
        }`}
        formatOptionLabel={(e) => (
          <div title={e.label} className="truncate">
            {e.label}
          </div>
        )}
      />
      {!isValid && touched && (
        <p className="text-red-500 text-xs mt-1 ml-1">Invalid {label}</p>
      )}
    </div>
  );
};

// --- BtnTag Component ---
interface propVals {
  BtnText: string;
  children?: React.ReactNode;
  type?: "button" | "submit";
  styles?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: (e: any) => void;
}

export const BtnTag = ({
  BtnText,
  children,
  type,
  styles,
  loading,
  disabled,
  onClick
}: propVals) => {
  return (
    <button
      disabled={loading || disabled}
      type={type || "button"}
      onClick={onClick}
      className={`h-9 min-w-[5.5rem] px-6 rounded-lg border ${
        loading || disabled
          ? "opacity-50 cursor-not-allowed "
          : "cursor-pointer"
      }  font-semibold inline-flex justify-center items-center ${styles} `}
    >
      {loading ? (
        <div className="animate-spin w-5 h-5 border-2 border-t-blue-500 border-gray-300 rounded-full"></div>
      ) : (
        <>
          {children && <span className="mr-1">{children}</span>}
          <span>{BtnText}</span>
        </>
      )}
    </button>
  );
};

// ----------------------------Text area Tag-------------------------------
interface TextareaTagProps {
  id: string;
  label: string;
  value: string;
  validators?: Validator[];
  styles?: string;
  Constyles?: string;
  readonly?: boolean;
  max?: number;
  onChangeVal: (val: string, isValid: boolean) => void;
  placeholder?: string;
}

export const TextareaTag = ({
  id,
  label,
  value,
  validators = [],
  styles,
  Constyles,
  readonly,
  max,
  onChangeVal,
  placeholder
}: TextareaTagProps) => {
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const valid = validate(value, validators);
    setIsValid(valid);
  }, [value, validators]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    const valid = validate(newVal, validators);
    setIsValid(valid);
    onChangeVal(newVal, valid);
  };

  return (
    <div className={`min-h-[5rem] ${Constyles}`}>
      <label htmlFor={id} className="block text-sm font-medium pl-2 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        maxLength={max}
        readOnly={readonly}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={() => setTouched(true)}
        className={`bg-[var(--background-default)] w-full h-full px-2 py-2 border rounded-lg focus:outline-none ${
          !isValid && touched ? "border-red-500" : "border-gray-300"
        } ${styles}`}
      />
      {!isValid && touched && (
        <p className="text-red-500 text-xs mt-1 ml-1">Invalid {label}</p>
      )}
    </div>
  );
};

type MultiReactSelectProps = {
  id: string;
  label?: string;
  value: OptionType[];
  options: OptionType[];
  validators?: Validator[];
  onChange: (val: string[], isValid: boolean) => void;
  loading?: boolean;
};

export const MultiReactSelect: React.FC<MultiReactSelectProps> = ({
  id,
  label,
  value,
  options,
  validators = [],
  onChange,
  loading
}) => {
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const values = value.map((v) => v.value);
    const valid = validate(values.join(","), validators);
    setIsValid(valid);
  }, [value, validators]);

  const handleChange = (
    newValue: MultiValue<OptionType>,
    _: ActionMeta<OptionType>
  ) => {
    const selectedValues = newValue.map((v) => v.value);
    const valid = validate(selectedValues.join(","), validators);
    setIsValid(valid);
    onChange(selectedValues, valid);
  };

  return (
    <div key={id} className="w-full h-[5rem] space-y-1">
      {label && (
        <label className="block text-sm font-medium pl-2">{label}</label>
      )}
      <Select<OptionType, true>
        isMulti
        isLoading={loading}
        value={value}
        options={options}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        styles={customStyles}
        className={`text-sm ${
          !isValid && touched ? "border border-red-500 rounded-md" : ""
        }`}
      />
      {!isValid && touched && (
        <p className="text-red-500 text-xs mt-1 ml-1">Invalid {label}</p>
      )}
    </div>
  );
};

interface WeighInputTagProps {
  id: string;
  type?: string;
  label: string;
  value: string;
  validators?: Validator[];
  styles?: string;
  readonly?: boolean;
  max?: number;
  onChangeVal: (val: string, isValid: boolean) => void;
  symbol?: React.ReactElement;
  timeStamp?: string;
  weightType?: string;
}

export const WeighInputTag = ({
  id,
  type = "text",
  label,
  value,
  validators = [],
  styles,
  readonly,
  max,
  onChangeVal,
  symbol,
  timeStamp,
  weightType = ""
}: WeighInputTagProps) => {
  const [_touched, setTouched] = useState(false);
  const [_isValid, setIsValid] = useState(true);

  useEffect(() => {
    const valid = validate(value, validators);
    setIsValid(valid);
  }, [value, validators]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    const valid = validate(newVal, validators);
    setIsValid(valid);
    onChangeVal(newVal, valid);
  };

  return (
    <div className={`h-[6rem] `}>
      <label htmlFor={id} className="block text-sm font-medium pl-2 mb-1">
        {label}
      </label>
      <div className="flex  items-center">
        <div className="flex flex-col bg-black/10 rounded-lg">
          <div className="flex items-center pr-2 py-[2px] bg-[var(--background-default)] rounded-lg">
            <input
              id={id}
              placeholder="0.00"
              type={type || "text"}
              value={value || ""}
              maxLength={max}
              readOnly={readonly}
              onChange={handleChange}
              onBlur={() => {
                void (!readonly && setTouched(true));
              }}
              className={` w-full h-15 text-6xl pl-1 py-2 rounded-lg outline-none text-right`}
              style={{ fontFamily: "DS-Digital, monospace" }}
            />

            <label className="font-extrabold text-xl self-end text-[var(--secondary-main)]">
              .KG
            </label>
          </div>
          {timeStamp && (
            <p className="text-[10px] text-black/60 font-semibold text-center">
              <span className="capitalize text-black">
                {weightType ? `${weightType} - ` : ""}
              </span>
              {timeStamp}
            </p>
          )}
        </div>
        <p className="text-red-500 text-xs mt-1 ml-1">{symbol ? symbol : ""}</p>
      </div>
    </div>
  );
};
