import {
  InputTag,
  ReactSelect
} from "@/components/UIElements/Input-Elements/Input-tags";
import type { FieldConfig } from "./utils";

interface Props {
  schema: FieldConfig[];
  data: any; // `profileData` or `adminDetails`
  onInputChange: (field: string, value: any, isValid: boolean) => void;
  isEditActive: boolean;
}

const DynamicForm = ({ schema, data, onInputChange, isEditActive }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-5 mt-2 w-full">
      {schema.map((field) => {
        const readOnly = !isEditActive || field.editable === false;

        if (field.type === "select" && field.options) {
          return (
            <ReactSelect
              key={field.name}
              id={field.name}
              label={field.label}
              value={
                field.options.find(
                  (opt) => opt.value === data[field.name]?.value
                ) || null
              }
              options={field.options}
              validators={field.validators || []}
              onChange={(val, isValid) =>
                onInputChange(field.name, val, isValid)
              }
              readonly={readOnly}
            />
          );
        }

        if (field.type === "date") {
          return (
            <InputTag
              key={field.name}
              id={field.name}
              type={field.type}
              label={field.label}
              value={data[field.name]?.value || ""}
              validators={field.validators || []}
              onChangeVal={(val, isValid) =>
                onInputChange(field.name, val, isValid)
              }
              readonly={readOnly}
              styles="uppercase"
            />
          );
        }

        return (
          <InputTag
            key={field.name}
            id={field.name}
            type={field.type}
            label={field.label}
            value={data[field.name]?.value || ""}
            validators={field.validators || []}
            onChangeVal={(val, isValid) =>
              onInputChange(field.name, val, isValid)
            }
            readonly={readOnly}
            // styles={`${readOnly ? "border-0 bg-transparent" : ""}`}
          />
        );
      })}
    </div>
  );
};

export default DynamicForm;
