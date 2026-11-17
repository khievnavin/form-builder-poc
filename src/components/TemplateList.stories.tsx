import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TemplateList } from "./TemplateList";
import { sampleTemplate } from "../lib/sampleData";

const meta = {
  title: "App/TemplateList",
  component: TemplateList,
  args: { onCreate: fn(), onEdit: fn(), onUse: fn(), onDelete: fn() },
} satisfies Meta<typeof TemplateList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTemplates: Story = {
  args: { templates: [sampleTemplate, { ...sampleTemplate, id: "b", name: "Feedback survey", fields: sampleTemplate.fields.slice(0, 2) }] },
};
export const Empty: Story = { args: { templates: [] } };
