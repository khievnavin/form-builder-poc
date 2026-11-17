import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PropertyPanel } from "./PropertyPanel";
import { sampleTemplate } from "../../lib/sampleData";

const meta = {
  title: "Builder/PropertyPanel",
  component: PropertyPanel,
  args: { onChange: fn() },
} satisfies Meta<typeof PropertyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NothingSelected: Story = { args: { field: null } };
export const TextField: Story = { args: { field: sampleTemplate.fields[0] } };
export const DropdownField: Story = { args: { field: sampleTemplate.fields[1] } };
export const CheckboxField: Story = { args: { field: sampleTemplate.fields[4] } };
