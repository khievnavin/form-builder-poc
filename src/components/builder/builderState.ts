import type { FieldDef, FieldType, Template } from "../../types";
import { createField } from "../../lib/fieldRegistry";

export interface BuilderState {
  id: string;
  name: string;
  fields: FieldDef[];
  selectedId: string | null;
  dirty: boolean;
}

export type BuilderAction =
  | { type: "add"; fieldType: FieldType }
  | { type: "remove"; id: string }
  | { type: "move"; id: string; direction: -1 | 1 }
  | { type: "update"; id: string; patch: Partial<Omit<FieldDef, "id" | "type">> }
  | { type: "select"; id: string | null }
  | { type: "rename"; name: string }
  | { type: "saved" };

export const initBuilderState = (template?: Template): BuilderState => ({
  id: template?.id ?? crypto.randomUUID(),
  name: template?.name ?? "Untitled template",
  fields: template?.fields ?? [],
  selectedId: null,
  dirty: false,
});

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "add": {
      const field = createField(action.fieldType);
      return { ...state, fields: [...state.fields, field], selectedId: field.id, dirty: true };
    }
    case "remove":
      return {
        ...state,
        fields: state.fields.filter((f) => f.id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId,
        dirty: true,
      };
    case "move": {
      const i = state.fields.findIndex((f) => f.id === action.id);
      const j = i + action.direction;
      if (i < 0 || j < 0 || j >= state.fields.length) return state;
      const fields = [...state.fields];
      [fields[i], fields[j]] = [fields[j], fields[i]];
      return { ...state, fields, dirty: true };
    }
    case "update":
      return {
        ...state,
        fields: state.fields.map((f) => (f.id === action.id ? { ...f, ...action.patch } : f)),
        dirty: true,
      };
    case "select":
      return { ...state, selectedId: action.id };
    case "rename":
      return { ...state, name: action.name, dirty: true };
    case "saved":
      return { ...state, dirty: false };
  }
}
