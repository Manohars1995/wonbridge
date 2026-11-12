import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import ComponentHeader2 from "@/shared/components/UIElements/ScreenHeaders/ComponentHeader-2";
import WeighmentHistoryList from "@/components/tabs/Weighment/weighment-history-list";

import WeighmentForm from "@/components/forms/WeighmentForm/WeighmentForm";
import SkeletonLoader from "@/components/UI/SkeletonLoaders/skeleton-loader";

import { getWeighments, getMissedWeights } from "@/services/transits/transits";
import { mapToWighment } from "@/components/tabs/Weighment/utils";
import usePagination from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import useDebounce from "@/hooks/useDebounce";

type DateRangeType = {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
};

const itemPerPage = 30;

const MissedWeighments = () => {
  const { id: admin_id } = useParams();
  const { query, debouncedQuery, handleQueryChange } = useSearch("", 600);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeWeighmentId, setActiveWeighmentId] = useState<string | null>(
    null
  );
  const [isWeighTabActive, setIsWeighTabActive] = useState(false);
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
    async (offset = 0, limit = 20, searchText = "") => {
      setLoading(true);
      try {
        const params: any = {
          offset,
          limit,
          search: searchText
        };
        const response = await getMissedWeights(admin_id || "", params);

        if (response?.data?.success) {
          const raw = response.data.data;

          // MAP RAW DATA TO STRUCTURED Transit[]
          const structured = raw.map((item: any) => mapToWighment(item));

          setData(structured);
          setTotalItems(response.data.total || 0);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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

  useEffect(() => {
    const offset = (currentPage - 1) * itemPerPage;
    getData(offset, itemPerPage, debouncedQuery);
  }, [currentPage, debouncedQuery, getData]);

  const handleViewWeight = useCallback(
    (id: string | null, uId: string | null) => {
      setActiveWeighmentId(id ?? null);
      setIsWeighTabActive(true);
      setUID(uId ?? null);
    },
    []
  );

  const handleCloseTab = () => {
    setActiveWeighmentId(null);
    setIsWeighTabActive(false);
  };

  const onFilterHandler = (val: string, isValid: boolean) => {
    setFilterType({ value: val, isValid: isValid });
  };

  const onChangeModeHandler = (val: string) => {
    setTitle(val);
  };

  return (
    <div className="relative bg-[var(--background-default)] flex flex-col flex-1 w-full h-full p-2 rounded-lg">
      {isWeighTabActive && (
        <div
          className="absolute inset-0 bg-black/7 rounded-lg z-10 "
          onClick={(e) => e.stopPropagation()}
        ></div>
      )}
      <div className="relative flex-1 h-full w-full flex flex-col min-h-0 ">
        <ComponentHeader2
          header="Missed-Weighments"
          onClick={() => ""}
          onFilter={onFilterHandler}
          filterValue={filterType}
          dateRange={range}
          setDateRange={setRange}
          onChangeMode={onChangeModeHandler}
          showMissed={false}
          showStarred={false}
          showFilter={false}
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
            <WeighmentHistoryList List={data} view={handleViewWeight} />
          )}
        </div>
        <WeighmentForm
          Id={activeWeighmentId || ""}
          isOpen={isWeighTabActive}
          onClose={handleCloseTab}
          UID={UID}
          type="missed"
        />
      </div>
    </div>
  );
};

export default MissedWeighments;
