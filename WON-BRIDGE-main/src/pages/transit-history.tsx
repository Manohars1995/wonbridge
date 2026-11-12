// src/pages/transit-history.tsx

import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import ComponentHeader2 from "@/shared/components/UIElements/ScreenHeaders/ComponentHeader-2";
import TransitHistoryList from "@/components/tabs/Transit/transit-history-list";

import TransitForm from "@/components/forms/TransitForm/TransitForm";
import SkeletonLoader from "@/components/UI/SkeletonLoaders/skeleton-loader";

import { getTransits } from "@/services/transits/transits";
import { mapToTransit } from "@/components/tabs/Transit/utils";
import usePagination from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";

type DateRangeType = {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
};

const itemPerPage = 30;

const TransitHistory = () => {
  const { id: admin_id } = useParams();
  const { query, debouncedQuery, handleQueryChange } = useSearch("", 600);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeSupplyId, setActiveSupplyId] = useState<string | null>(null);
  const [isSupplyTabActive, setIsSupplyTabActive] = useState(false);
  const [UID, setUID] = useState<string | null>(null);
  const [filterType, setFilterType] = useState({
    value: "today",
    isValid: true
  });
  const [title, setTitle] = useState("Weigh");
  const [totalItems, setTotalItems] = useState(0);

  const [range, setRange] = useState<DateRangeType[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection"
    }
  ]);

  const getData = useCallback(
    async (offset = 0, limit = itemPerPage, searchText = "") => {
      setLoading(true);
      try {
        const params: any = {
          offset,
          limit,
          search: searchText,
          filter: filterType.value
        };

        if (filterType.value === "range") {
          params.startDate = range[0].startDate?.toISOString();
          params.endDate = range[0].endDate?.toISOString();
        }

        console.log(">>> SENDING PARAMS:", params); // ← add this
        console.log(">>> admin_id:", admin_id);

        const response = await getTransits(admin_id || "", params);
         console.log(">>> RESPONSE:", response); 

        if (response?.data?.success) {
          const raw = response.data.data;
          const structured = raw.map((item: any) => mapToTransit(item));
          setData(structured);
          setTotalItems(response.data.total ?? 0); // ← was never set
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [filterType, range, admin_id]
  );

  /* ---------------- PAGINATION ---------------- */
  const { currentPage, totalPages, nextPage, prevPage } = usePagination({
    totalItems,
    itemsPerPage: itemPerPage,
    initialPage: 1,
    onPageChange: (page, offset, limit) => {
      getData(offset, limit, debouncedQuery);
    }
  });

  // Refetch when filter or search changes (reset to page 1)
  useEffect(() => {
    getData(0, itemPerPage, debouncedQuery);
  }, [filterType, range, debouncedQuery]);

  const handleViewTransit = useCallback(
    (id: string | null, uId: string | null) => {
      setActiveSupplyId(id ?? null);
      setIsSupplyTabActive(true);
      setUID(uId ?? null);
    },
    []
  );

  const handleCloseTab = () => {
    setActiveSupplyId(null);
    setIsSupplyTabActive(false);
  };

  const onFilterHandler = (val: string, isValid: boolean) => {
    setFilterType({ value: val, isValid: isValid });
  };

  const onChangeModeHandler = (val: string) => {
    setTitle(val);
  };

  return (
    <div className="relative bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg">
      {isSupplyTabActive && (
        <div
          className="absolute inset-0 bg-black/7 rounded-lg z-10 "
          onClick={(e) => e.stopPropagation()}
        ></div>
      )}
      <div className="relative flex-1 h-full w-full flex flex-col min-h-0 ">
        <ComponentHeader2
          header="Transits"
          onClick={() => ""}
          onFilter={onFilterHandler}
          filterValue={filterType}
          dateRange={range}
          setDateRange={setRange}
          onChangeMode={onChangeModeHandler}
          showMissed={false}
          searchText={query}
          onSearchHandler={handleQueryChange}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={20}
          onPrev={prevPage}
          onNext={nextPage}
        />
        <div
          className={`flex-1  mt-2 ${
            loading ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {loading ? (
            <SkeletonLoader count={26} />
          ) : (
            <TransitHistoryList List={data} view={handleViewTransit} />
          )}
        </div>
        <TransitForm
          Id={activeSupplyId || ""}
          isOpen={isSupplyTabActive}
          onClose={handleCloseTab}
          UID={UID}
        />
      </div>
    </div>
  );
};

export default TransitHistory;
