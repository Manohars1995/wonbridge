import React, { useState, useContext, useCallback, useEffect } from "react";
import RightTabHeader from "@/shared/components/UIElements/screens/RightTabHeaders/right-tab-header";
import AvtarImage from "@/shared/components/UIElements/AvatarImagePicker";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import { initialCustomerState } from "./utils";
import type { stateVals } from "./utils";
import CustomerFormFields from "./CustomerFormFields";
import { showToast } from "@/components/UI/toast";
import isEqual from "lodash.isequal";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
  createCustomer,
  updateCustomer,
  getCustomerById
} from "@/services/customer/customer";
import type { RegisterCustomer } from "@/services/customer/customer-interfaces";
import { useOwnersOptions } from "@/components/UIElements/Input-Elements/dropdown-options"; // import for dropdown options
import FormSkeleton from "@/components/UI/SkeletonLoaders/skeleton-form-loader";
import { WonBridgeContext } from "@/store/WonBridge-Context";

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

const optionalFields = [
  "image",
  "gst_in",
  "contract_end_date",
  "remarks",
  "district"
];

const CustomerForm = ({ Id, isOpen, onClose, UID }: propVals) => {
  const { userID } = useContext(WonBridgeContext);
  console.log(userID, "idddd");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [customerDetails, setCustomerDetails] = useState<stateVals>({
    ...initialCustomerState,
    admin_id: { value: userID, isValid: true }
  });
  const [customerDetailsOriginal, setCustomerDetailsOriginal] =
    useState<stateVals>({
      ...initialCustomerState
    });
  const [pincodeDirty, setPincodeDirty] = useState(false);

  const { adminLoading, adminOptions } = useOwnersOptions();
  const navRef = useOutsideClick<HTMLDivElement>(() => onClose(), isOpen);

  // -------------- fetch data ---------------
  const loadCustomerData = useCallback(async () => {
    if (!UID) return;
    setIsDataLoading(true);
    try {
      const res = await getCustomerById(UID);
      const backendData = res.data.data || {};

      // Call the utility function to flatten the data
      const newCustomerDetails = flattenFormData<stateVals>(
        backendData,
        initialCustomerState,
        {
          dateKeys: ["contract_start_date", "contract_end_date"],
          addressKeys: ["street", "district", "city", "state", "pincode"]
        }
      );
      setCustomerDetails(newCustomerDetails);
      setCustomerDetailsOriginal(newCustomerDetails);
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
      loadCustomerData();
    } else {
      setCustomerDetails({
        ...initialCustomerState,
        admin_id: { value: userID, isValid: true }
      });
    }
  }, [UID, loadCustomerData, userID, isOpen]);

  // auto fill pincode data
  const handleAutofill = useCallback((data: PincodeResponse) => {
    setCustomerDetails((prev) => ({
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
    postcode: customerDetails.pincode.value,
    enabled: pincodeDirty,
    onAutofill: handleAutofill
  });

  const handleInputChange = useCallback(
    (
      field: keyof stateVals,
      val: string | string[] | boolean,
      isValid: boolean
    ) => {
      if (field === "pincode") {
        setPincodeDirty(true);
      }
      setCustomerDetails((prev) => ({
        ...prev,
        [field]: { value: val, isValid }
      }));
    },
    []
  );

  // ---------- validation ----------
  const result = isFormValid(customerDetails, optionalFields);
  console.log(result);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!result.isValid) {
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);
    const payload = extractFormValues(customerDetails);
    const originalPayload = extractFormValues(customerDetailsOriginal);

    const changes: Partial<RegisterCustomer> = {};
    for (const key in payload) {
      const typedKey = key as keyof RegisterCustomer;
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

    try {
      if (UID) {
        await updateCustomer(UID, changes as RegisterCustomer);
        showToast.success("Customer updated successfully.");
      } else {
        await createCustomer(payload as RegisterCustomer);
        showToast.success("Customer created successfully.");
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

    console.log("submited", customerDetails);
  };

  return (
    <nav
      ref={navRef}
      className={`z-[100] flex flex-col justify-between absolute top-0 p-3 overflow-hidden
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
            checked={customerDetails?.status.value}
            toggleStatus={(val, isValid) =>
              handleInputChange("status", val, isValid)
            }
            isToggleActive={true}
          >
            Customer - {Id ?? "New"}
          </RightTabHeader>
          <div className="overflow-y-scroll flex flex-col h-[85%] p-2">
            <AvtarImage
              value={customerDetails?.image.value}
              onChangeVal={(val, isValid) =>
                handleInputChange("image", val, isValid)
              }
            />

            <CustomerFormFields
              customerDetails={customerDetails}
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

export default React.memo(CustomerForm);
