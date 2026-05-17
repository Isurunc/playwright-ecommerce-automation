const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });
//test.describe.configure({ mode: 'serial' }); //if depedency test fails, next test will not run
test('Popup validation', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect (page.locator('#displayed-text')).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect (page.locator('#displayed-text')).toBeHidden();
    //accept popup
     page.on ('dialog', dialog => dialog.accept()); 
     await page.locator('#confirmbtn').click();
     //hover over
     await page.locator('#mousehover').hover();
     //handle iframe
    const framesPage = page.frameLocator("#courses-iframe");
    framesPage.locator("li a[href*='lifetime-access']:visible").click(); //focus only on visible element
     const textCheck = await framesPage.locator(".text h2").textContent();
     console.log(textCheck.split(" ")[1]);
})

 test('Screenshot test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect (page.locator('#displayed-text')).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialscreenshot.png'}); //element level screenshot
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'}); //page level screenshot
    await expect (page.locator('#displayed-text')).toBeHidden();

 })


 test('visual test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot('homepage.png'); //first time this will fail

 })