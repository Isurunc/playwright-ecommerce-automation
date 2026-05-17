const { test, expect } = require('@playwright/test');

test.only('Shopping Cart Test', async ({ page }) => {

  const email = "isurutestng@gmail.com";
  const products = page.locator('.card-body');
  const productName = 'ZARA COAT 3';

  await page.goto("https://rahulshettyacademy.com/client/");

  const userName = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const signIn = page.locator('#login');

  await userName.fill(email);
  await password.fill("");
  await signIn.click();
  await page.waitForLoadState('networkidle');

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // Add to cart
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

 // await page.pause(); // Pause to inspect the cart
 await page.locator("[routerlink*='cart']").click();
 await page.locator("div li").first().waitFor();
 const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
 expect(bool).toBeTruthy(); 
 await page.locator("text=checkout").click();
  await page.waitForLoadState('networkidle');
 await page.locator("[placeholder*='Country']").pressSequentially("ind");
 const dropdown = page.locator(".ta-results");
 await dropdown.waitFor();
 const optionsCount = await dropdown.locator("button").count();

 for (let i=0; i<optionsCount; i++) {

  const text = await  dropdown.locator("button").nth(i).textContent();
   if(text === " India") {
     
    await dropdown.locator("button").nth(i).click();
    break;
   }
 }

  //await page.pause()

  expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
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
