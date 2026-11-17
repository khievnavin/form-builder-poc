import type { Template } from "../types";

/**
 * Persistence boundary. The POC stores templates in localStorage;
 * replace this with an HTTP implementation (e.g. the NestJS API) later
 * without touching any component.
 */
export interface TemplateRepository {
  list(): Promise<Template[]>;
  get(id: string): Promise<Template | undefined>;
  save(template: Template): Promise<Template>;
  remove(id: string): Promise<void>;
}

const KEY = "form-builder-poc:templates";

const read = (): Template[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Template[]) : [];
  } catch {
    return [];
  }
};

const write = (templates: Template[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(templates));
  } catch {
    /* storage unavailable: ignore in the POC */
  }
};

export const localTemplateRepository: TemplateRepository = {
  async list() {
    return read().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },
  async get(id) {
    return read().find((t) => t.id === id);
  },
  async save(template) {
    const next = { ...template, updatedAt: new Date().toISOString() };
    const all = read().filter((t) => t.id !== template.id);
    write([...all, next]);
    return next;
  },
  async remove(id) {
    write(read().filter((t) => t.id !== id));
  },
};

/** In-memory repository, handy for stories and tests. */
export const createMemoryRepository = (seed: Template[] = []): TemplateRepository => {
  let items = [...seed];
  return {
    async list() {
      return [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
    async get(id) {
      return items.find((t) => t.id === id);
    },
    async save(template) {
      const next = { ...template, updatedAt: new Date().toISOString() };
      items = [...items.filter((t) => t.id !== template.id), next];
      return next;
    },
    async remove(id) {
      items = items.filter((t) => t.id !== id);
    },
  };
};
