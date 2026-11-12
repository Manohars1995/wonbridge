import AvtarImage from "@/shared/components/UIElements/AvatarImagePicker";
import type { ProfileFormFieldsProps } from "./utils";

const ProfileForm1 = ({
  profileData,
  handleInputChange
}: ProfileFormFieldsProps) => {
  console.log(profileData, "profileooo");
  return (
    <div className="shadow-lg bg-[var(--background-secondary)] rounded-2xl p-4 flex items-center relative ">
      <div className="ml-5 mr-3">
        <AvtarImage
          value={profileData?.image?.value}
          onChangeVal={(val, isValid) =>
            handleInputChange("image", val, isValid)
          }
        />
      </div>
      <div>
        <h3 className="text-xl font-bold">
          {profileData?.full_name.value?.charAt(0).toUpperCase() +
            profileData?.full_name.value?.slice(1).toLowerCase() ||
            "Won Bridge"}
        </h3>
        <h5>{profileData?.role.value || "Manger"}</h5>
        <h6 className="text-md font-semibold text-[var(--light-text)]">
          {profileData?.company_name.value?.toUpperCase() || "Hot rock crusher"}
        </h6>
      </div>
    </div>
  );
};

export default ProfileForm1;
