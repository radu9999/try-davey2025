import Login from "@/pages/auth/login";
import { Meta, StoryObj } from "@storybook/react";

const login = {
  title: "Components/Login",
  component: Login,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Login>;

export default login;
type Story = StoryObj<typeof login>;

export const Default: Story = {};
