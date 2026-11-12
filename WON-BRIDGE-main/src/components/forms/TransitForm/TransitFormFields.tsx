//TransitFormFields.tsx

import {
  InputTag,
  ReactSelect,
  TextareaTag,
  WeighInputTag as WeighInputTag
} from "@/components/UIElements/Input-Elements/Input-tags";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "@/components/UIElements/Input-Elements/input-validators";
import { formatDateTime } from "@/shared/util/helper-functions";

import { type SelectOption } from "./utils";
import type { FormFieldsProps } from "./utils";
import { useEffect, useState } from "react";
import { TiMinus, TiEquals } from "react-icons/ti";
import TransitImage from "./TransitImage";
import TransitModal from "./TransitImagePopup";

const TransitFormFields = ({
  transitDetails,
  handleInputChange,
  setModalRef
}: FormFieldsProps) => {
  const [activeImage, setActiveImage] = useState<string[]>([]);
  const [popupActive, setPopupActive] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const [productList, setProductList] = useState<SelectOption[]>([]);
  const [productLoading, setProductLoading] = useState(false);

  console.log(transitDetails, "thghdvfugsdvfcgywgfvwsdvfcg");

  useEffect(() => {}, []);

  const OpenPopUp = (title: string, image: string[]) => {
    setPopupActive(true);
    setActiveImage(image || []);
    setActiveTitle(title || "");
  };

  const ClosePopUp = () => {
    setPopupActive(false);
    setActiveImage([]);
    setActiveTitle("");
  };

  return (
    <form className="grid grid-cols-3 gap-y-4 gap-x-2 mt-0">
      {/* ================= Weighing ================= */}
      <WeighInputTag
        id="in_weight"
        label="In Weight"
        value={transitDetails.in_weight.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) =>
          handleInputChange("in_weight", val, isValid)
        }
        symbol={<TiMinus />}
        readonly={true}
        timeStamp={formatDateTime(transitDetails?.in_timestamp?.value)}
        weightType={transitDetails?.in_weight_type?.value}
      />

      <WeighInputTag
        id="out_weight"
        label="Out Weight"
        value={transitDetails.out_weight.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) =>
          handleInputChange("out_weight", val, isValid)
        }
        symbol={<TiEquals />}
        readonly={true}
        timeStamp={formatDateTime(transitDetails?.out_timestamp?.value)}
        weightType={transitDetails?.out_weight_type?.value}
      />

      <WeighInputTag
        id="net_weight"
        type="text"
        label="Net Weight"
        value={transitDetails.net_weight.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) =>
          handleInputChange("net_weight", val, isValid)
        }
        readonly={true}
      />

      {/* ================= Product & Entry ================= */}
      <InputTag
        id="InProduct"
        type="text"
        label="In Material"
        value={transitDetails.in_product.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("in_product", val, isValid)
        }
      />
      <InputTag
        id="OutProduct"
        type="text"
        label="Out Material"
        value={transitDetails.out_product.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("in_product", val, isValid)
        }
      />
      <hr className="col-span-3 border-gray-400 mb-2" />

      <InputTag
        id="vehicle_no"
        type="text"
        label="Vehicle No"
        value={transitDetails.vehicle_no.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("vehicle_no", val, isValid)
        }
      />

      <InputTag
        id="driver_name"
        type="text"
        label="Driver Name"
        value={transitDetails.driver_name.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("driver_name", val, isValid)
        }
      />

      <InputTag
        id="aadhar_no"
        type="text"
        label="Driver Aadhar No"
        value={transitDetails.aadhar.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(12)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("aadhar", val, isValid)
        }
      />

      <InputTag
        id="license_no"
        type="text"
        label="Driver License No"
        value={transitDetails.driving_license.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("driving_license", val, isValid)
        }
      />

      <InputTag
        id="permit_no"
        type="text"
        label="Permit No"
        value={transitDetails.permit.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("permit", val, isValid)
        }
      />

      <InputTag
        id="customer"
        type="text"
        label="Customer"
        value={transitDetails.customer.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("customer", val, isValid)
        }
      />

      <InputTag
        id="customer_mobile"
        type="text"
        label="Customer Mobile No"
        value={transitDetails.customer_no.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("customer_no", val, isValid)
        }
      />

      <div className="col-span-3">
        <TextareaTag
          id="remarks"
          label="Remarks / Notes"
          value={transitDetails.remarks.value}
          validators={[]}
          onChangeVal={(val, isValid) =>
            handleInputChange("remarks", val, isValid)
          }
          readonly={false}
          placeholder="Enter any additional remarks or notes here..."
        />
      </div>

      <hr className="col-span-3 border-gray-400 mb-2" />

      {/* ================= Finance ================= */}

      <InputTag
        id="supplier"
        type="text"
        label="Supplier"
        value={transitDetails.supplier.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) =>
          handleInputChange("supplier", val, isValid)
        }
        readonly={true}
      />

      <InputTag
        id="rate_per_ton"
        type="text"
        label="Rate per Ton"
        value={transitDetails.rate_per_ton.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) =>
          handleInputChange("rate_per_ton", val, isValid)
        }
        readonly={true}
      />

      <InputTag
        id="material_cost"
        type="text"
        label="Material Cost"
        value={transitDetails.material_cost.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) =>
          handleInputChange("material_cost", val, isValid)
        }
        readonly={true}
      />

      <InputTag
        id="tax"
        type="text"
        label="Tax (%)"
        value={transitDetails.tax.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChangeVal={(val, isValid) => handleInputChange("tax", val, isValid)}
        readonly={true}
      />

      <InputTag
        id="tax_amount"
        type="text"
        label="Tax Amount"
        value={transitDetails.total_tax.value}
        validators={[]}
        onChangeVal={(val, isValid) =>
          handleInputChange("total_tax", val, isValid)
        }
      />

      <InputTag
        id="total_amount"
        type="text"
        label="Net Amount"
        value={transitDetails.gross_amount.value}
        validators={[]}
        onChangeVal={(val, isValid) =>
          handleInputChange("gross_amount", val, isValid)
        }
        styles="font-bold text-lg"
        readonly={true}
      />

      <hr className="col-span-3 border-black/60 mb-2" />

      {/* ================= Images ================= */}
      <div className="col-span-3 grid grid-cols-2 gap-2">
        <TransitImage
          id="in_entry_images"
          label="In Entry"
          onClick={OpenPopUp}
          imageUrls={transitDetails?.in_images?.value}
        />
        <TransitImage
          id="out_entry_images"
          label="Out Entry"
          onClick={OpenPopUp}
          imageUrls={transitDetails?.out_images?.value}
        />
      </div>

      <TransitModal
        title={activeTitle}
        ImageList={activeImage}
        isOpen={popupActive}
        onClose={ClosePopUp}
        setModalRef={setModalRef}
      />
    </form>
  );
};

export default TransitFormFields;
