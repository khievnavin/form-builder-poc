import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Palette } from "./Palette";

const meta = {
  title: "Builder/Palette",
  component: Palette,
  args: { onAdd: fn() },
} satisfies Meta<typeof Palette>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
