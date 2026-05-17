const { test, expect } = require('@playwright/test');

test('Locator test', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel ("Employed").check();
  await page.getByLabel ("Gender").selectOption("Male");
  await page.getByPlaceholder("Password").fill("Isuru");
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator("app-card").filter({ hasText: 'Blackberry' }).getByRole("button").click();

});
