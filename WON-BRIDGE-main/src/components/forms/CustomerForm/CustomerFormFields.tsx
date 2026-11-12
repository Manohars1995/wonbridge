import {
  InputTag,
  ReactSelect,
  TextareaTag,
  MultiReactSelect
} from "@/components/UIElements/Input-Elements/Input-tags";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH
} from "@/components/UIElements/Input-Elements/input-validators";
import {
  MaterialTypeOptions,
  CustomerTypeOptions
} from "@/components/UIElements/Input-Elements/default-values";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import { useContext } from "react";
import type { Props } from "./utils";

const CustomerFormFields = ({
  customerDetails,
  handleInputChange,
  adminOptions,
  adminLoading,
  postCodeLoading =false
}: Props) => {
  const { userRole } = useContext(WonBridgeContext);

  return (
    <form className="grid grid-cols-2 gap-2 mt-3">
      {userRole === "super_admin" && (
        <ReactSelect
          id="owner"
          label="Admin *"
          value={
            adminOptions.find(
              (opt) => opt.value === customerDetails.admin_id.value
            ) || null
          }
          options={adminOptions}
          loading={adminLoading}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={(val, isValid) =>
            handleInputChange("admin_id", val, isValid)
          }
        />
      )}

      <InputTag
        id="company_name"
        type="text"
        label="Customer Name *"
        value={customerDetails.customer_name.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("customer_name", val, isValid)
        }
      />

      <InputTag
        id="contact_person"
        type="text"
        label="Contact Person *"
        value={customerDetails.contact_person.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("contact_person", val, isValid)
        }
      />

      <InputTag
        id="email"
        type="email"
        label="Email *"
        value={customerDetails.email.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onChangeVal={(val, isValid) => handleInputChange("email", val, isValid)}
      />

      <InputTag
        id="phone"
        type="text"
        label="Phone Number *"
        value={customerDetails.phone.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        onChangeVal={(val, isValid) => handleInputChange("phone", val, isValid)}
        max={10}
      />

      <InputTag
        id="pincode"
        type="text"
        label="Pincode *"
        max={6}
        value={customerDetails.pincode.value}
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
        value={customerDetails.street.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("street", val, isValid)
        }
      />

      <InputTag
        id="city"
        type="text"
        label="City *"
        // readonly={true}
        value={customerDetails.city.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) => handleInputChange("city", val, isValid)}
      />

      <InputTag
        id="district"
        type="text"
        label="District *"
        // readonly={true}
        value={customerDetails.district.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("district", val, isValid)
        }
      />

      <InputTag
        id="state"
        type="text"
        label="State *"
        // readonly={true}
        value={customerDetails.state.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) => handleInputChange("state", val, isValid)}
      />

      <MultiReactSelect
        id="material_type"
        label="Material Type *"
        value={MaterialTypeOptions.filter((opt) =>
          customerDetails.material_types.value.includes(opt.value)
        )}
        options={MaterialTypeOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val, isValid) =>
          handleInputChange("material_types", val, isValid)
        }
      />

      <InputTag
        id="contract_start_date"
        type="date"
        label="Contract started *"
        // readonly={true}
        value={customerDetails.contract_start_date.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("contract_start_date", val, isValid)
        }
        styles="uppercase"
      />

      <InputTag
        id="contract_end_date"
        type="date"
        label="Contract closed"
        // readonly={true}
        value={customerDetails.contract_end_date.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("contract_end_date", val, isValid)
        }
        styles="uppercase"
      />

      <InputTag
        id="gst_in"
        type="text"
        label="GST (if any)"
        // readonly={true}
        value={customerDetails.gst_in.value}
        validators={[]}
        onChangeVal={(val, isValid) =>
          handleInputChange("gst_in", val, isValid)
        }
      />

      <ReactSelect
        id="customer_category"
        label="Customer Category *"
        value={
          CustomerTypeOptions.find(
            (opt) => opt.value === customerDetails.customer_category.value
          ) || null
        }
        options={CustomerTypeOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val, isValid) =>
          handleInputChange("customer_category", val, isValid)
        }
      />

      <TextareaTag
        id="remarks"
        label="Remarks"
        value={customerDetails.remarks.value}
        validators={[]}
        onChangeVal={(val, isValid) =>
          handleInputChange("remarks", val, isValid)
        }
        Constyles="col-span-2"
      />
    </form>
  );
};

export default CustomerFormFields;
