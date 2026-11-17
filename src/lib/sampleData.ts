import type { Template } from "../types";

export const sampleTemplate: Template = {
  id: "sample-intake",
  name: "Client intake",
  updatedAt: "2026-11-01T09:00:00.000Z",
  fields: [
    { id: "f1", type: "text", label: "Full name", placeholder: "Sok Dara", required: true },
    { id: "f2", type: "select", label: "Service", required: true, options: ["Consulting", "Support", "Training"] },
    { id: "f3", type: "date", label: "Preferred start date" },
    { id: "f4", type: "textarea", label: "Project notes", helpText: "Anything we should know before we start." },
    { id: "f5", type: "checkbox", label: "I agree to be contacted by email", required: true },
  ],
};
