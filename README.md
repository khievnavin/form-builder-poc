# Form Builder POC (React + TypeScript + Storybook)

Users compose a **template** from components, save it, then open it as a **form** for clients.

## Run

```bash
npm install
npm run dev          # app at http://localhost:5173
npm run storybook    # component workshop at http://localhost:6006
npm run build        # typecheck + production build
```

## Structure

```
src/
  types.ts                         FieldDef, Template, FormValues
  lib/
    fieldRegistry.ts               component catalogue (add new field types here)
    templateRepository.ts          persistence boundary (localStorage now, swap for NestJS API)
    validate.ts                    required-field validation
    sampleData.ts                  fixture used by stories
  components/
    ui/Button                      shared button
    fields/FieldRenderer           renders one FieldDef (text, textarea, select, checkbox, date)
    builder/                       Palette, Canvas, PropertyPanel, TemplateBuilder + reducer
    form/FormRenderer              renders a Template as a fillable form
    TemplateList                   saved templates
  App.tsx                          list -> build -> fill flow
```

## Adding a field type

1. Add the type to `FieldType` in `src/types.ts`.
2. Add an entry in `src/lib/fieldRegistry.ts`.
3. Add a `case` in `FieldRenderer.tsx` (and any extra controls in `PropertyPanel.tsx`).
4. Add a story in `FieldRenderer.stories.tsx`.

## Connecting the backend / Keycloak

- Implement `TemplateRepository` over HTTP and pass it in place of `localTemplateRepository` in `App.tsx`.
- Add `keycloak-js` and wrap `<App />` in `main.tsx` once the realm and client are ready.

## Storybook interaction tests

`FormRenderer` and `TemplateBuilder` stories include `play` functions (validation, submit, add-and-save).
They run in the Storybook UI's Interactions panel.
# form-builder-poc
