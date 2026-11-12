import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

import { validate } from "./input-validators";
import type { Validator } from "./input-validators";

interface Props {
  value: string;
  validators?: Validator[];
  onChangeVal: (val: string, isValid: boolean) => void;
}

const MobileNumberInput = ({ value, validators = [], onChangeVal }: Props) => {
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);

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
    <div className="h-[5rem]">
      <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
      <div className="flex relative border-2 border-black/10 rounded-lg">
        <button
          type="button"
          className="flex items-center justify-between pl-2 pr-1 py-2 rounded-l-md bg-white text-sm w-fit text-black"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          IN
          <span
            className={`ml-1 transform transition-transform duration-500 text-lg text-[#8a817c] ${
              showDropdown ? "rotate-180" : "rotate-0"
            }`}
          >
            <IoIosArrowDown />
          </span>
          <span className="ml-1">+91</span>
        </button>

        <input
          autoFocus={true}
          name="mobile"
          autoComplete="tel"
          type="tel"
          className="flex-1 rounded-r-md px-1 py-1 text-sm focus:outline-none text-black"
          value={value}
          onChange={handleChange}
          onFocus={() => setShowDropdown(false)}
          onBlur={() => setTouched(true)}
          maxLength={10}
        />

        {/* Dropdown */}
        <div
          className={`absolute top-[42px] p-1 left-0 z-10 bg-white w-full rounded-lg shadow-md text-sm text-black duration-200 ease-out transform border-1 border-[#ccc] ${
            showDropdown
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="flex items-center justify-between px-4 py-2 rounded-md bg-blue-100 cursor-pointer"
            onMouseDown={() => setShowDropdown(false)}
          >
            <span>India (भारत) +91</span>
            <span className="text-blue-700">
              <FaCheck />
            </span>
          </div>
        </div>
      </div>

      {!isValid && touched && (
        <p className="text-red-500 text-xs mt-1 ml-1">Invalid mobile number</p>
      )}
    </div>
  );
};

export default MobileNumberInput;
