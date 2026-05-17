const { test, expect } = require("@playwright/test");
const {customtest} = require('../utills/test-base');

const { POManager } = require("../pageobjects/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("../utills/placeOrderTestData.json"))
);

test("Shopping Cart Test", async ({ page }) => {
  const poManager = new POManager(page);
  const products = page.locator(".card-body");

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(dataSet.username, dataSet.password);
  const dashBoardPage = poManager.getDashBoardPage();
  await dashBoardPage.searchProductAddCart(dataSet.productName);
  await dashBoardPage.navigateToCart();

  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=checkout").click();
  await page.waitForLoadState("networkidle");
  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  //await page.pause()

  expect(page.locator(".user__name [type='text']").first()).toHaveText(
    dataSet.username
  );
  await page.locator(".action__submit").click();
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  //navigate to oders
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});


customtest("Shopping Cart TestTwo", async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  const products = page.locator(".card-body");

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  const dashBoardPage = poManager.getDashBoardPage();
  await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
  await dashBoardPage.navigateToCart();


});