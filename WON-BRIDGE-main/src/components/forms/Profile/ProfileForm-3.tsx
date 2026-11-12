import { useCallback, useState } from "react";
import { BiPencil } from "react-icons/bi";

import { BtnTag, InputTag } from "@/components/UIElements/Input-Elements/Input-tags";
import { VALIDATOR_REQUIRE } from "@/components/UIElements/Input-Elements/input-validators";

import type { ProfileFormFieldsProps } from "./utils";

const ProfileForm3 = ({
  profileData,
  handleInputChange
}: ProfileFormFieldsProps) => {
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickHandler = useCallback(() => {
    setIsLoading(true);
    if (isEditActive) {
      console.log("update db");
      setIsEditActive(false);
    } else {
      setIsEditActive(true);
    }

    setIsLoading(false);
  }, [isEditActive]);
  return (
    <div className="shadow-lg bg-[var(--background-secondary)] rounded-2xl p-8 flex flex-col items-center ">
      <div className="flex justify-between w-full border-b pb-2">
        <h1 className="font-bold">Address</h1>
        <BtnTag
          BtnText={isEditActive ? "Done" : "Edit"}
          onClick={onClickHandler}
          styles="border border-[#ccc]"
          loading={isLoading}
        >
          {!isEditActive && <BiPencil className="text-md" />}
        </BtnTag>
      </div>

      <div className="grid grid-cols-4 gap-8 mt-2 w-full">
        <InputTag
          id="country"
          type="text"
          label="Country"
          value={profileData.country.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("country", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
        <InputTag
          id="state"
          type="text"
          label="State"
          value={profileData.state.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("state", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
        <InputTag
          id="district"
          type="text"
          label="District"
          value={profileData.district.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("district", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
        <InputTag
          id="city"
          type="text"
          label="City"
          value={profileData.full_name.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("full_name", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
        <InputTag
          id="post_code"
          type="text"
          label="Post Code"
          value={profileData.pincode.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("pincode", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
      </div>
    </div>
  );
};

export default ProfileForm3;
