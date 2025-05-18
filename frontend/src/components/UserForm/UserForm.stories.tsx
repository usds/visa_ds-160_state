import type { Meta, StoryObj } from "@storybook/react";

import UserForm from "./UserForm";
import { useReactHookForm } from "../../../.storybook/decorators";

// Add formErrors as a custom arg for our story
type UserFormStoryArgs = React.ComponentProps<typeof UserForm> & {
  errors?: string[];
};

const meta: Meta<UserFormStoryArgs> = {
  title: "Components/UserForm",
  component: UserForm,
  decorators: [useReactHookForm],
  args: {
    onSubmit: () => null,
  },
  argTypes: {
    // Don't show onSubmit in the Controls tab
    onSubmit: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UserFormStoryArgs>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    errors: [
      "There was an unknown error submitting the form. Please try again.",
    ],
  },
};
export const Success: Story = {
  args: {
    successMessage: "Yay",
  },
};
