import type { FieldDef, FieldType } from "../types";

interface FieldMeta {
  type: FieldType;
  title: string;
  description: string;
  create: () => Omit<FieldDef, "id">;
}

export const FIELD_REGISTRY: FieldMeta[] = [
  {
    type: "text",
    title: "Short text",
    description: "Single-line answer",
    create: () => ({ type: "text", label: "Short text", placeholder: "" }),
  },
  {
    type: "email",
    title: "Email",
    description: "Email address",
    create: () => ({ type: "email", label: "Email address", placeholder: "name@example.com" }),
  },
  {
    type: "number",
    title: "Number",
    description: "Numeric answer",
    create: () => ({ type: "number", label: "Number" }),
  },
  {
    type: "textarea",
    title: "Long text",
    description: "Multi-line answer",
    create: () => ({ type: "textarea", label: "Long text", placeholder: "" }),
  },
  {
    type: "select",
    title: "Dropdown",
    description: "Pick one option",
    create: () => ({
      type: "select",
      label: "Dropdown",
      options: ["Option 1", "Option 2"],
    }),
  },
  {
    type: "radio",
    title: "Radio buttons",
    description: "Pick one option",
    create: () => ({ type: "radio", label: "Choose one", options: ["Option 1", "Option 2"] }),
  },
  {
    type: "checkbox",
    title: "Checkbox",
    description: "Yes or no",
    create: () => ({ type: "checkbox", label: "Checkbox" }),
  },
  {
    type: "date",
    title: "Date",
    description: "Calendar date",
    create: () => ({ type: "date", label: "Date" }),
  },
];

export const fieldTitle = (type: FieldType): string =>
  FIELD_REGISTRY.find((f) => f.type === type)?.title ?? type;

export const createField = (type: FieldType): FieldDef => {
  const meta = FIELD_REGISTRY.find((f) => f.type === type);
  if (!meta) throw new Error(`Unknown field type: ${type}`);
  return { id: crypto.randomUUID(), ...meta.create() };
};
