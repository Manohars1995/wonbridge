import { useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import isEqual from "lodash.isequal";

import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import AvtarImage from "@/shared/components/UIElements/AvatarImagePicker";
import { showToast } from "@/components/UI/toast";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
  getManagerById,
  createManager,
  updateManagerById
} from "@/services/manager/manager";
import { useOwnersOptions } from "@/components/UIElements/Input-Elements/dropdown-options"; // import for dropdown options
import ManagerFormFields from "./ManagerFormFields";
import { WonBridgeContext } from "@/store/WonBridge-Context";

import type { stateVals } from "./utils";
import {
  initialManagerFormState
  // extractFormValues
} from "./utils";
import type { registerManager } from "@/services/manager/manager-interfaces";
import FormSkeleton from "@/components/UI/SkeletonLoaders/skeleton-form-loader";
import {
  extractFormValues,
  flattenFormData,
  isFormValid
} from "@/components/forms/utils";
import usePostcodeAutofill, {
  type PincodeResponse
} from "@/hooks/usePostcodeAutofill";

interface propVals {
  Id: string | null;
  isOpen: boolean;
  onClose: () => void;
  uId?: string | null;
}
const optional_fields = ["date_of_resignation"];

const ManagerForm = ({ Id, isOpen, onClose, uId }: propVals) => {
  const { userID } = useContext(WonBridgeContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [managerDetails, setManagerDetails] = useState<stateVals>({
    ...initialManagerFormState,
    admin_id: { value: userID, isValid: true }
  });
  const [managerDetailsOriginal, setManagerDetailsOriginal] =
    useState<stateVals>({
      ...initialManagerFormState
    });
  const { adminLoading, adminOptions } = useOwnersOptions();
  const [pincodeDirty, setPincodeDirty] = useState(false);

  const navRef = useOutsideClick<HTMLDivElement>(() => onClose(), isOpen);

  // ------------- Load data ---------------
  const loadManagerData = useCallback(async () => {
    if (!uId) return;
    setIsDataLoading(true);
    try {
      const res = await getManagerById(uId);
      const backendData = res.data.data || {};
      console.log(backendData, "backend datooo");

      // Calling the utility function to flatten the data
      const newManagerDetails = flattenFormData<stateVals>(
        backendData,
        initialManagerFormState,
        {
          dateKeys: ["date_of_joining", "date_of_resignation"],
          addressKeys: ["street", "district", "city", "state", "pincode"]
        }
      );

      setManagerDetails(newManagerDetails);
      setManagerDetailsOriginal(newManagerDetails);
      setPincodeDirty(false);
    } catch (err: any) {
      const response = err?.response?.data;

      if (response?.message) {
        showToast.error(response.message);
      } else {
        showToast.error("Failed to load manager data.");
      }
    } finally {
      setIsDataLoading(false);
    }
  }, [uId]);

  useEffect(() => {
    if (!isOpen) return;

    if (uId) {
      loadManagerData();
    } else {
      setManagerDetails({
        ...initialManagerFormState,
        admin_id: { value: userID, isValid: true }
      });
    }
  }, [uId, loadManagerData, userID, isOpen]);

  // auto fill pincode data
  const handleAutofill = useCallback((data: PincodeResponse) => {
    setManagerDetails((prev) => ({
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
  const { loading: postCodeLoading } = usePostcodeAutofill({
    postcode: managerDetails.pincode.value,
    enabled: pincodeDirty,
    onAutofill: handleAutofill
  });

  const handleInputChange = useCallback(
    async (field: keyof stateVals, val: string | boolean, isValid: boolean) => {
      if (field === "pincode") {
        setPincodeDirty(true);
      }

      setManagerDetails((prev) => ({
        ...prev,
        [field]: { value: val, isValid }
      }));
    },
    []
  );

  // ---------- validation ----------
  const result = isFormValid(managerDetails, optional_fields);
  console.log(result, "manager result");

  const onAddHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!result.isValid) {
      console.log(result, "manager result");
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);
    const payload = extractFormValues(managerDetails);
    const originalPayload = extractFormValues(managerDetailsOriginal);

    const changes: Partial<registerManager> = {};
    for (const key in payload) {
      const typedKey = key as keyof registerManager;

      if (
        payload[typedKey] !== undefined &&
        !isEqual(payload[typedKey], originalPayload[typedKey])
      ) {
        changes[typedKey] = payload[typedKey];
      }
    }

    if (Object.keys(changes).length === 0) {
      showToast.info("No changes detected.");
      setIsLoading(false);
      return;
    }

    const userID = managerDetails?.admin_id?.value;

    try {
      if (uId) {
        await updateManagerById(uId, changes as registerManager);
        showToast.success("Manager updated successfully.");
      } else {
        await createManager(payload as registerManager, userID);
        showToast.success("Manager created successfully.");
      }
      onClose();
    } catch (error: any) {
      const response = error?.response?.data;

      if (response?.message) {
        showToast.error(response.message);
      } else {
        showToast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`flex flex-col justify-between absolute top-0 p-3 overflow-hidden
    ${isOpen ? "right-0" : "-right-6"}
    h-full bg-[var(--background-secondary)] rounded-lg shadow-lg transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "translate-x-full"}
    w-full sm:w-[20rem] md:w-[24rem] lg:w-[28rem]
  `}
    >
      {isDataLoading ? (
        <FormSkeleton onClose={onClose} />
      ) : (
        <>
          <RightTabHeader
            onClose={onClose}
            checked={managerDetails?.status.value}
            toggleStatus={(val, isValid) =>
              handleInputChange("status", val, isValid)
            }
            isToggleActive={true}
          >
            Manager - {Id ?? "New"}
          </RightTabHeader>
          <div className="overflow-y-auto flex flex-col h-[85%] p-2">
            <AvtarImage
              value={managerDetails?.image.value}
              onChangeVal={(val, isValid) =>
                handleInputChange("image", val, isValid)
              }
            />
            {/* Render ManagerFormFields */}
            <ManagerFormFields
              managerDetails={managerDetails}
              handleInputChange={handleInputChange}
              adminOptions={adminOptions}
              adminLoading={adminLoading}
              postCodeLoading={postCodeLoading}
            />
          </div>
          <BtnTag
            BtnText={Id ? "Update" : "Add"}
            type="button"
            loading={isLoading}
            disabled={!result.isValid}
            styles="border-2 border-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-[var(--primary-contrastText)] text-[var(--accent-blue)]"
            onClick={onAddHandler}
          />
        </>
      )}
    </nav>
  );
};

export default React.memo(ManagerForm);
