import { useState, useEffect, useCallback, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";

import ComponentHeader from "@/shared/components/UIElements/ScreenHeaders/ComponentHeader";
import ManagersList from "@/components/tabs/managers-list";
import { getManagersList } from "@/services/manager/manager";
import { showToast } from "@/components/UI/toast";
import ManagerForm from "@/components/forms/ManagerForm/ManagerForm";
import SkeletonLoader from "@/components/UI/SkeletonLoaders/skeleton-loader";
import { useSearch } from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";

interface Manager {
  id: string;
  uid?: string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

const itemPerPage = 30;

const Managers = () => {
  const { query, debouncedQuery, handleQueryChange } = useSearch("", 400);

  const [loading, setLoading] = useState(true);
  const [activeManagerId, setActiveManagerId] = useState<string | null>(null);
  const [managersData, setManagersData] = useState<Manager[]>([]);
  const [isManagerFormActive, setIsManagerFormActive] = useState(false);
  const [UID, setUID] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  /* ---------------- REQUEST RACE GUARD ---------------- */
  const requestRef = useRef(0);

  const fetchData = useCallback(
    async (offset: number, limit: number, searchText: string) => {
      const requestId = ++requestRef.current;
      setLoading(true);

      try {
        const response = await getManagersList({
          offset,
          limit,
          search: searchText
        });

        if (requestRef.current !== requestId) return;

        setManagersData(response?.data?.data || []);
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
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage
  } = usePagination({
    totalItems,
    itemsPerPage: itemPerPage,
    initialPage: 1,
    onPageChange: () => {} // no fetch inside pagination
  });

  /* ---------------- SINGLE FETCH SOURCE ---------------- */
  useEffect(() => {
    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  /* ---------------- HANDLERS ---------------- */

  const onCreateNewHandler = useCallback((id?: string | null) => {
    setActiveManagerId(id ?? null);
    setIsManagerFormActive(true);
  }, []);

  const handleCloseManagerForm = useCallback(() => {
    setActiveManagerId(null);
    setIsManagerFormActive(false);
    setUID(null);

    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  const handleViewManager = useCallback(
    (id: string | null, uId: string | null) => {
      setActiveManagerId(id ?? null);
      setIsManagerFormActive(true);
      setUID(uId ?? null);
    },
    []
  );

  return (
    <div className="relative bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg min-h-0">
      {isManagerFormActive && (
        <div className="absolute inset-0 bg-black/7 rounded-lg z-10 pointer-events-none" />
      )}

      <div className="relative flex-1 h-full w-full flex flex-col min-h-0">
        <ComponentHeader
          header="Managers"
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
            <ManagersList List={managersData} view={handleViewManager} />
          )}
        </div>

        <ManagerForm
          Id={activeManagerId}
          isOpen={isManagerFormActive}
          onClose={handleCloseManagerForm}
          uId={UID}
        />
      </div>
    </div>
  );
};

export default Managers;