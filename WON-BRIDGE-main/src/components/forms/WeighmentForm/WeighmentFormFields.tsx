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
import WeightImage from "./WeighmentImage";
import WeighmentModal from "./WeighmentImagePopup";

const WeighmentFormFields = ({
  weighmentDetails,
  handleInputChange,
  setModalRef
}: FormFieldsProps) => {
  const [activeImage, setActiveImage] = useState<string[]>([]);
  const [popupActive, setPopupActive] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const [productList, setProductList] = useState<SelectOption[]>([]);
  const [productLoading, setProductLoading] = useState(false);

  console.log(weighmentDetails, "thghdvfugsdvfcgywgfvwsdvfcg");

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
      <div className="col-span-3">
        <WeighInputTag
          id="weight"
          label="Weight"
          value={weighmentDetails.weight.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeVal={(val, isValid) =>
            handleInputChange("in_weight", val, isValid)
          }
          readonly={true}
          timeStamp={formatDateTime(weighmentDetails?.timestamp?.value)}
        />
      </div>

      {/* ================= Product & Entry ================= */}
      <InputTag
        id="tripId"
        type="text"
        label="Trip ID"
        value={weighmentDetails.trip_id.value || "N/A"}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("trip_id", val, isValid)
        }
      />
      <InputTag
        id="operator_id"
        type="text"
        label="Operator ID"
        value={weighmentDetails.operator_id.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("operator_id", val, isValid)
        }
      />
      <hr className="col-span-3 border-gray-400 mb-2" />

      <InputTag
        id="status"
        type="text"
        label="Status"
        value={weighmentDetails.status.value}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onChangeVal={(val, isValid) =>
          handleInputChange("status", val, isValid)
        }
      />
      <p className="text-black col-span-3">
        {weighmentDetails?.resolve_message?.value}{" "}
        {formatDateTime(weighmentDetails?.resolved_on?.value)}
      </p>

      <hr className="col-span-3 border-gray-400 mb-2" />

      {/* ================= Finance ================= */}

      {/* ================= Images ================= */}
      <div className="col-span-3 grid grid-cols-2 gap-2">
        <WeightImage
          id="in_entry_images"
          label="In Entry"
          onClick={OpenPopUp}
          imageUrls={weighmentDetails?.images?.value}
        />
      </div>

      <WeighmentModal
        title={activeTitle}
        ImageList={activeImage}
        isOpen={popupActive}
        onClose={ClosePopUp}
        setModalRef={setModalRef}
      />
    </form>
  );
};

export default WeighmentFormFields;
