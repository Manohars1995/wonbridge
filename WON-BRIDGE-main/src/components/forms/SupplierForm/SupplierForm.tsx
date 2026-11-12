import React, { useState, useContext, useEffect, useCallback } from "react";
import isEqual from "lodash.isequal";

// component imports
import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import AvtarImage from "@/shared/components/UIElements/AvatarImagePicker";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import SupplierFormFields from "./SupplierFormFields";
import type { stateVals, propVals } from "./utils";
import { initialSupplierState } from "./utils";
import { useOwnersOptions } from "@/components/UIElements/Input-Elements/dropdown-options";
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
import {
  extractFormValues,
  flattenFormData,
  isFormValid
} from "@/components/forms/utils";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import usePostcodeAutofill, {
  type PincodeResponse
} from "@/hooks/usePostcodeAutofill";

const optionalFields = ["image", "gst_in", "contract_end_date"];

const SupplierForm = ({ Id, isOpen, onClose, UID }: propVals) => {
  const { userID } = useContext(WonBridgeContext);
  const navRef = useOutsideClick<HTMLDivElement>(() => onClose(), isOpen);

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [pincodeDirty, setPincodeDirty] = useState(false); // Key to control autofill

  const [supplierDetails, setSupplierDetails] = useState<stateVals>({
    ...initialSupplierState,
    admin_id: { value: userID, isValid: true }
  });
  const [supplierDetailsOriginal, setSupplierDetailsOriginal] =
    useState<stateVals>({ ...initialSupplierState });

  const { adminLoading, adminOptions } = useOwnersOptions();

  const loadSupplierData = useCallback(async () => {
    if (!UID) return;
    setIsDataLoading(true);
    try {
      const res = await getSupplierById(UID);
      const backendData = res.data.data || {};

      const newManagerDetails = flattenFormData<stateVals>(
        backendData,
        initialSupplierState,
        {
          dateKeys: ["contract_start_date", "contract_end_date"],
          addressKeys: ["street", "district", "city", "state", "pincode"]
        }
      );
      setSupplierDetails(newManagerDetails);
      setSupplierDetailsOriginal(newManagerDetails);
      setPincodeDirty(false); // Reset dirty on fresh load
    } catch (err: any) {
      showToast.error(
        err?.response?.data?.message ?? "Failed to load supplier data."
      );
    } finally {
      setIsDataLoading(false);
    }
  }, [UID]);

  useEffect(() => {
    if (!isOpen) return;
    if (UID) {
      loadSupplierData();
    } else {
      setSupplierDetails({
        ...initialSupplierState,
        admin_id: { value: userID, isValid: true }
      });
      setPincodeDirty(false); // New form starts clean
    }
  }, [UID, loadSupplierData, userID, isOpen]);

  // Bulletproof autofill handler
  const handleAutofill = useCallback((data: PincodeResponse) => {
    setSupplierDetails((prev) => ({
      ...prev,
      state: { value: data.state ?? "", isValid: true },
      city: { value: data.city ?? "", isValid: true },
      district: { value: data.district ?? "", isValid: true },
      street: data.street ? { value: data.street, isValid: true } : prev.street
    }));
  }, []);

  const { loading: postCodeLoading } = usePostcodeAutofill({
    postcode: supplierDetails.pincode.value as string,
    enabled:
      pincodeDirty && (supplierDetails.pincode.value as string)?.length === 6,
    onAutofill: handleAutofill,
    debounceMs: 600 // High debounce for better UX
  });

  const handleInputChange = useCallback(
    (field: keyof stateVals, val: any, isValid: boolean) => {
      if (field === "pincode") {
        setPincodeDirty(true); // User is typing, enable autofill logic
      }
      setSupplierDetails((prev) => ({
        ...prev,
        [field]: { value: val, isValid }
      }));
    },
    []
  );

  const result = isFormValid(supplierDetails, optionalFields);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!result.isValid) {
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);
    const payload = extractFormValues(supplierDetails);
    const originalPayload = extractFormValues(supplierDetailsOriginal);

    const changes: Partial<RegisterSupplier> = {};
    for (const key in payload) {
      const typedKey = key as keyof RegisterSupplier;
      if (!isEqual(payload[typedKey], originalPayload[typedKey])) {
        changes[typedKey] = payload[typedKey];
      }
    }

    if (Object.keys(changes).length === 0) {
      showToast.info("No changes detected.");
      setIsLoading(false);
      return;
    }

    try {
      if (UID) {
        await updateSupplier(UID, changes as RegisterSupplier);
        showToast.success("Supplier updated successfully.");
      } else {
        await createSupplier(payload as RegisterSupplier);
        showToast.success("Supplier created successfully.");
      }
      onClose();
    } catch (error: any) {
      showToast.error(
        error?.response?.data?.message ?? "Something went wrong."
      );
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
      w-full sm:w-[20rem] md:w-[24rem] lg:w-[28rem]`}
    >
      {isDataLoading ? (
        <FormSkeleton onClose={onClose} />
      ) : (
        <>
          <RightTabHeader
            onClose={onClose}
            checked={supplierDetails?.status.value}
            toggleStatus={(val, isValid) =>
              handleInputChange("status", val, isValid)
            }
            isToggleActive={true}
          >
            Source - {Id ?? "New"}
          </RightTabHeader>

          <div className="overflow-y-scroll flex flex-col h-[85%] p-2">
            <AvtarImage
              value={supplierDetails?.image.value}
              onChangeVal={(val, isValid) =>
                handleInputChange("image", val, isValid)
              }
            />
            <SupplierFormFields
              supplierDetails={supplierDetails}
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

export default React.memo(SupplierForm);
