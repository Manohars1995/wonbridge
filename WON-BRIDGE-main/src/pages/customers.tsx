import { useState, useEffect, useCallback, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";

import ComponentHeader from "@/shared/components/UIElements/ScreenHeaders/ComponentHeader";
import CustomersList from "@/components/tabs/customers-list";
import { showToast } from "@/components/UI/toast";
import CustomerForm from "@/components/forms/CustomerForm/CustomerForm";
import { getCustomerList } from "@/services/customer/customer";
import SkeletonLoader from "@/components/UI/SkeletonLoaders/skeleton-loader";
import { useSearch } from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import {
  downloadCustomerTemp,
  importCustomerExcelFile
} from "@/services/customer/customer";
import { toast } from "sonner";

interface Customer {
  _id?: string;
  custom_id?: string;
  contact_person?: string;
  email?: string | null;
  phone?: string | null;
  image?: string;
  material_types?: string[];
}

const itemPerPage = 30;

const Customers = () => {
  const { query, debouncedQuery, handleQueryChange } = useSearch("", 400);

  const [loading, setLoading] = useState(true);
  const [activeCustomerId, setActiveCustomerId] = useState<string | null>(null);
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [isCustomerFormActive, setIsCustomerFormActive] = useState(false);
  const [UID, setUID] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  /* ---------------- REQUEST RACE GUARD ---------------- */
  const requestRef = useRef(0);

  const fetchData = useCallback(
    async (offset: number, limit: number, searchText: string) => {
      const requestId = ++requestRef.current;
      setLoading(true);

      try {
        const response = await getCustomerList({
          offset,
          limit,
          search: searchText
        });

        if (requestRef.current !== requestId) return;

        setCustomerList(response?.data?.data || []);
        setTotalItems(response?.data?.total || 0);
      } catch (error) {
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
    onPageChange: () => {} // no internal fetching
  });

  /* ---------------- SINGLE FETCH SOURCE ---------------- */
  useEffect(() => {
    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  /* ---------------- HANDLERS ---------------- */

  const handleViewCustomer = useCallback(
    (id: string | null, uId: string | null) => {
      setActiveCustomerId(id ?? null);
      setIsCustomerFormActive(true);
      setUID(uId ?? null);
    },
    []
  );

  const onCloseCustomerForm = useCallback(() => {
    setIsCustomerFormActive(false);
    setActiveCustomerId(null);
    setUID(null);

    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  const onCreateNewHandler = useCallback((id?: string | null) => {
    setIsCustomerFormActive(true);
    setActiveCustomerId(id ?? null);
  }, []);

  /* ---------------- DOWNLOAD ---------------- */

  const onDownloadHandler = async () => {
    try {
      const blob: Blob = await downloadCustomerTemp();

      const urlObj = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObj;
      link.download = "customer_template.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlObj);

      showToast.success("Template downloaded successfully!");
    } catch (err) {
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
      const { data } = await importCustomerExcelFile(formData);

      if (!data?.success) {
        showToast.error(data?.message || "Import failed");
        return;
      }

      const imported = Number(data?.imported_count ?? 0);
      const skipped = Number(data?.skipped_count ?? 0);

      let message = "";
      let type: "success" | "info" | "warning" = "success";

      if (imported > 0 && skipped > 0) {
        message = `${imported} customer${imported > 1 ? "s" : ""} imported. ${skipped} duplicate${skipped > 1 ? "s" : ""} ignored.`;
        type = "info"; // partial success
      } else if (imported > 0) {
        message = `${imported} customer${imported > 1 ? "s" : ""} imported successfully.`;
        type = "success";
      } else if (skipped > 0) {
        message = `No new customers imported. ${skipped} duplicate${skipped > 1 ? "s were" : " was"} ignored.`;
        type = "warning";
      } else {
        message = "No valid records found in file.";
        type = "warning";
      }

      showToast[type](message);

      const offset = (currentPage - 1) * itemPerPage;
      await fetchData(offset, itemPerPage, debouncedQuery);
    } catch {
      showToast.error("Failed to import customers");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="relative bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg min-h-0">
      {isCustomerFormActive && (
        <div
          className="fixed inset-0 bg-black/7 z-50"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <div className="relative flex-1 h-full w-full flex flex-col min-h-0">
        <ComponentHeader
          header="Customers"
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
            <CustomersList List={customerList} view={handleViewCustomer} />
          )}
        </div>

        <CustomerForm
          Id={activeCustomerId}
          isOpen={isCustomerFormActive}
          onClose={onCloseCustomerForm}
          UID={UID}
        />
      </div>
    </div>
  );
};

export default Customers;
