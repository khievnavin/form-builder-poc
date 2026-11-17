import type { FieldDef, FormErrors, FormValues } from "../types";

export const validate = (fields: FieldDef[], values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  for (const f of fields) {
    if (!f.required) continue;
    const v = values[f.id];
    const empty = f.type === "checkbox" ? v !== true : typeof v !== "string" || v.trim() === "";
    if (empty) errors[f.id] = f.type === "checkbox" ? "This must be checked." : "This field is required.";
    else if (f.type === "email" && typeof v === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      errors[f.id] = "Enter a valid email address.";
    }
  }
  return errors;
};
