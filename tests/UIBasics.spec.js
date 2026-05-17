const { test, expect } = require('@playwright/test');

test('@web First test with browser context', async ({ browser }) => {
  

  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#userEmail');
  const signIn = page.locator ('#login');
  const cardTitles = page.locator(".card-body b");

  //two listners on network request and responses
  page.on('request', request=> console.log(request.url()));
  page.on ('response', response=> console.log(response.url(), response.status()));


  await page.goto("https://rahulshettyacademy.com/client/");
  console.log(await page.title());
  
 // await page.locator('#userEmail').fill("rahulshetty@gmail.com");
  await userName.fill("");
  await page.locator ('#userPassword').fill("");
  await signIn.click();
  await page.waitForLoadState('networkidle');
 // await  page.locator ([type='submit']).click();
 // console.log (await page.locator("[style*='block']").textContent());
 // await expect(page.locator("[style*='block']")).toContainText('Incorrect');
 
 // await userName.fill("");  //to clear text box
 // await userName.fill("rahulshettyacademy");
 // await signIn.click();
  console.log (await cardTitles.first().textContent());
  console.log (await cardTitles.nth(1).textContent());
 //const allTitles = await cardTitles.allTextContents();
// console.log(allTitles);


});

test('@web Second test with page', async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.title();
  await  expect(page).toHaveTitle("Google");
});

test('Select test with page', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*=documents-request]");
  
  const dropdown = page.locator("select.form-control");
  await page.locator(".radiotextsty").last.click();
  await expect (page.locator(".radiotextsty").last()).toBeChecked();
  await dropdown.selectOption("consultant");
  await page.locator("#okayBtn").click();
  await page.locator("#terms").click();
  await expect (page.locator("#terms")).toBeChecked();
  await page.locator(documentLink).toHaveAttribute("class", "blinkingText");
});

test('child windows handling', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#username');
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator("[href*=documents-request]");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator(userName).fill(domain);
  console.log (await page.locator(userName).textContent());
});
