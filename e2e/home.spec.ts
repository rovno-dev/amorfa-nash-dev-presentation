import { test, expect } from "@playwright/test";

test("homepage lists notes and creates one", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Notes" })).toBeVisible();

  const title = `e2e-${Date.now()}`;
  await page.getByPlaceholder("Title").fill(title);
  await page.getByRole("button", { name: "Create" }).click();

  await expect(page.getByText(title)).toBeVisible();
});
