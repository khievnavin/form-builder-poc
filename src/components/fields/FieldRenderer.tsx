import type { FieldDef, FieldValue } from "../../types";
import { FieldShell, describedBy } from "./FieldShell";

export interface FieldRendererProps {
  def: FieldDef;
  value?: FieldValue;
  onChange?: (value: FieldValue) => void;
  error?: string;
  disabled?: boolean;
  /** Prefix for DOM ids so the same field can appear twice on a page. */
  idPrefix?: string;
}

export function FieldRenderer({ def, value, onChange, error, disabled, idPrefix = "field" }: FieldRendererProps) {
  const id = `${idPrefix}-${def.id}`;
  const common = {
    id,
    disabled,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, def.helpText, error),
  } as const;
  const str = typeof value === "string" ? value : "";

  let control;
  switch (def.type) {
    case "text":
      control = (
        <input {...common} className="input" type="text" placeholder={def.placeholder} value={str}
          onChange={(e) => onChange?.(e.target.value)} />
      );
      break;
    case "email":
      control = <input {...common} className="input" type="email" placeholder={def.placeholder} value={str}
        onChange={(e) => onChange?.(e.target.value)} />;
      break;
    case "phone":
      control = <input {...common} className="input" type="tel" placeholder={def.placeholder} value={str}
        onChange={(e) => onChange?.(e.target.value)} />;
      break;
    case "url":
      control = <input {...common} className="input" type="url" placeholder={def.placeholder} value={str}
        onChange={(e) => onChange?.(e.target.value)} />;
      break;
    case "number":
      control = <input {...common} className="input" type="number" value={str}
        onChange={(e) => onChange?.(e.target.value)} />;
      break;
    case "textarea":
      control = (
        <textarea {...common} className="input" rows={4} placeholder={def.placeholder} value={str}
          onChange={(e) => onChange?.(e.target.value)} />
      );
      break;
    case "select":
      control = (
        <select {...common} className="input" value={str} onChange={(e) => onChange?.(e.target.value)}>
          <option value="">Select…</option>
          {(def.options ?? []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      );
      break;
    case "radio":
      control = (
        <div className="choices" role="radiogroup" aria-label={def.label} aria-describedby={common["aria-describedby"]} aria-invalid={common["aria-invalid"]}>
          {(def.options ?? []).map((option, index) => {
            const optionId = `${id}-${index}`;
            return <label className="check" htmlFor={optionId} key={`${option}-${index}`}>
              <input id={optionId} type="radio" name={id} value={option} checked={str === option} disabled={disabled}
                onChange={() => onChange?.(option)} />
              <span>{option}</span>
            </label>;
          })}
        </div>
      );
      break;
    case "date":
      control = (
        <input {...common} className="input" type="date" value={str} onChange={(e) => onChange?.(e.target.value)} />
      );
      break;
    case "time":
      control = <input {...common} className="input" type="time" value={str} onChange={(e) => onChange?.(e.target.value)} />;
      break;
    case "checkbox":
      control = (
        <label className="check" htmlFor={id}>
          <input {...common} type="checkbox" checked={value === true}
            onChange={(e) => onChange?.(e.target.checked)} />
          <span>
            {def.label}
            {def.required && <span className="field__req" aria-hidden="true"> *</span>}
          </span>
        </label>
      );
      break;
  }

  return (
    <FieldShell id={id} label={def.label} required={def.required} helpText={def.helpText} error={error}
      hideLabel={def.type === "checkbox"}>
      {control}
    </FieldShell>
  );
}
