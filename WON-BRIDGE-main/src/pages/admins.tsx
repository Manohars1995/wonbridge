import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";

import ComponentHeader from "@/shared/components/UIElements/ScreenHeaders/ComponentHeader";
import AdminList from "@/components/tabs/admin-list";
import { getAdminsList } from "@/services/admin/admin";
import { showToast } from "@/components/UI/toast";
import SkeletonLoader from "@/components/UI/SkeletonLoaders/skeleton-loader";
import AdminForm from "@/components/forms/AdminForm/AdminForm";
import { useSearch } from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";

interface Admin {
  _id?: string;
  custom_id?: string;
  company_name?: string | null;
  email?: string;
  phone?: string;
  image?: string;
  ownership_type?: string;
  [key:string]:unknown;
}

const itemPerPage = 30;

const Admins = () => {
  const navigate = useNavigate();
  const { query, debouncedQuery, handleQueryChange } = useSearch("", 600);

  const [loading, setLoading] = useState(true);
  const [isAdminFormActive, setIsAdminFormActive] = useState(false);
  const [activeAdminId, setActiveAdminId] = useState<string | null>(null);
  const [adminsData, setAdminsData] = useState<Admin[]>([]);
  const [UID, setUID] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  /* ---------------- REQUEST RACE GUARD ---------------- */
  const requestRef = useRef(0);

  const fetchData = useCallback(
    async (offset: number, limit: number, searchText: string) => {
      const requestId = ++requestRef.current;
      setLoading(true);

      try {
        const response = await getAdminsList({
          offset,
          limit,
          search: searchText
        });

        if (requestRef.current !== requestId) return;

        setAdminsData(response?.data?.data || []);
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
    onPageChange: () => {} // no fetch here
  });

  /* ---------------- SINGLE SOURCE FETCH ---------------- */
  useEffect(() => {
    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  /* ---------------- HANDLERS ---------------- */

  const onCreateNewHandler = useCallback((id?: string | null) => {
    setActiveAdminId(id ?? null);
    setIsAdminFormActive(true);
  }, []);

  const onCloseAdminForm = useCallback(() => {
    setIsAdminFormActive(false);
    setActiveAdminId(null);
    setUID(null);

    const offset = (currentPage - 1) * itemPerPage;
    fetchData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, fetchData]);

  const onViewHandler = useCallback((id: string | null, uId: string | null) => {
    setActiveAdminId(id ?? null);
    setIsAdminFormActive(true);
    setUID(uId ?? null);
  }, []);

  const onTransit = (id?: string) => {
    if (!id) return;
    navigate(`/transit-history/${id}`);
  };

  const onWeighmentsHandler = (id?: string) => {
    if (!id) return;
    navigate(`/weighments/${id}`);
  };

  return (
    <div className="relative bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg">
      {isAdminFormActive && (
        <div
          className="absolute inset-0 bg-black/7 rounded-lg z-10"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <div className="relative flex-1 h-full w-full flex flex-col min-h-0">
        <ComponentHeader
          header="Admins"
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
            <AdminList
              List={adminsData}
              view={onViewHandler}
              onTransit={onTransit}
              onWeighments={onWeighmentsHandler}
            />
          )}
        </div>

        <AdminForm
          Id={activeAdminId}
          isOpen={isAdminFormActive}
          onClose={onCloseAdminForm}
          UID={UID}
        />
      </div>
    </div>
  );
};

export default Admins;
