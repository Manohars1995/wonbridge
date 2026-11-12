import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ComponentHeader2 from "@/shared/components/UIElements/ScreenHeaders/ComponentHeader-2";
import WeighmentHistoryList from "@/components/tabs/Weighment/weighment-history-list";

import WeighmentForm from "@/components/forms/WeighmentForm/WeighmentForm";
import SkeletonLoader from "@/components/UI/SkeletonLoaders/skeleton-loader";

import { getTransits, getWeighments } from "@/services/transits/transits";
import { mapToWighment } from "@/components/tabs/Weighment/utils";
import { useSearch } from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import useDebounce from "@/hooks/useDebounce";

type DateRangeType = {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
};

const itemPerPage = 30;

const Weighments = () => {
  const { id: admin_id } = useParams();
  const navigate = useNavigate();
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
  const [msg, setMsg] = useState("");

  const getData = useCallback(
    async (offset: number, limit: number, searchText: string) => {
      setLoading(true);

      try {
        const params: any = {
          offset,
          limit,
          search: searchText,
          filter: filterType.value
        };

        // convert dates to ISO String
        if (filterType.value === "range") {
          params.startDate = range[0].startDate?.toISOString();
          params.endDate = range[0].endDate?.toISOString();
        }

        const response = await getWeighments(admin_id || "", params);

        if (response?.data?.success) {
          setData(response.data.data);
          setMsg(response?.data?.message);
          setTotalItems(response.data.total || 0);
        }
      } finally {
        setLoading(false);
      }
    },
    [admin_id, filterType, range]
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
    setUID(null);

    const offset = (currentPage - 1) * itemPerPage;
    getData(offset, itemPerPage, debouncedQuery);
  };

  const onFilterHandler = (val: string, isValid: boolean) => {
    setFilterType({ value: val, isValid: isValid });
  };

  const onChangeModeHandler = (val: string) => {
    setTitle(val);
  };

  const onClickMissedHandler = () => {
    console.log("consider this", admin_id);
    if (!admin_id) return;
    navigate(`/missed/weighments/${admin_id}`);
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
          header="Weighments"
          onClick={() => ""}
          onFilter={onFilterHandler}
          filterValue={filterType}
          dateRange={range}
          setDateRange={setRange}
          onChangeMode={onChangeModeHandler}
          onClickMissed={onClickMissedHandler}
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
            <WeighmentHistoryList
              msg={msg}
              List={data}
              view={handleViewWeight}
            />
          )}
        </div>
        <WeighmentForm
          Id={activeWeighmentId || ""}
          isOpen={isWeighTabActive}
          onClose={handleCloseTab}
          UID={UID}
        />
      </div>
    </div>
  );
};

export default Weighments;
