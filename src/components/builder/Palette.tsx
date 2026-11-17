import type { FieldType } from "../../types";
import { FIELD_REGISTRY } from "../../lib/fieldRegistry";

export interface PaletteProps {
  onAdd: (type: FieldType) => void;
}

export function Palette({ onAdd }: PaletteProps) {
  return (
    <section aria-labelledby="palette-title" className="panel">
      <h2 id="palette-title" className="panel__title">Components</h2>
      <ul className="palette">
        {FIELD_REGISTRY.map((f) => (
          <li key={f.type}>
            <button type="button" className="palette__item" onClick={() => onAdd(f.type)}>
              <span className="palette__name">{f.title}</span>
              <span className="palette__desc">{f.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
