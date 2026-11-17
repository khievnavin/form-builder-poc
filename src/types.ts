export type FieldType = "text" | "email" | "phone" | "url" | "number" | "textarea" | "select" | "radio" | "checkbox" | "date" | "time";

export interface FieldDef {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  /** Used by choice fields. */
  options?: string[];
}

export interface Template {
  id: string;
  name: string;
  fields: FieldDef[];
  updatedAt: string;
}

export type FieldValue = string | boolean;
export type FormValues = Record<string, FieldValue>;
export type FormErrors = Record<string, string>;
