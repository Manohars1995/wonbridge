import { useContext } from "react";

import {
  InputTag,
  ReactSelect,
  MultiReactSelect
} from "@/components/UIElements/Input-Elements/Input-tags";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "@/components/UIElements/Input-Elements/input-validators";
import {
  SupplierMaterialTypeOptions,
  SourceTypes
} from "@/components/UIElements/Input-Elements/default-values";
import type { FormFieldsProps } from "./utils";
import { WonBridgeContext } from "@/store/WonBridge-Context";

const SupplierFormFields = ({
  supplierDetails,
  handleInputChange,
  adminOptions,
  adminLoading,
  postCodeLoading=false
}: FormFieldsProps) => {
  const { userRole } = useContext(WonBridgeContext);

  return (
    <form className="grid grid-cols-2 gap-2 mt-3">
      {userRole === "super_admin" && (
        <ReactSelect
          id="admin_id"
          label="Owner *"
          loading={adminLoading}
          value={
            adminOptions.find(
              (opt) => opt.value === supplierDetails.admin_id.value
            ) || null
          }
          options={adminOptions}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={(val, isValid) =>
            handleInputChange("admin_id", val, isValid)
          }
        />
      )}

      <InputTag
        id="comapany_name"
        type="text"
        label="Company Name *"
        value={supplierDetails.company_name.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("company_name", val, isValid)
        }
      />

      <InputTag
        id="contact_person"
        type="text"
        label="Contact Person *"
        value={supplierDetails.contact_person.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("contact_person", val, isValid)
        }
      />

      <ReactSelect
        id="source_type"
        label="Source Type *"
        value={
          SourceTypes.find(
            (opt) => opt.value === supplierDetails.source_type.value
          ) || null
        }
        options={SourceTypes}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val, isValid) =>
          handleInputChange("source_type", val, isValid)
        }
      />

      <InputTag
        id="email"
        type="email"
        label="Email *"
        value={supplierDetails.email.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onChangeVal={(val, isValid) => handleInputChange("email", val, isValid)}
      />

      <InputTag
        id="phone"
        type="text"
        label="Phone Number *"
        value={supplierDetails.phone.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        onChangeVal={(val, isValid) => handleInputChange("phone", val, isValid)}
        max={10}
      />

      <InputTag
        id="pincode"
        type="text"
        label="Pincode *"
        value={supplierDetails.pincode.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("pincode", val, isValid)
        }
        loading={postCodeLoading}
      />

      <InputTag
        id="street"
        type="text"
        label="Street *"
        value={supplierDetails.street.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("street", val, isValid)
        }
      />

      <InputTag
        id="city"
        type="text"
        label="City *"
        value={supplierDetails.city.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) => handleInputChange("city", val, isValid)}
        readonly={true}
      />

      <InputTag
        id="district"
        type="text"
        label="District *"
        value={supplierDetails.district.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) =>
          handleInputChange("district", val, isValid)
        }
        readonly={true}
      />

      <InputTag
        id="state"
        type="text"
        label="State *"
        value={supplierDetails.state.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) => handleInputChange("state", val, isValid)}
        readonly={true}
      />

      <MultiReactSelect
        id="materials"
        label="Materials *"
        value={SupplierMaterialTypeOptions.filter((opt) =>
          supplierDetails.materials.value.includes(opt.value)
        )}
        options={SupplierMaterialTypeOptions}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={(val, isValid) =>
          handleInputChange("materials", val, isValid)
        }
      />

      <InputTag
        id="gst_in"
        type="text"
        label="GST (if any)"
        value={supplierDetails.gst_in.value}
        validators={[]}
        onChangeVal={(val, isValid) =>
          handleInputChange("gst_in", val, isValid)
        }
      />

      <InputTag
        id="contract_start_date"
        type="date"
        label="Contract Start Date *"
        value={supplierDetails.contract_start_date.value}
        validators={[]}
        onChangeVal={(val, isValid) =>
          handleInputChange("contract_start_date", val, isValid)
        }
        styles="uppercase"
      />

      <InputTag
        id="contract_end_date"
        type="date"
        label="Contract End Date"
        value={supplierDetails.contract_end_date.value}
        validators={[]}
        onChangeVal={(val, isValid) =>
          handleInputChange("contract_end_date", val, isValid)
        }
        styles="uppercase"
      />
    </form>
  );
};

export default SupplierFormFields;
