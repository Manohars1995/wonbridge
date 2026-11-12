import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MyDatePicker } from "@/shared/components/UIElements/calender-ui";
import { ReactSelect } from "@/components/UIElements/Input-Elements/Input-tags";

interface OptionType {
  value: string;
  label: string;
}

interface Filters {
  date: Date;
  user_type: string;
  action_type: string;
}

interface AuditHeaderProps {
  title: string;
  startItem: number;
  endItem: number;
  totalItems: number;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  userTypeOptions: OptionType[];
  actionOptions: OptionType[];
  filters: Filters;
  onChange: <K extends keyof Filters>(id: K, value: Filters[K]) => void;
}

const AuditHeader: React.FC<AuditHeaderProps> = ({
  title,
  startItem,
  endItem,
  totalItems,
  page,
  totalPages,
  onPrev,
  onNext,
  userTypeOptions,
  actionOptions,
  filters,
  onChange
}) => {
  return (
    <div className="max-w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-2 py-2">
      {/* Row 1 - Title + Pagination */}
      <div className="flex items-center justify-between gap-4 w-full lg:w-auto ">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>

        <div className="flex items-center gap-2">
          <h3 className="text-xs px-2 py-1 rounded-lg cursor-default font-semibold whitespace-nowrap">
            {`${startItem}-${endItem} of ${totalItems}`}
          </h3>
          <div className="flex items-center gap-1 text-xl">
            <button
              type="button"
              className={`cursor-pointer p-1 rounded-full hover:bg-[var(--secondary-main)] ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={onPrev}
              disabled={page === 1}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              type="button"
              className={`cursor-pointer p-1 rounded-full hover:bg-[var(--secondary-main)] ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={onNext}
              disabled={page === totalPages}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2 - Filters */}
      <div className="flex flex-col lg:flex-row lg:justify-end gap-3 w-auto ">
        <div className="w-full lg:w-[150px]">
          <ReactSelect
            id="user_type"
            options={userTypeOptions}
            value={
              userTypeOptions.find((opt) => opt.value === filters.user_type) ||
              null
            }
            onChange={(val: string, isValid: boolean) => {
              if (isValid) onChange("user_type", val);
            }}
          />
        </div>

        <div className="w-full lg:w-[150px]">
          <ReactSelect
            id="action_type"
            options={actionOptions}
            value={
              actionOptions.find((opt) => opt.value === filters.action_type) ||
              null
            }
            onChange={(val: string, isValid: boolean) => {
              if (isValid) onChange("action_type", val);
            }}
          />
        </div>

        <div className="w-full lg:w-[180px] ">
          <MyDatePicker
            onChange={(date: Date | null) =>
              onChange("date", date || new Date())
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AuditHeader;
