const { test, expect, request } = require("@playwright/test");
const { APIutills } = require("../utills/APIutills.js");

const loginPayload = {
  userEmail: "",
  userPassword: "",
};

const orderPayload = {
  orders: [
    {
      country: "Bahrain",
      productOrderedId: "67a8dde5c0d3e6622a297cc8",
    },
  ],
};

let response;


test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtills = new APIutills(apiContext, loginPayload);
  response = await apiUtills.createOrder(orderPayload);
});

test("Shopping Cart Test", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  // Navigate to orders
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});