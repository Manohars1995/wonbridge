import { useContext } from "react";

import {
  InputTag,
  ReactSelect
} from "@/components/UIElements/Input-Elements/Input-tags";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from "@/components/UIElements/Input-Elements/input-validators";
import {
  ShiftOptions,
  staffTypeOptions,
  genderOptions,
  worlkLocationOptions
} from "@/components/UIElements/Input-Elements/default-values";
import type { stateVals, SelectOption } from "./utils";
import { WonBridgeContext } from "@/store/WonBridge-Context";

interface Props {
  staffDetails: stateVals;
  handleInputChange: (
    field: keyof stateVals,
    val: string,
    isValid: boolean
  ) => void;
  adminOptions: SelectOption[];
  adminLoading: boolean;
  postCodeLoading?: boolean;
}

const StaffFormFields = ({
  staffDetails,
  handleInputChange,
  adminOptions,
  adminLoading,
  postCodeLoading = false
}: Props) => {
  const { userRole } = useContext(WonBridgeContext);
  console.log(staffDetails, "userRole");
  console.log(adminOptions, "adminOptions");

  return (
    <form className="grid grid-cols-2 gap-2 mt-3">
      {userRole === "super_admin" && (
        <ReactSelect
          id="owner"
          label="Owner *"
          value={
            adminOptions.find(
              (opt) => opt.value === staffDetails.admin_id.value
            ) || null
          }
          options={adminOptions}
          loading={adminLoading}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={(val, isValid) => {
            handleInputChange("admin_id", val, isValid);
          }}
          readonly={false}
        />
      )}

      <ReactSelect
        id="staff_type"
        label="Staff Type *"
        value={
          staffTypeOptions.find(
            (opt) => opt.value === staffDetails.role.value
          ) || null
        }
        options={staffTypeOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val, isValid) => {
          handleInputChange("role", val, isValid);
        }}
        readonly={!["super_admin", "admin", "manager"].includes(userRole)}
      />

      <InputTag
        id="full_name"
        type="text"
        label="Full Name *"
        value={staffDetails.full_name.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("full_name", val, isValid)
        }
      />

      <InputTag
        id="email"
        type="email"
        label="Email *"
        value={staffDetails.email.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onChangeVal={(val, isValid) => handleInputChange("email", val, isValid)}
      />

      <InputTag
        id="phone_number"
        type="text"
        label="Phone Number *"
        value={staffDetails.phone.value}
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MINLENGTH(10)
        ]}
         max={10}
        onChangeVal={(val, isValid) => handleInputChange("phone", val, isValid)}
      />

      <InputTag
        id="pincode"
        type="text"
        label="Pincode *"
        max={6}
        value={staffDetails.pincode.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(6)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("pincode", val, isValid)
        }
        loading={postCodeLoading}
      />

      <InputTag
        id="street"
        type="text"
        label="Street *"
        value={staffDetails.street.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("street", val, isValid)
        }
      />

      <InputTag
        id="city"
        type="text"
        label="City *"
        readonly={true}
        value={staffDetails.city.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) => handleInputChange("city", val, isValid)}
      />

      <InputTag
        id="district"
        type="text"
        label="District *"
        readonly={true}
        value={staffDetails.district.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("district", val, isValid)
        }
      />

      <InputTag
        id="state"
        type="text"
        label="State *"
        readonly={true}
        value={staffDetails.state.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) => handleInputChange("state", val, isValid)}
      />

      <ReactSelect
        id="gender"
        label="Gender *"
        value={
          genderOptions.find(
            (opt) => opt.value === staffDetails.gender.value
          ) || null
        }
        options={genderOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val, isValid) => {
          handleInputChange("gender", val, isValid);
        }}
      />

      <ReactSelect
        id="assigned_shift"
        label="Assigned Shift *"
        value={
          ShiftOptions.find(
            (opt) => opt.value === staffDetails.assigned_shift.value
          ) || null
        }
        options={ShiftOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val, isValid) => {
          handleInputChange("assigned_shift", val, isValid);
        }}
      />

      <ReactSelect
        id="work_location"
        label="Work Location *"
        value={
          worlkLocationOptions.find(
            (opt: SelectOption) =>
              opt.value === staffDetails.work_location.value
          ) || null
        }
        options={worlkLocationOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val: string, isValid: boolean) => {
          handleInputChange("work_location", val, isValid);
        }}
      />

      <InputTag
        id="date_of_joining"
        type="date"
        label="Date of Joining *"
        value={staffDetails.date_of_joining.value}
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
        value={staffDetails.date_of_resignation.value}
        validators={[]}
        onChangeVal={(val: string, isValid: boolean) =>
          handleInputChange("date_of_resignation", val, isValid)
        }
        styles="uppercase"
      />
    </form>
  );
};

export default StaffFormFields;
