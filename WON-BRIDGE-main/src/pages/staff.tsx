import { useState, useCallback, useEffect, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";

import ComponentHeader from "@/shared/components/UIElements/ScreenHeaders/ComponentHeader";
import StaffList from "@/components/tabs/staff-list";
import StaffForm from "@/components/forms/StaffForm/StaffForm";
import {
  getStaffList,
  downloadTemp,
  importStaffExcelFile
} from "@/services/staff/staff";
import { showToast } from "@/components/UI/toast";
import SkeletonLoader from "@/components/UI/SkeletonLoaders/skeleton-loader";
import { useSearch } from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";

const itemPerPage = 30;

const Staff = () => {
  const { query, debouncedQuery, handleQueryChange } = useSearch("", 400);

  const [loading, setLoading] = useState(true);
  const [activeStaffId, setActiveStaffId] = useState<string | null>(null);
  const [isStaffTabActive, setIsStaffTabActive] = useState(false);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [UID, setUID] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  /* ---------------- REQUEST RACE GUARD ---------------- */
  const requestRef = useRef(0);

  const fetchData = useCallback(
    async (offset: number, limit: number, searchText: string) => {
      const requestId = ++requestRef.current;
      setLoading(true);

      try {
        const response = await getStaffList({
          offset,
          limit,
          search: searchText
        });

        if (requestRef.current !== requestId) return;

        setStaffList(response?.data?.data || []);
        setTotalItems(response?.data?.total || 0);
      } catch {
        if (requestRef.current === requestId) {
          showToast.error("Something went wrong.");
        }
      } finally {
        if (requestRef.current === requestId) {
          setLoading(false);
        }
      }
    },
    []
  );

  /* ---------------- PAGINATION ---------------- */
  const { currentPage, totalPages, nextPage, prevPage } = usePagination({
    totalItems,
    itemsPerPage: itemPerPage,
    initialPage: 1,
    onPageChange: () => {} // no fetch inside hook
  });

  /* ---------------- SINGLE FETCH SOURCE ---------------- */
  useEffect(() => {
    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  /* ---------------- HANDLERS ---------------- */

  const onCreateNewHandler = useCallback((id?: string | null) => {
    setActiveStaffId(id ?? null);
    setIsStaffTabActive(true);
  }, []);

  const handleCloseTab = useCallback(() => {
    setActiveStaffId(null);
    setIsStaffTabActive(false);
    setUID(null);

    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  const handleViewStaff = useCallback(
    (id: string | null, uId: string | null) => {
      setActiveStaffId(id ?? null);
      setIsStaffTabActive(true);
      setUID(uId ?? null);
    },
    []
  );

  /* ---------------- DOWNLOAD ---------------- */

  const onDownloadHandler = async () => {
    try {
      const blob = await downloadTemp();

      const urlObj = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObj;
      link.download = "staff_template.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlObj);

      showToast.success("Template downloaded successfully!");
    } catch {
      showToast.error("Failed to download template");
    }
  };

  /* ---------------- IMPORT ---------------- */

  const onImportHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await importStaffExcelFile(formData);

      if (!data?.success) {
        showToast.error(data?.message || "Import failed");
        return;
      }

      const imported = Number(data?.imported_count ?? 0);
      const skipped = Number(data?.skipped_count ?? 0);

      let message = "";
      let type: "success" | "info" | "warning" = "success";

      if (imported > 0 && skipped > 0) {
        message = `${imported} staff account${imported > 1 ? "s" : ""} imported. ${skipped} record${skipped > 1 ? "s" : ""} skipped.`;
        type = "info"; // partial success
      } else if (imported > 0) {
        message = `${imported} staff account${imported > 1 ? "s" : ""} imported successfully.`;
        type = "success";
      } else if (skipped > 0) {
        message = `No new staff imported. ${skipped} record${skipped > 1 ? "s were" : " was"} skipped.`;
        type = "warning";
      } else {
        message = "No valid records found in file.";
        type = "warning";
      }

      showToast[type](message);

      const offset = (currentPage - 1) * itemPerPage;
      await fetchData(offset, itemPerPage, debouncedQuery);
    } catch (error: any) {
      showToast.error(
        error?.response?.data?.message || "Failed to import staff"
      );
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="relative bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg min-h-0">
      {isStaffTabActive && (
        <div className="absolute inset-0 bg-black/7 rounded-lg z-10 pointer-events-none" />
      )}

      <div className="relative flex-1 h-full w-full flex flex-col min-h-0">
        <ComponentHeader
          header="Staff"
          btnText="Create"
          onClick={onCreateNewHandler}
          searchText={query}
          onSearchHandler={handleQueryChange}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemPerPage}
          onPrev={prevPage}
          onNext={nextPage}
          onDownload={onDownloadHandler}
          onImport={onImportHandler}
          bulkAction
        >
          <FiPlusCircle />
        </ComponentHeader>

        <div
          className={`flex-1 mt-2 ${
            loading ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {loading ? (
            <SkeletonLoader count={26} />
          ) : (
            <StaffList List={staffList} view={handleViewStaff} />
          )}
        </div>

        <StaffForm
          Id={activeStaffId}
          isOpen={isStaffTabActive}
          onClose={handleCloseTab}
          UID={UID}
        />
      </div>
    </div>
  );
};

export default Staff;
