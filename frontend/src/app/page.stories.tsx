import type { Meta, StoryObj } from "@storybook/react";

import Page from "./page";

const meta = {
  component: Page,
  title: "Pages/landing-page",
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LandingPage: Story = {};
