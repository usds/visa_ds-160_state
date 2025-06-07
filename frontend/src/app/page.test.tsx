import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../messages/en.json";

test("Home", () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Home />
    </NextIntlClientProvider>
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "U.S. Department of State" })
  ).toBeDefined();
});
