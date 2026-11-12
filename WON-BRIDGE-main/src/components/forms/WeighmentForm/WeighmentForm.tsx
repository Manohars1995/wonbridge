import { useState, useContext, useEffect, useCallback } from "react";

// component imports
import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import WeighmentFormFields from "./WeighmentFormFields";
import type { StagedWeighmentState, propVals } from "./utils";
import { initialStagedWeighmentState } from "./utils";
import FormSkeleton from "@/components/UI/SkeletonLoaders/skeleton-form-loader";
import { showToast } from "@/components/UI/toast";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
  getWeightById,
  updateStatusOfWeight
} from "@/services/transits/transits";

import {
  extractFormValues,
  flattenFormData
} from "@/components/forms/utils";
import { WonBridgeContext } from "@/store/WonBridge-Context";

const WeighmentForm = ({
  Id,
  isOpen,
  onClose,
  UID,
  type = "PENDING"
}: propVals) => {
  const { userID } = useContext(WonBridgeContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [WeighmentData, setWeighmentData] = useState<StagedWeighmentState>({
    ...initialStagedWeighmentState,
    admin_id: { value: userID, isValid: true }
  });

  const [modalRef, setModalRef] = useState<HTMLElement | null>(null);
  const navRef = useOutsideClick<HTMLDivElement>(
    () => onClose(),
    isOpen,
    [modalRef] // <-- Pass the element to ignore here
  );

  const LoadData = useCallback(async () => {
    if (!UID) return;
    setIsDataLoading(true);
    try {
      const response = await getWeightById(UID);
      const backendData = response.data.data || {};
      console.log(backendData, "weighment by id");

      // Call utility function to flatten the data
      const newWeighmentDetails = flattenFormData<StagedWeighmentState>(
        backendData,
        initialStagedWeighmentState,
        {}
      );
      setWeighmentData(newWeighmentDetails);
    } catch (err) {
      showToast.error("Failed to load supplier data.");
    } finally {
      setIsDataLoading(false);
    }
  }, [UID]);

  useEffect(() => {
    if (UID) {
      LoadData();
    } else {
      setWeighmentData({
        ...initialStagedWeighmentState,
        admin_id: { value: userID, isValid: true }
      });
    }
  }, [UID, LoadData]);

  const handleInputChange = useCallback(
    (
      field: keyof StagedWeighmentState,
      val: string | string[] | boolean | number,
      isValid: boolean
    ) => {
      const updatedState = {
        ...WeighmentData,
        [field]: { value: val, isValid }
      };

      setWeighmentData(updatedState);

     
    },
    [WeighmentData]
  );

  const onSubmitHandler = async (
    status: string,
    id: string,
    admin_id: string
  ) => {
    setIsLoading(true);

    try {
      await updateStatusOfWeight(id, admin_id, status);
      showToast.success("Status updated successfully.");
      onClose();
    } catch (err) {
      showToast.error("Something went wrong.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`z-[100] flex flex-col justify-between absolute top-0 p-3 overflow-hidden
    ${isOpen ? "right-0" : "-right-6"}
    h-full bg-[var(--background-secondary)] rounded-lg shadow-lg transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "translate-x-full"}
    w-full sm:w-[25rem] md:w-[36rem] lg:w-[45rem]
  `}
    >
      {isDataLoading ? (
        <FormSkeleton onClose={onClose} />
      ) : (
        <>
          <RightTabHeader
            onClose={onClose}
            // checked={TransitData?.status.value}
            toggleStatus={(val, isValid) =>
              handleInputChange("status", val, isValid)
            }
          >
            Weighment - {Id ?? "New"}
          </RightTabHeader>

          <div className="overflow-y-auto flex flex-col h-[85%] p-2">
            <WeighmentFormFields
              weighmentDetails={WeighmentData}
              handleInputChange={handleInputChange}
              setModalRef={setModalRef}
            />
          </div>

          {WeighmentData?.status?.value === "PENDING" && (
            <div className="grid gap-5 mt-2 w-full">
              <BtnTag
                BtnText="Mark as Reviewed"
                type="button"
                loading={isLoading}
                styles="border-2 border-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-[var(--primary-contrastText)] text-[var(--accent-blue)]"
                onClick={() =>
                  onSubmitHandler(
                    "ASSIGNED",
                    WeighmentData?._id?.value,
                    WeighmentData?.admin_id?.value
                  )
                }
              />
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default WeighmentForm;
