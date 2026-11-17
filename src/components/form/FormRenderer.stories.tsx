import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { FormRenderer } from "./FormRenderer";
import { sampleTemplate } from "../../lib/sampleData";

const meta = {
  title: "Form/FormRenderer",
  component: FormRenderer,
  args: { template: sampleTemplate, onSubmit: fn() },
} satisfies Meta<typeof FormRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShowsValidationErrors: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(canvas.getAllByRole("alert").length).toBeGreaterThan(0);
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const SubmitsValidForm: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Full name/), "Sok Dara");
    await userEvent.selectOptions(canvas.getByLabelText(/Service/), "Support");
    await userEvent.click(canvas.getByLabelText(/agree to be contacted/));
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
  },
};
