import {
  InputTag,
  ReactSelect
} from "../../UIElements/Input-Elements/Input-tags";
import AvtarImage from "@/shared/components/UIElements/AvatarImagePicker";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH
} from "@/components/UIElements/Input-Elements/input-validators";

import {
  industryStatusOptions,
  ownershipTypes
} from "@/components/UIElements/Input-Elements/default-values";
import { GiMineWagon } from "react-icons/gi";

import type { stateVals } from "./utils";

interface Props {
  adminDetails: stateVals;
  onInputChange: (
    field: keyof stateVals,
    val: string,
    isValid: boolean
  ) => void;
  ID?: string | null;
  postCodeLoading?: boolean;
}

const AdminFormFields = ({
  adminDetails,
  onInputChange,
  ID,
  postCodeLoading
}: Props) => {
  return (
    <>
      <AvtarImage
        value={adminDetails.image.value}
        onChangeVal={(val, isValid) => onInputChange("image", val, isValid)}
      >
        <GiMineWagon className="text-white text-6xl z-0" />
      </AvtarImage>

      <form className="grid grid-cols-2 gap-3 mt-4">
        <InputTag
          id="full_name"
          type="text"
          label="Full Name *"
          value={adminDetails.full_name.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
          onChangeVal={(val, isValid) =>
            onInputChange("full_name", val, isValid)
          }
        />
        <InputTag
          id="email"
          type="email"
          label="Email *"
          value={adminDetails.email.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onChangeVal={(val, isValid) => onInputChange("email", val, isValid)}
        />
        <InputTag
          id="phone"
          type="text"
          label="Phone Number *"
          value={adminDetails.phone.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
          onChangeVal={(val, isValid) => onInputChange("phone", val, isValid)}
          readonly={ID ? true : false}
          max={10}
        />

        <InputTag
          id="company_name"
          type="text"
          label="Company Name *"
          value={adminDetails.company_name.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
          max={30}
          onChangeVal={(val, isValid) =>
            onInputChange("company_name", val, isValid)
          }
        />
        <InputTag
          id="pincode"
          type="text"
          label="Pincode *"
          value={adminDetails.pincode.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          onChangeVal={(val, isValid) => onInputChange("pincode", val, isValid)}
          max={6}
          loading={postCodeLoading}
        />
        <InputTag
          id="street"
          type="text"
          label="Street *"
          value={adminDetails.street.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onChangeVal={(val, isValid) => onInputChange("street", val, isValid)}
        />
        <InputTag
          id="city"
          type="text"
          label="City *"
          value={adminDetails.city.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val, isValid) => onInputChange("city", val, isValid)}
        />
        <InputTag
          id="state"
          type="text"
          label="State *"
          value={adminDetails.state.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val, isValid) => onInputChange("state", val, isValid)}
        />
        <InputTag
          id="crusher_name"
          type="text"
          label="Crusher Name *"
          value={adminDetails.crusher_name.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val, isValid) =>
            onInputChange("crusher_name", val, isValid)
          }
        />
        <InputTag
          id="crusher_location"
          type="text"
          label="Crusher Location *"
          value={adminDetails.crusher_location.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val, isValid) =>
            onInputChange("crusher_location", val, isValid)
          }
        />
        <InputTag
          id="capacity"
          type="text"
          label="Capacity (TPH) *"
          value={adminDetails.capacity.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val, isValid) =>
            onInputChange("capacity", val, isValid)
          }
        />
        <InputTag
          id="machine_brand"
          type="text"
          label="Machine Brand *"
          value={adminDetails.machine_brand.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val, isValid) =>
            onInputChange("machine_brand", val, isValid)
          }
        />
        <InputTag
          id="year_installed"
          type="text"
          label="Year Installed *"
          value={adminDetails.year_installed.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]}
          onChangeVal={(val, isValid) =>
            onInputChange("year_installed", val, isValid)
          }
        />
        <ReactSelect
          id="ownership_type"
          label="Ownership Type *"
          value={
            ownershipTypes.find(
              (opt) => opt.value === adminDetails.ownership_type.value
            ) || null
          }
          options={ownershipTypes}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={(val, isValid) =>
            onInputChange("ownership_type", val, isValid)
          }
        />
        <ReactSelect
          id="status"
          label="Status *"
          value={
            industryStatusOptions.find(
              (opt) => opt.value === adminDetails.operational_status.value
            ) || null
          }
          options={industryStatusOptions}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={(val, isValid) =>
            onInputChange("operational_status", val, isValid)
          }
        />
        
      </form>
    </>
  );
};

export default AdminFormFields;
