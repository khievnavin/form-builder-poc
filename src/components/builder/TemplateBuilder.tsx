import { useReducer } from "react";
import type { Template } from "../../types";
import { Button } from "../ui/Button";
import { Palette } from "./Palette";
import { Canvas } from "./Canvas";
import { PropertyPanel } from "./PropertyPanel";
import { builderReducer, initBuilderState } from "./builderState";

export interface TemplateBuilderProps {
  template?: Template;
  onSave: (template: Template) => void | Promise<void>;
  onCancel?: () => void;
}

export function TemplateBuilder({ template, onSave, onCancel }: TemplateBuilderProps) {
  const [state, dispatch] = useReducer(builderReducer, template, initBuilderState);
  const selected = state.fields.find((f) => f.id === state.selectedId) ?? null;

  const save = async () => {
    // Dropdown options: drop blank lines only when saving so typing stays fluid.
    const fields = state.fields.map((f) =>
      f.type === "select" ? { ...f, options: (f.options ?? []).map((o) => o.trim()).filter(Boolean) } : f,
    );
    await onSave({
      id: state.id,
      name: state.name.trim() || "Untitled template",
      fields,
      updatedAt: new Date().toISOString(),
    });
    dispatch({ type: "saved" });
  };

  return (
    <div className="builder">
      <header className="builder__header">
        <div className="field builder__name">
          <label className="field__label" htmlFor="template-name">Template name</label>
          <input id="template-name" className="input" value={state.name}
            onChange={(e) => dispatch({ type: "rename", name: e.target.value })} />
        </div>
        <div className="builder__actions">
          {onCancel && <Button variant="ghost" onClick={onCancel}>Back</Button>}
          <Button variant="primary" onClick={save} disabled={!state.dirty}>Save template</Button>
        </div>
      </header>

      <div className="builder__body">
        <Palette onAdd={(fieldType) => dispatch({ type: "add", fieldType })} />
        <section className="panel panel--canvas" aria-label="Template canvas">
          <Canvas
            fields={state.fields}
            selectedId={state.selectedId}
            onSelect={(id) => dispatch({ type: "select", id })}
            onMove={(id, direction) => dispatch({ type: "move", id, direction })}
            onRemove={(id) => dispatch({ type: "remove", id })}
          />
        </section>
        <PropertyPanel
          field={selected}
          onChange={(patch) => selected && dispatch({ type: "update", id: selected.id, patch })}
        />
      </div>
    </div>
  );
}
