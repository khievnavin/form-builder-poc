import type { FieldDef } from "../../types";
import { fieldTitle } from "../../lib/fieldRegistry";
import { Button } from "../ui/Button";
import { FieldRenderer } from "../fields/FieldRenderer";

export interface CanvasProps {
  fields: FieldDef[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  onRemove: (id: string) => void;
}

export function Canvas({ fields, selectedId, onSelect, onMove, onRemove }: CanvasProps) {
  if (fields.length === 0) {
    return (
      <div className="canvas canvas--empty">
        <p>This template has no components yet. Add one from the Components list.</p>
      </div>
    );
  }

  return (
    <ol className="canvas">
      {fields.map((f, i) => {
        const selected = f.id === selectedId;
        return (
          <li key={f.id} className={`canvas__row${selected ? " canvas__row--selected" : ""}`}>
            <div
              className="canvas__preview"
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              aria-label={`Edit ${f.label} (${fieldTitle(f.type)})`}
              onClick={() => onSelect(f.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(f.id);
                }
              }}
            >
              {/* inert: preview only, the Properties panel edits the field */}
              <div className="canvas__inert" inert>
                <FieldRenderer def={f} idPrefix="canvas" />
              </div>
            </div>
            <div className="canvas__actions">
              <Button size="sm" variant="ghost" disabled={i === 0} onClick={() => onMove(f.id, -1)}
                aria-label={`Move ${f.label} up`}>Up</Button>
              <Button size="sm" variant="ghost" disabled={i === fields.length - 1} onClick={() => onMove(f.id, 1)}
                aria-label={`Move ${f.label} down`}>Down</Button>
              <Button size="sm" variant="danger" onClick={() => onRemove(f.id)}
                aria-label={`Remove ${f.label}`}>Remove</Button>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
