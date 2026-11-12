import { BiPencil } from "react-icons/bi";
import { useCallback, useState } from "react";

import { BtnTag, InputTag } from "@/components/UIElements/Input-Elements/Input-tags";
import type { ProfileFormFieldsProps } from "./utils";
import { VALIDATOR_REQUIRE } from "@/components/UIElements/Input-Elements/input-validators";

const ProfileForm2 = ({
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
        <h1 className="font-bold">Personal Details</h1>
        <BtnTag
          BtnText={isEditActive ? "Done" : "Edit"}
          onClick={onClickHandler}
          styles="border border-[#ccc]"
          loading={isLoading}
        >
          {!isEditActive && <BiPencil className="text-md" />}
        </BtnTag>
      </div>

      <form className="grid grid-cols-4 gap-8 mt-2 w-full">
        <InputTag
          id="full_name"
          type="text"
          label="Full Name"
          value={profileData.full_name.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("full_name", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />

        <InputTag
          id="email"
          type="text"
          label="Email"
          value={profileData.email.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("email", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
        <InputTag
          id="phone"
          type="text"
          label="Phone"
          value={profileData.phone.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("phone", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
        <InputTag
          id="role"
          type="text"
          label="Role"
          value={profileData.role.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val: string, isValid: boolean) =>
            handleInputChange("role", val, isValid)
          }
          readonly={!isEditActive}
          styles={`bg-transparent ${isEditActive ? "" : "border-0"} `}
        />
      </form>
    </div>
  );
};

export default ProfileForm2;
