import { useState, useContext, useEffect, useCallback } from "react";

// component imports
import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import TransitFormFields from "./TransitFormFields";
import type { stateVals, propVals } from "./utils";
import { initialWeightState } from "./utils";
import FormSkeleton from "@/components/UI/SkeletonLoaders/skeleton-form-loader";
import { showToast } from "@/components/UI/toast";
import type { RegisterSupplier } from "@/services/supplier/supplier-interfaces";
import useOutsideClick from "@/hooks/useOutsideClick";

// services import
import {
  updateSupplier,
  createSupplier,
  getSupplierById
} from "@/services/supplier/supplier";

import { getTransitById } from "@/services/transits/transits";

import { extractFormValues, flattenFormData } from "@/components/forms/utils";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import usePostcodeAutofill, {
  type PincodeResponse
} from "@/hooks/usePostcodeAutofill";

const TransitForm = ({ Id, isOpen, onClose, UID }: propVals) => {
  const { userID } = useContext(WonBridgeContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [TransitData, setTransitData] = useState<stateVals>({
    ...initialWeightState,
    admin_id: { value: userID, isValid: true }
  });

  const [modalRef, setModalRef] = useState<HTMLElement | null>(null);
  const [pincodeDirty, setPincodeDirty] = useState(false);

  const navRef = useOutsideClick<HTMLDivElement>(
    () => onClose(),
    isOpen,
    [modalRef] // <-- Pass the element to ignore here
  );

  const LoadData = useCallback(async () => {
    if (!UID) return;
    setIsDataLoading(true);
    try {
      const res = await getTransitById(UID);
      const backendData = res.data.data || {};
      console.log(backendData, "transoit by id");

      // Call utility function to flatten the data
      const newManagerDetails = flattenFormData<stateVals>(
        backendData,
        initialWeightState,
        {}
      );
      setTransitData(newManagerDetails);
    } catch (err: any) {
      showToast.error(
        err?.response?.data?.message ?? "Something went wrong."
      );
    } finally {
      setIsDataLoading(false);
    }
  }, [UID]);

  useEffect(() => {
    if (UID) {
      LoadData();
    } else {
      setTransitData({
        ...initialWeightState,
        admin_id: { value: userID, isValid: true }
      });
    }
  }, [UID, userID, LoadData]);

  // auto fill pincode data
  const handleAutofill = useCallback((data: PincodeResponse) => {
    setTransitData((prev) => ({
      ...prev,
      state: {
        value: data.state ?? "",
        isValid: true
      },
      city: {
        value: data.city ?? "",
        isValid: true
      },
      district: {
        value: data.district ?? "",
        isValid: true
      },
      street: data.street ? { value: data.street, isValid: true } : prev.street
    }));
  }, []); // Empty dependency array, function reference stays the same

  // Pass the memoized function to the hook
  // const { loading: postCodeLoading } = usePostcodeAutofill({
  //   postcode: TransitData.pincode.value,
  //   enabled: pincodeDirty,
  //   onAutofill: handleAutofill
  // });

  const handleInputChange = useCallback(
    (
      field: keyof stateVals,
      val: string | string[] | boolean | number,
      isValid: boolean
    ) => {
      const updatedState = {
        ...TransitData,
        [field]: { value: val, isValid }
      };

      setTransitData(updatedState);
    },
    []
  );

  const isFormValid = useCallback((): boolean => {
    return Object.entries(TransitData).every(([key, field]) => {
      if (key === "image" || key === "status") return true;
      return field.isValid;
    });
  }, [TransitData]);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!isFormValid()) {
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);
    const payload = extractFormValues(TransitData);
    try {
      if (UID) {
        await updateSupplier(UID, payload as RegisterSupplier);
        showToast.success("Supplier updated successfully.");
      } else {
        await createSupplier(payload as RegisterSupplier);
        showToast.success("Supplier created successfully.");
      }
      onClose();
    } catch (error) {
      showToast.error("Something went wrong.");
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
            Transit - {Id ?? "New"}
          </RightTabHeader>

          <div className="overflow-y-auto flex flex-col h-[85%] p-2">
            <TransitFormFields
              transitDetails={TransitData}
              handleInputChange={handleInputChange}
              setModalRef={setModalRef}
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mt-2 w-full">
            <BtnTag
              BtnText="Mark as Reviewed"
              type="button"
              loading={isLoading}
              disabled={!isFormValid()}
              styles="border-2 border-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-[var(--primary-contrastText)] text-[var(--accent-blue)] text-sm "
              onClick={onSubmitHandler}
            />
            <BtnTag
              BtnText={"Update"}
              type="button"
              loading={isLoading}
              disabled={!isFormValid()}
              styles="border-2 border-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-[var(--primary-contrastText)] text-[var(--accent-blue)]"
              onClick={onSubmitHandler}
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default TransitForm;
