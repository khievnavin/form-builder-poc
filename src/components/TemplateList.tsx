import type { Template } from "../types";
import { Button } from "./ui/Button";

export interface TemplateListProps {
  templates: Template[];
  onCreate: () => void;
  onEdit: (id: string) => void;
  onUse: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TemplateList({ templates, onCreate, onEdit, onUse, onDelete }: TemplateListProps) {
  return (
    <section aria-labelledby="templates-title">
      <div className="list__head">
        <h2 id="templates-title">Templates</h2>
        <Button variant="primary" onClick={onCreate}>New template</Button>
      </div>
      {templates.length === 0 ? (
        <p className="muted">No templates yet. Create one to get started.</p>
      ) : (
        <ul className="list">
          {templates.map((t) => (
            <li key={t.id} className="list__row">
              <div>
                <strong>{t.name}</strong>
                <div className="muted">
                  {t.fields.length} {t.fields.length === 1 ? "component" : "components"} · updated{" "}
                  {new Date(t.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="list__actions">
                <Button onClick={() => onUse(t.id)}>Open as form</Button>
                <Button variant="ghost" onClick={() => onEdit(t.id)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(t.id)} aria-label={`Delete ${t.name}`}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
