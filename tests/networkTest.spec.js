const { test, request } = require("@playwright/test");
const { APIutills } = require("../utills/APIutills.js");

const fakePayLoadOrders = {message:"No Product in Cart"}

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

//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });

  // Navigate to orders
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 


  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  
});