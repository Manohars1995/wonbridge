import { useState, useCallback, useContext, useEffect } from "react";
import ProfileForm1 from "./ProfileForm-1";
import DynamicForm from "./DynamicProfileForm-1";
import { BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import { profileSchemas } from "./profileSchemas";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import type { stateVals } from "./utils";
import {
  extractAddressFields,
  extractAndMapToState,
  getChangedFields,
  initialProfileFormState
} from "./utils";

// API imports
import { getAdminById, updateAdminById } from "@/services/admin/admin";
import { getManagerById, updateManagerById } from "@/services/manager/manager";
import { getStaffById, updateStaffById } from "@/services/staff/staff";
import { showToast } from "@/components/UI/toast";
import ConfirmModal from "@/components/UI/Modals/ConfirmModal";
import type { PincodeResponse } from "@/hooks/usePostcodeAutofill";
import usePostcodeAutofill from "@/hooks/usePostcodeAutofill";

const ProfileScreen = () => {
  const [profile, setProfile] = useState({ ...initialProfileFormState });
  const [originalProfile, setOriginalProfile] = useState({
    ...initialProfileFormState
  });
  const [activeEditSection, setActiveEditSection] = useState<string | null>(
    null
  );
  const [confirmSection, setConfirmSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userRole, userID } = useContext(WonBridgeContext);
    const [pincodeDirty, setPincodeDirty] = useState(false);
  

  const addressKeys = [
    "city",
    "state",
    "district",
    "pincode",
    "street",
    "country"
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res;
      switch (userRole) {
        case "admin":
        case "super_admin":
          res = await getAdminById(userID);
          break;
        case "manager":
          res = await getManagerById(userID);
          break;
        case "supervisor":
          res = await getStaffById(userID);
          break;
        default:
          throw new Error("Unsupported role");
      }

      if (res?.data?.success && res.data.data) {
        const fetchedData = res.data.data;
        console.log(fetchedData, "dtatiugfhsdghu");

        const updatedProfile = extractAndMapToState(
          fetchedData,
          initialProfileFormState,
          { address: addressKeys, admin_id: ["company_name"] }
        );

        console.log(updatedProfile, "profilooooo");

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userRole]);

  // auto fill pincode data
  const handleAutofill = useCallback((data: PincodeResponse) => {
    setProfile((prev) => ({
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
    postcode: profile.pincode.value,
    enabled: pincodeDirty,
    onAutofill: handleAutofill
  });

  const submitSectionUpdate = async (_sectionTitle: string) => {
    setIsLoading(true);
    const changedFields = getChangedFields(profile, originalProfile, ["image"]);
    const { address, remaining } = extractAddressFields(
      changedFields,
      addressKeys
    );

    const payload: Record<string, any> = { ...remaining };
    if (Object.keys(address).length > 0) {
      payload.address = address;
    }

    try {
      switch (userRole) {
        case "admin":
        case "super_admin":
          await updateAdminById(userID, payload);
          break;
        case "manager":
          await updateManagerById(userID, payload);
          break;
        case "supervisor":
          await updateStaffById(userID, payload);
          break;
        default:
          throw new Error("Unsupported role");
      }

      await fetchData();
      showToast.success("Profile updated.");
    } catch (err) {
      console.error("Update failed:", err);
      showToast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
      setActiveEditSection(null);
      setConfirmSection(null);
    }
  };

  const cancelEditSection = (_sectionTitle: string) => {
    setProfile(originalProfile);
    setActiveEditSection(null);
    setConfirmSection(null);
  };

  const handleEditClick = (sectionTitle: string) => {
    if (activeEditSection === sectionTitle) {
      setConfirmSection(sectionTitle); // open modal
    } else {
      setActiveEditSection(sectionTitle); // start editing
    }
  };

  const handleInputChange = useCallback(
    async (field: keyof stateVals, val: string, isValid: boolean) => {
      const updatedState = {
        ...profile,
        [field]: { value: val, isValid }
      };
      setProfile(updatedState);

      if (field === "image") {
        try {
          switch (userRole) {
            case "admin":
            case "super_admin":
              await updateAdminById(userID, { image: val });
              break;
            case "manager":
              await updateManagerById(userID, { image: val });
              break;
            case "supervisor":
              await updateStaffById(userID, { image: val });
              break;
          }

          showToast.success("Profile picture updated.");

          setOriginalProfile((prev) => ({
            ...prev,
            image: { value: val, isValid: true }
          }));
        } catch (err) {
          console.error("Image update failed:", err);
          showToast.error("Failed to update profile picture.");
        }
      }
    },
    [userRole, userID]
  );

  return (
    <>
      <ProfileForm1
        profileData={profile}
        handleInputChange={handleInputChange}
      />

      {profileSchemas?.[userRole]?.map((section) => {
        const isEditing = activeEditSection === section.title;
        return (
          <div
            key={section.title}
            className="shadow-lg bg-[var(--background-secondary)] rounded-2xl p-8 flex flex-col items-center"
          >
            <div className="flex justify-between items-center w-full border-b pb-2">
              <h1 className="font-bold">{section.title}</h1>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <BtnTag
                      BtnText="Cancel"
                      onClick={() => cancelEditSection(section.title)}
                      styles="border border-gray-300 bg-gray-100 text-gray-700"
                      loading={isLoading}
                    />
                    <BtnTag
                      BtnText="Done"
                      onClick={() => handleEditClick(section.title)}
                      styles="border border-blue-500 bg-blue-500 text-white"
                      loading={isLoading}
                    />
                  </>
                ) : (
                  <BtnTag
                    BtnText="Edit"
                    onClick={() => handleEditClick(section.title)}
                    styles="border border-[#ccc]"
                  >
                    {/* <BiPencil className="text-md" /> */}
                  </BtnTag>
                )}
              </div>
            </div>

            <DynamicForm
              schema={section.fields}
              data={profile}
              onInputChange={handleInputChange}
              isEditActive={isEditing}
            />
          </div>
        );
      })}

      {/* Confirmation Modal */}
      {confirmSection && (
        <ConfirmModal
          title="Confirm Update"
          confirmText="Yes, Update"
          cancelText="No"
          onConfirm={() => submitSectionUpdate(confirmSection)}
          onCancel={() => setConfirmSection(null)}
          loading={isLoading}
        >
          Confirm update for "${confirmSection}" section?
        </ConfirmModal>
      )}
    </>
  );
};

export default ProfileScreen;
