import { useCallback, useEffect, useState } from "react";
import type { FormValues, Template } from "./types";
import { localTemplateRepository as repo } from "./lib/templateRepository";
import { TemplateList } from "./components/TemplateList";
import { TemplateBuilder } from "./components/builder/TemplateBuilder";
import { FormRenderer } from "./components/form/FormRenderer";
import { Button } from "./components/ui/Button";

type View =
  | { name: "list" }
  | { name: "build"; template?: Template }
  | { name: "fill"; template: Template; submitted?: FormValues };

export default function App() {
  const [view, setView] = useState<View>({ name: "list" });
  const [templates, setTemplates] = useState<Template[]>([]);

  const refresh = useCallback(async () => setTemplates(await repo.list()), []);
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const open = async (id: string, name: "build" | "fill") => {
    const template = await repo.get(id);
    if (template) setView({ name, template } as View);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Form builder</h1>
        <p className="muted">Compose a template from components, then use it as a form for clients.</p>
      </header>

      <main className="app__main">
        {view.name === "list" && (
          <TemplateList
            templates={templates}
            onCreate={() => setView({ name: "build" })}
            onEdit={(id) => void open(id, "build")}
            onUse={(id) => void open(id, "fill")}
            onDelete={async (id) => {
              await repo.remove(id);
              await refresh();
            }}
          />
        )}

        {view.name === "build" && (
          <TemplateBuilder
            // remount when switching between templates
            key={view.template?.id ?? "new"}
            template={view.template}
            onCancel={() => setView({ name: "list" })}
            onSave={async (t) => {
              await repo.save(t);
              await refresh();
              setView({ name: "list" });
            }}
          />
        )}

        {view.name === "fill" && (
          <div className="fill">
            <Button variant="ghost" onClick={() => setView({ name: "list" })}>Back to templates</Button>
            {view.submitted ? (
              <section className="panel" aria-live="polite">
                <h2 className="panel__title">Submitted</h2>
                <pre className="pre">{JSON.stringify(view.submitted, null, 2)}</pre>
                <Button onClick={() => setView({ name: "fill", template: view.template })}>Fill again</Button>
              </section>
            ) : (
              <FormRenderer
                template={view.template}
                onSubmit={(values) => setView({ name: "fill", template: view.template, submitted: values })}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
