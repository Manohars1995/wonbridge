import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React, { useContext } from "react";

import { WonBridgeContext } from "@/store/WonBridge-Context";
import BulkActionBtn from "./BulkActionBtn";

interface ComponentHeaderProps {
  header: string;
  btnText: string;
  children?: React.ReactNode;
  searchText?: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onClick: (id?: string | null) => void;
  onSearchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrev: () => void;
  onNext: () => void;
  onDownload?: () => void;
  onImport?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bulkAction?: boolean;
}

const ComponentHeader = ({
  header,
  btnText,
  children,
  searchText,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,

  onClick,
  onSearchHandler,
  onPrev,
  onNext,
  onDownload,
  onImport,
  bulkAction = false
}: ComponentHeaderProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1 || 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const { userRole } = useContext(WonBridgeContext);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-2 sm:p-0">
      {/* Row 1: Title + Pagination */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg sm:text-2xl font-semibold">{header}</h1>

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
      </div>

      {/* Row 2: Search + Create Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-fit h-full ">
        {/* Search */}
        <div className="flex items-center border-2 border-[var(--secondary-main)] rounded-lg px-1 h-9 w-full sm:w-60">
          <FaSearch className="text-xl sm:text-2xl mr-1 text-[var(--secondary-main)]" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full outline-none text-sm sm:text-lg"
            value={searchText}
            onChange={onSearchHandler}
          />
        </div>

        {/* Bulk Action (if admin) */}
        {bulkAction && (userRole === "super_admin" || userRole === "admin") && (
          <BulkActionBtn onDownload={onDownload} onImport={onImport} />
        )}

        {/* Create button → Plus icon on small screens */}
        <button
          aria-label={btnText || ""}
          title={btnText || ""}
          onClick={() => onClick()}
          className="flex items-center justify-center bg-[var(--btn-primary)] rounded-lg font-semibold p-2 sm:py-1 sm:px-3 cursor-pointer  text-lg hover:bg-[var(--btn-primaryhover)] whitespace-nowrap"
        >
          <span className="sm:mr-2 text-xl sm:text-xl">{children}</span>
          <span className="hidden sm:inline">{btnText || ""}</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(ComponentHeader);
