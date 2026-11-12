import { FaSearch } from "react-icons/fa";
import { PiSealWarningBold } from "react-icons/pi";
import { TiStarOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { filterOptions } from "./utils";
import CustomDateRangePicker from "./DateRange";
import { ReactSelect } from "@/components/UIElements/Input-Elements/Input-tags";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ComponentHeaderProps {
  header?: string;
  searchText?: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;

  onSearchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrev: () => void;
  onNext: () => void;

  onClick?: (id?: string | null) => void;
  onFilter: (val: string, isValid: boolean) => void;
  filterValue: { value: string; isValid: boolean };
  dateRange: { startDate: Date | null; endDate: Date | null; key: string }[];
  setDateRange: React.Dispatch<
    React.SetStateAction<
      { startDate: Date | null; endDate: Date | null; key: string }[]
    >
  >;
  back?: boolean;
  onChangeMode: (val: string) => void;
  onClickMissed?: () => void;
  showMissed?: boolean;
  showStarred?: boolean;
  showFilter?: boolean;
}

const ComponentHeader2 = ({
  header,
  searchText,
  currentPage = 0,
  totalPages = 0,
  totalItems = 0,
  itemsPerPage = 0,
  // onClick,
  onFilter,
  filterValue,
  dateRange,
  setDateRange,
  back = true,
  onChangeMode,
  onClickMissed,
  onSearchHandler,
  onPrev,
  onNext,
  showMissed = true,
  showStarred = false,
  showFilter = true
}: ComponentHeaderProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1 || 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-2 sm:p-0 z-20">
      {/* Row 1: Back + Title */}
      <div className="flex items-center gap-2 w-fit">
        {back && (
          <button
            aria-label="Back"
            title="Back"
            onClick={() => navigate(-1)}
            className="text-sm sm:text-2xl hover:bg-[var(--border)] rounded-md cursor-pointer p-[2px]"
          >
            <IoIosArrowBack />
          </button>
        )}
        <h1 className="text-lg sm:text-2xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {header}
        </h1>
      </div>

      {/* Row 2: Search + Filter + DatePicker + Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-3 w-full sm:w-auto">
        {/* Pagination */}
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <h3 className="border-2 border-transparent px-2 py-1 rounded-lg cursor-default font-semibold whitespace-nowrap">
            {`${startItem}-${endItem} of ${totalItems}`}
          </h3>
          <div className="flex items-center gap-2 text-lg sm:text-xl">
            <button
              type="button"
              className={`cursor-pointer p-1 rounded-full hover:bg-[var(--secondary-main)] ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={onPrev}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              type="button"
              className={`cursor-pointer p-1 rounded-full hover:bg-[var(--secondary-main)] ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={onNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>

        {/* Search */}
        <div
          className={`flex items-center border-2 border-[var(--secondary-main)] rounded-lg pl-1 h-9 w-full sm:w-40 lg:w-60 flex-shrink-0
            ${filterValue.value === "custom" ? "sm:hidden" : ""}`}
        >
          <FaSearch className="text-lg sm:text-2xl mr-1 text-[var(--secondary-main)]" />
          <input
            title="search"
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm sm:text-lg"
            onChange={onSearchHandler}
            value={searchText}
          />
        </div>

        {showFilter && (
          <>
            {/* Filter */}
            <div className="min-w-[150px] flex-shrink-0 z-20">
              <ReactSelect
                id="filter_type"
                options={filterOptions}
                value={
                  filterOptions.find(
                    (opt) => opt.value === filterValue.value
                  ) || null
                }
                onChange={(val, isValid) => onFilter(val, isValid)}
              />
            </div>

            {/* Date Picker if custom filter */}
            {filterValue.value === "range" && (
              <div className="flex-shrink-0">
                <CustomDateRangePicker
                  range={dateRange}
                  setRange={setDateRange}
                />
              </div>
            )}
          </>
        )}

        {/* Starred */}
        {showStarred && (
          <button
            title="starred"
            onClick={() => onChangeMode("Starred")}
            className="flex items-center h-10 bg-[var(--btn-primary)] rounded-lg py-0.5 px-2 cursor-pointer text-lg hover:bg-[var(--btn-primaryhover)] flex-shrink-0"
          >
            <TiStarOutline className="text-xl sm:text-2xl text-[var(--dark-gold)]" />
          </button>
        )}

        {/* Missed */}
        {showMissed && (
          <button
            title="Missed"
            type="button"
            onClick={onClickMissed}
            className="flex items-center h-10 bg-[var(--btn-primary)] rounded-lg py-0.5 px-2 cursor-pointer text-lg hover:bg-[var(--btn-primaryhover)] flex-shrink-0"
          >
            <PiSealWarningBold className="text-xl sm:text-2xl text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ComponentHeader2;
