import { useState, type FormEvent } from "react";
import type { FormErrors, FormValues, Template } from "../../types";
import { validate } from "../../lib/validate";
import { Button } from "../ui/Button";
import { FieldRenderer } from "../fields/FieldRenderer";

export interface FormRendererProps {
  template: Template;
  onSubmit: (values: FormValues) => void | Promise<void>;
  submitLabel?: string;
}

export function FormRenderer({ template, onSubmit, submitLabel = "Submit" }: FormRendererProps) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(template.fields, values);
    setErrors(found);
    if (Object.keys(found).length === 0) await onSubmit(values);
  };

  return (
    <form className="form" onSubmit={handle} noValidate aria-label={template.name}>
      <h2 className="form__title">{template.name}</h2>
      {template.fields.map((f) => (
        <FieldRenderer
          key={f.id}
          def={f}
          idPrefix="form"
          value={values[f.id]}
          error={errors[f.id]}
          onChange={(v) => {
            setValues((prev) => ({ ...prev, [f.id]: v }));
            if (errors[f.id]) setErrors((prev) => ({ ...prev, [f.id]: "" }));
          }}
        />
      ))}
      <Button variant="primary" type="submit">{submitLabel}</Button>
    </form>
  );
}
