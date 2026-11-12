import { useContext } from "react";

import {
  InputTag,
  ReactSelect
} from "@/components/UIElements/Input-Elements/Input-tags";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "@/components/UIElements/Input-Elements/input-validators";
import {
  ShiftOptions,
  genderOptions,
  worlkLocationOptions
} from "@/components/UIElements/Input-Elements/default-values";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import type { ManagerFormFieldsProps, SelectOption } from "./utils";

const ManagerFormFields = ({
  managerDetails,
  handleInputChange,
  adminOptions,
  adminLoading,
  postCodeLoading
}: ManagerFormFieldsProps) => {
  const { userRole } = useContext(WonBridgeContext);

  return (
    <form className="grid grid-cols-2 gap-2 mt-3">
      {userRole === "super_admin" && (
        <ReactSelect
          id="owner"
          label="Owner *"
          value={
            adminOptions?.find(
              (opt: SelectOption) => opt.value === managerDetails.admin_id.value
            ) || null
          }
          options={adminOptions}
          validators={[VALIDATOR_REQUIRE()]}
          loading={adminLoading}
          onChange={(val: string, isValid: boolean) => {
            handleInputChange("admin_id", val, isValid);
          }}
        />
      )}

      <InputTag
        id="full_name"
        type="text"
        label="Full Name *"
        value={managerDetails.full_name.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("full_name", val, isValid)
        }
      />
      <InputTag
        id="email"
        type="email"
        label="Email *"
        value={managerDetails.email.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("email", val, isValid)
        }
      />
      <InputTag
        id="phone"
        type="text"
        label="Phone Number *"
        value={managerDetails.phone.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("phone", val, isValid)
        }
        max={10}
      />

      <InputTag
        id="pincode"
        type="text"
        label="Pincode *"
        value={managerDetails.pincode.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("pincode", val, isValid)
        }
        max={6}
        loading={postCodeLoading}
      />

      <InputTag
        id="street"
        type="text"
        label="Street *"
        value={managerDetails.street.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("street", val, isValid)
        }
      />

      <InputTag
        id="city"
        type="text"
        label="City *"
        value={managerDetails.city.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("city", val, isValid)
        }
        readonly={true}
      />

      <InputTag
        id="district"
        type="text"
        label="District *"
        value={managerDetails?.district?.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("district", val, isValid)
        }
        readonly={true}
      />

      <InputTag
        id="state"
        type="text"
        label="State *"
        value={managerDetails.state.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("state", val, isValid)
        }
        readonly={true}
      />

      <ReactSelect
        id="gender"
        label="Gender *"
        value={
          genderOptions.find(
            (opt: SelectOption) => opt.value === managerDetails.gender.value
          ) || null
        }
        options={genderOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val: string, isValid: boolean) => {
          handleInputChange("gender", val, isValid);
        }}
      />

      <ReactSelect
        id="assigned_shift"
        label="Assigned Shift *"
        value={
          ShiftOptions.find(
            (opt: SelectOption) =>
              opt.value === managerDetails.assigned_shift.value
          ) || null
        }
        options={ShiftOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val: string, isValid: boolean) => {
          handleInputChange("assigned_shift", val, isValid);
        }}
      />

      <InputTag
        id="date_of_joining"
        type="date"
        label="Date of Joining *"
        value={managerDetails.date_of_joining.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("date_of_joining", val, isValid)
        }
        styles="uppercase"
      />

      <InputTag
        id="date_of_resignation"
        type="date"
        label="Date of Resignation"
        value={managerDetails.date_of_resignation.value}
        validators={[]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("date_of_resignation", val, isValid)
        }
        styles="uppercase"
      />

      <ReactSelect
        id="work_location"
        label="Work Location *"
        value={
          worlkLocationOptions.find(
            (opt: SelectOption) =>
              opt.value === managerDetails.work_location.value
          ) || null
        }
        options={worlkLocationOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val: string, isValid: boolean) => {
          handleInputChange("work_location", val, isValid);
        }}
      />
    </form>
  );
};

export default ManagerFormFields;
