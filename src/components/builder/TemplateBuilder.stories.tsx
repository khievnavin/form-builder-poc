import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { TemplateBuilder } from "./TemplateBuilder";
import { sampleTemplate } from "../../lib/sampleData";

const meta = {
  title: "Builder/TemplateBuilder",
  component: TemplateBuilder,
  parameters: { layout: "fullscreen" },
  args: { onSave: fn(), onCancel: fn() },
} satisfies Meta<typeof TemplateBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewTemplate: Story = {};

export const EditExisting: Story = { args: { template: sampleTemplate } };

export const AddAndSave: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Short text/ }));
    await userEvent.click(canvas.getByRole("button", { name: "Save template" }));
    await expect(args.onSave).toHaveBeenCalledTimes(1);
  },
};
