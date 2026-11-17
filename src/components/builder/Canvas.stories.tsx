import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Canvas } from "./Canvas";
import { sampleTemplate } from "../../lib/sampleData";

const meta = {
  title: "Builder/Canvas",
  component: Canvas,
  args: {
    fields: sampleTemplate.fields,
    selectedId: null,
    onSelect: fn(),
    onMove: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof Canvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSelection: Story = { args: { selectedId: "f2" } };
export const Empty: Story = { args: { fields: [] } };
