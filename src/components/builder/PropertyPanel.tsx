import type { FieldDef } from "../../types";
import { fieldTitle } from "../../lib/fieldRegistry";

export interface PropertyPanelProps {
  field: FieldDef | null;
  onChange: (patch: Partial<Omit<FieldDef, "id" | "type">>) => void;
}

export function PropertyPanel({ field, onChange }: PropertyPanelProps) {
  if (!field) {
    return (
      <section className="panel" aria-labelledby="props-title">
        <h2 id="props-title" className="panel__title">Properties</h2>
        <p className="muted">Select a component on the canvas to edit it.</p>
      </section>
    );
  }

  const hasPlaceholder = field.type === "text" || field.type === "email" || field.type === "phone" || field.type === "url" || field.type === "textarea";

  return (
    <section className="panel" aria-labelledby="props-title">
      <h2 id="props-title" className="panel__title">Properties · {fieldTitle(field.type)}</h2>

      <div className="field">
        <label className="field__label" htmlFor="prop-label">Label</label>
        <input id="prop-label" className="input" value={field.label}
          onChange={(e) => onChange({ label: e.target.value })} />
      </div>

      {hasPlaceholder && (
        <div className="field">
          <label className="field__label" htmlFor="prop-placeholder">Placeholder</label>
          <input id="prop-placeholder" className="input" value={field.placeholder ?? ""}
            onChange={(e) => onChange({ placeholder: e.target.value })} />
        </div>
      )}

      <div className="field">
        <label className="field__label" htmlFor="prop-help">Help text</label>
        <input id="prop-help" className="input" value={field.helpText ?? ""}
          onChange={(e) => onChange({ helpText: e.target.value })} />
      </div>

      {(field.type === "select" || field.type === "radio") && (
        <div className="field">
          <label className="field__label" htmlFor="prop-options">Options (one per line)</label>
          <textarea id="prop-options" className="input" rows={5} value={(field.options ?? []).join("\n")}
            onChange={(e) => onChange({ options: e.target.value.split("\n") })} />
        </div>
      )}

      <label className="check">
        <input type="checkbox" checked={field.required === true}
          onChange={(e) => onChange({ required: e.target.checked })} />
        <span>Required</span>
      </label>
    </section>
  );
}
