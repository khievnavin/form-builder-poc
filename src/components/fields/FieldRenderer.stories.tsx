import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FieldRenderer, type FieldRendererProps } from "./FieldRenderer";
import type { FieldValue } from "../../types";

/** Wraps the controlled field so every story is interactive. */
function Controlled(props: FieldRendererProps) {
  const [value, setValue] = useState<FieldValue | undefined>(props.value);
  return <FieldRenderer {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Fields/FieldRenderer",
  component: FieldRenderer,
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof FieldRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortText: Story = {
  args: { def: { id: "name", type: "text", label: "Full name", placeholder: "Sok Dara", required: true } },
};
export const LongText: Story = {
  args: { def: { id: "notes", type: "textarea", label: "Project notes", helpText: "Anything we should know." } },
};
export const Dropdown: Story = {
  args: { def: { id: "svc", type: "select", label: "Service", options: ["Consulting", "Support", "Training"] } },
};
export const Checkbox: Story = {
  args: { def: { id: "agree", type: "checkbox", label: "I agree to be contacted", required: true } },
};
export const DateField: Story = {
  args: { def: { id: "start", type: "date", label: "Preferred start date" } },
};
export const WithError: Story = {
  args: {
    def: { id: "name", type: "text", label: "Full name", required: true },
    error: "This field is required.",
  },
};
export const Disabled: Story = {
  args: { def: { id: "name", type: "text", label: "Full name" }, disabled: true },
};
