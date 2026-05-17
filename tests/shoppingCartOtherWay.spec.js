const { test, expect } = require('@playwright/test');

test.only('Shopping Cart Test', async ({ page }) => {

  const email = "isurutestng@gmail.com";
  const products = page.locator('.card-body');
  const productName = 'ZARA COAT 3';

  await page.goto("https://rahulshettyacademy.com/client/");

  const userName = page.getByPlaceholder('email@example.com');
  const password = page.getByPlaceholder('enter your passsword');
  const signIn = page.getByRole('button', { name: 'Login' });
  await userName.fill(email);
  await password.fill("");
  await signIn.click();
  await page.waitForLoadState('networkidle');

  await page.locator(".card-body").filter({ hasText: 'ZARA COAT 3' }).
  getByRole('button', { name: 'Add To Cart' }).click();
  await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();
 
 await page.locator("div li").first().waitFor();
 await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 await page.getByRole('button', { name: 'Checkout' }).click();
 
  await page.waitForLoadState('networkidle');
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole('button', { name: 'India' }).nth(1).click();
  await page.getByText('Place Order ').click();
  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

 //navigate to oders
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
 const rows = await page.locator("tbody tr");

 for (let i=0; i<await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)){
        await rows.nth(i).locator("button").first().click();
        break;
    }
 }

 const orderIdDetails = await page.locator(".col-text").textContent();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
