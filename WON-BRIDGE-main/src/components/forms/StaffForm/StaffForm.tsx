import React, { useState, useContext, useEffect, useCallback } from "react";
import isEqual from "lodash.isequal";

import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import AvtarImage from "@/shared/components/UIElements/AvatarImagePicker";
import StaffFormFields from "./StaffFormFields";
import type { stateVals } from "./utils";
import { initialStaffState } from "./utils";
import { showToast } from "@/components/UI/toast";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
  updateStaffById,
  createStaff,
  getStaffById
} from "@/services/staff/staff";
import { WonBridgeContext } from "@/store/WonBridge-Context";

import type { RegisterStaff } from "@/services/staff/staff-interfaces";
import { useOwnersOptions } from "@/components/UIElements/Input-Elements/dropdown-options"; // import for dropdown options
import FormSkeleton from "@/components/UI/SkeletonLoaders/skeleton-form-loader";
import {
  extractFormValues,
  flattenFormData,
  isFormValid
} from "@/components/forms/utils";
import type { PincodeResponse } from "@/hooks/usePostcodeAutofill";
import usePostcodeAutofill from "@/hooks/usePostcodeAutofill";

interface propVals {
  Id: string | null;
  isOpen: boolean;
  onClose: () => void;
  UID?: string | null;
}

const optionalFields = ["date_of_resignation", "image"];

const StaffForm = ({ Id, isOpen, onClose, UID }: propVals) => {
  const { userID } = useContext(WonBridgeContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [staffDetails, setStaffDetails] = useState<stateVals>({
    ...initialStaffState,
    admin_id: { value: userID, isValid: true }
  });
  const [staffDetailsOriginal, setStaffDetailsOriginal] = useState<stateVals>({
    ...initialStaffState
  });
  const [pincodeDirty, setPincodeDirty] = useState(false);

  const { adminLoading, adminOptions } = useOwnersOptions();
  const navRef = useOutsideClick<HTMLDivElement>(() => onClose(), isOpen);

  const loadStaffData = useCallback(async () => {
    if (!UID) return;
    setIsDataLoading(true);
    try {
      const res = await getStaffById(UID);
      const backendData = res.data.data || {};

      //  Calling the utility function to flatten the data
      const newManagerDetails = flattenFormData<stateVals>(
        backendData,
        initialStaffState,
        {
          dateKeys: ["date_of_joining", "date_of_resignation"],
          addressKeys: ["street", "district", "city", "state", "pincode"]
        }
      );

      setStaffDetails(newManagerDetails);
      setStaffDetailsOriginal(newManagerDetails);
      setPincodeDirty(false);
    } catch (err: any) {
      const response = err?.response?.data;

      if (response?.message) {
        showToast.error(response.message);
      } else {
        showToast.error("Failed to load staff data.");
      }
    } finally {
      setIsDataLoading(false);
    }
  }, [UID]);

  useEffect(() => {
    if (!isOpen) return;

    if (UID) {
      loadStaffData();
    } else {
      setStaffDetails({
        ...initialStaffState,
        admin_id: { value: userID, isValid: true }
      });
    }
  }, [UID, loadStaffData, isOpen, userID]);

  // auto fill pincode data
  const handleAutofill = useCallback((data: PincodeResponse) => {
    setStaffDetails((prev) => ({
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
    postcode: staffDetails.pincode.value,
    enabled: pincodeDirty,
    onAutofill: handleAutofill
  });

  const handleInputChange = useCallback(
    (field: keyof stateVals, val: string | boolean, isValid: boolean) => {
      if (field === "pincode") {
        setPincodeDirty(true);
      }

      setStaffDetails((prev) => ({
        ...prev,
        [field]: { value: val, isValid }
      }));
    },
    []
  );

  // ---------- validation ----------
  const result = isFormValid(staffDetails, optionalFields);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!result.isValid) {
      console.log(result, "staff result");
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);
    const payload = extractFormValues(staffDetails);
    const originalPayload = extractFormValues(staffDetailsOriginal);

    const changes: Partial<RegisterStaff> = {};
    for (const key in payload) {
      const typedKey = key as keyof RegisterStaff;
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

    const userID = staffDetails?.admin_id?.value;
    try {
      if (UID) {
        await updateStaffById(UID, changes as RegisterStaff);
        showToast.success("Staff updated successfully.");
      } else {
        await createStaff(payload as RegisterStaff, userID);
        showToast.success("Staff created successfully.");
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

    console.log("submited", staffDetails);
  };

  //JSX
  return (
    <nav
      ref={navRef}
      className={`flex z-50 flex-col justify-between absolute top-0 p-3 overflow-hidden
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
            checked={staffDetails?.status.value}
            toggleStatus={(val, isValid) =>
              handleInputChange("status", val, isValid)
            }
            isToggleActive={true}
          >
            Staff - {Id ?? "New"}
          </RightTabHeader>

          <div className="overflow-y-auto flex flex-col h-[85%] p-2">
            <AvtarImage
              value={staffDetails?.image.value}
              onChangeVal={(val, isValid) =>
                handleInputChange("image", val, isValid)
              }
            />
            <StaffFormFields
              staffDetails={staffDetails}
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
            onClick={onSubmitHandler}
          />
        </>
      )}
    </nav>
  );
};

export default React.memo(StaffForm);
