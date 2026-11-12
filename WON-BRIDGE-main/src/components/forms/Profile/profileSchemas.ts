import type { ProfileSchema } from "./utils";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "@/components/UIElements/Input-Elements/input-validators";
import {
  ShiftOptions,
  staffTypeOptions,
  genderOptions
} from "@/components/UIElements/Input-Elements/default-values";

export const profileSchemas: ProfileSchema = {
  manager: [
    {
      editActive: false,
      title: "Personal Information",
      fields: [
        {
          name: "full_name",
          label: "Full Name",
          type: "text",
          required: true,
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          editable: false,
          validators: [VALIDATOR_EMAIL()]
        },
        {
          name: "phone",
          label: "Phone",
          type: "tel",
          editable: false,
          validators: [VALIDATOR_REQUIRE()]
        }
      ]
    },
    {
      editActive: false,
      title: "Address",
      fields: [
        {
          name: "pincode",
          label: "Pincode",
          type: "text",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        { name: "street", label: "Street", type: "text", editable: true },
        { name: "city", label: "City", type: "text", editable: false },
        { name: "state", label: "State", type: "text", editable: false }
      ]
    }
  ],

  admin: [
    {
      editActive: false,
      title: "Personal Information",
      fields: [
        {
          name: "full_name",
          label: "Full Name",
          type: "text",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          editable: true,
          validators: [VALIDATOR_EMAIL()]
        },
        {
          name: "phone",
          label: "Phone",
          type: "tel",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        }
      ]
    },
    {
      editActive: false,
      title: "Address",
      fields: [
        {
          name: "pincode",
          label: "Pincode",
          type: "text",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        { name: "street", label: "Street", type: "text", editable: true },
        { name: "city", label: "City", type: "text", editable: true },
        { name: "state", label: "State", type: "text", editable: true }
      ]
    },
    {
      editActive: false,
      title: "Business Info",
      fields: [
        {
          name: "company_name",
          label: "Company Name",
          type: "text",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "crusher_name",
          label: "Crusher Name",
          type: "text",
          editable: true
        },
        {
          name: "crusher_location",
          label: "Crusher Location",
          type: "text",
          editable: true
        },
        {
          name: "capacity",
          label: "Capacity (TPH)",
          type: "number",
          editable: true
        },
        {
          name: "machine_brand",
          label: "Machine Brand",
          type: "text",
          editable: true
        },
        {
          name: "year_installed",
          label: "Year Installed",
          type: "number",
          editable: true
        },
        {
          name: "ownership_type",
          label: "Ownership Type",
          type: "select",
          editable: true,
          options: [
            { label: "Individual", value: "individual" },
            { label: "Partnership", value: "partnership" },
            { label: "Company", value: "company" },
            { label: "Other", value: "other" }
          ],
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          editable: true,
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" }
          ],
          validators: [VALIDATOR_REQUIRE()]
        }
      ]
    }
  ],

  'supervisor': [
    {
      editActive: false,
      title: "Personal Information",
      fields: [
        {
          name: "full_name",
          label: "Full Name",
          type: "text",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          editable: true,
          validators: [VALIDATOR_EMAIL()]
        },
        {
          name: "phone",
          label: "Phone",
          type: "tel",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "assigned_shift",
          label: "Assigned Shift",
          type: "select",
          editable: true,
          options: ShiftOptions,
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          editable: true,
          options: genderOptions,
          validators: [VALIDATOR_REQUIRE()]
        }
      ]
    },
    {
      editActive: false,
      title: "Address",
      fields: [
        {
          name: "pincode",
          label: "Pincode",
          type: "text",
          editable: true,
          validators: [VALIDATOR_REQUIRE()]
        },
        { name: "street", label: "Street", type: "text", editable: true },
        { name: "city", label: "City", type: "text", editable: true },
        { name: "district", label: "District", type: "text", editable: true },
        { name: "state", label: "State", type: "text", editable: true }
      ]
    },
    {
      editActive: false,
      title: "Work Details",
      fields: [
        {
          name: "work_location",
          label: "Work Location",
          type: "text",
          editable: true
        },
        {
          name: "date_of_joining",
          label: "Date of Joining",
          type: "date",
          editable: true
        },
        {
          name: "date_of_resignation",
          label: "Date of Resignation",
          type: "date",
          editable: true
        },
        {
          name: "role",
          label: "Role",
          type: "select",
          editable: true,
          options: staffTypeOptions,
          validators: [VALIDATOR_REQUIRE()]
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          editable: false,
          options: [
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" }
          ],
          validators: [VALIDATOR_REQUIRE()]
        }
      ]
    }
  ]
};
