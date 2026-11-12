import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="relative min-w-50 w-full sm:w-48 text-left rounded-lg px-3 py-[6.5px]
                 text-[var(--text-primary)]
                 bg-[var(--background-default)]
                  border-1 border-[var(--border-secondary)]
                 flex items-center justify-between"
    >
      <span className="truncate">
        {value || "Select a date"}
      </span>
      <IoCalendarOutline size={20} className="text-gray-600" />
    </button>
  )
);

CustomInput.displayName = "CustomInput";

interface MyDatePickerProps {
  onChange: (date: Date | null) => void;
}

export const MyDatePicker = ({ onChange }: MyDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="relative w-full sm:w-auto">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => {
          setStartDate(date);
          onChange(date);
        }}
        customInput={<CustomInput />}
        dateFormat="dd/MM/yyyy"
        portalId="datepicker-portal"
        popperPlacement="bottom-start"
        popperProps={{
          strategy: "fixed", // prevents scroll/transform stacking issues
        }}
        popperClassName="!z-[9999]"
      />
    </div>
  );
};