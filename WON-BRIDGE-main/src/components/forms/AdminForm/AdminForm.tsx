import React, { useState, useEffect, useCallback } from "react";
import isEqual from "lodash.isequal";

import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import { showToast } from "@/components/UI/toast";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
  register,
  getAdminById,
  updateAdminById
} from "@/services/admin/admin";

import { extractFormValues } from "./utils";
import AdminFormFields from "./AdminFormFields";
import type { propVals, stateVals } from "./utils";
import { initialAdminState, flattenData } from "./utils";
import type { registerAdmin } from "@/services/admin/admin-interfaces";
import FormSkeleton from "@/components/UI/SkeletonLoaders/skeleton-form-loader";
import { isFormValid } from "@/components/forms/utils";
import usePostcodeAutofill, {
  type PincodeResponse
} from "@/hooks/usePostcodeAutofill";

const optionalFields = ["image", "district"];

const AdminForm = ({ Id, isOpen, onClose, UID }: propVals) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [adminDetails, setAdminDetails] = useState<stateVals>({
    ...initialAdminState
  });
  const [adminDetailsOriginal, setAdminDetailsOriginal] = useState<stateVals>({
    ...initialAdminState
  });
  const [pincodeDirty, setPincodeDirty] = useState(false);

  const navRef = useOutsideClick<HTMLDivElement>(() => onClose(), isOpen);

  const loadAdminData = useCallback(async () => {
    if (!UID) return;
    setIsDataLoading(true);
    try {
      const res = await getAdminById(UID);
      const backendData = res.data.data || {};

      // Calling the utility function to flatten the data
      const newAdminDetails = flattenData(backendData, initialAdminState);

      setAdminDetails(newAdminDetails);
      setAdminDetailsOriginal(newAdminDetails);
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
  }, [UID]);

  useEffect(() => {
    if (!isOpen) return;

    if (UID) {
      loadAdminData();
    } else {
      setAdminDetails({ ...initialAdminState });
      setAdminDetailsOriginal({ ...initialAdminState });
    }
  }, [isOpen, UID, loadAdminData]);

  // auto fill pincode data
  const handleAutofill = useCallback((data: PincodeResponse) => {
    setAdminDetails((prev) => ({
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
    postcode: adminDetails.pincode.value,
    enabled: pincodeDirty,
    onAutofill: handleAutofill
  });

  const handleInputChange = useCallback(
    (field: keyof stateVals, val: string | boolean, isValid: boolean) => {
      if (field === "pincode") {
        setPincodeDirty(true);
      }
      setAdminDetails((prev) => ({
        ...prev,
        [field]: { value: val, isValid }
      }));
    },
    []
  );

  // ---------- validation ----------
  const result = isFormValid(adminDetails, optionalFields);
  console.log(result);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!result.isValid) {
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);

    const currentValues = extractFormValues(adminDetails);
    const originalValues = extractFormValues(adminDetailsOriginal);

    const changes: Partial<registerAdmin> = {};

    for (const key in currentValues) {
      const typedKey = key as keyof registerAdmin;

      if (
        currentValues[typedKey] !== undefined &&
        !isEqual(currentValues[typedKey], originalValues[typedKey])
      ) {
        changes[typedKey] = currentValues[typedKey];
      }
    }

    if (UID && Object.keys(changes).length === 0) {
      showToast.info("No changes detected.");
      setIsLoading(false);
      return;
    }

    try {
      if (UID) {
        await updateAdminById(UID, changes);
        showToast.success("Admin updated successfully.");
      } else {
        await register(currentValues as registerAdmin);
        showToast.success("Admin created successfully.");
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
      className={`z-50 flex flex-col justify-between absolute top-0 p-3 overflow-hidden
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
            isToggleActive={true}
            checked={adminDetails?.status.value}
            toggleStatus={(val, isValid) =>
              handleInputChange("status", val, isValid)
            }
          >
            Admin - {Id ?? "New"}
          </RightTabHeader>

          <div className="overflow-y-auto flex flex-col flex-1 p-2">
            <AdminFormFields
              ID={Id || null}
              adminDetails={adminDetails}
              onInputChange={handleInputChange}
              postCodeLoading={postCodeLoading}
            />
          </div>

          <BtnTag
            BtnText="Save"
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

export default React.memo(AdminForm);
