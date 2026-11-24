import { expect, test } from "@playwright/test";

test("landing and methodology are useful without authentication", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/MarketIQ/);
  await expect(page.getByRole("link", { name: "MarketIQ home" })).toBeVisible();
  await expect(page.getByText(/MarketIQ ranks a focused/i)).toBeVisible();
  await expect(page.getByText(/© 2026 MarketIQ/)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /See the signal/i }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: /Read the complete methodology/i })
    .click();
  await expect(
    page.getByRole("heading", { name: /Transparent enough/i }),
  ).toBeVisible();
  await expect(page).toHaveTitle(/Methodology · MarketIQ/);
  await expect(page.getByText(/MarketIQ produces a daily/i)).toBeVisible();
});

test("account and legal pages use MarketIQ branding", async ({ page }) => {
  await page.goto("/login");
  const authBrand = page.locator(".auth-card").getByText("MarketIQ");
  await expect(authBrand).toBeVisible();
  await page.goto("/privacy");
  await expect(page.getByText(/MarketIQ stores account/i)).toBeVisible();
  await page.goto("/terms");
  await expect(page.getByText(/Use MarketIQ to study/i)).toBeVisible();
});
