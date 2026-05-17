import {test, expect,Locator} from '@playwright/test';
import {Page} from '@playwright/test';

export class DashboardPage {

  products : Locator;
  productsTexts : Locator
  cart : Locator;
  page: Page;


 constructor (page: Page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsTexts = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
 }

async searchProductAddCart (productName) {
  
  const titles = await this.productsTexts.allTextContents(); 
  console.log(titles);  

  const count = await this.products.count();
  for (let i = 0; i < count; i++) {
    if ((await this.products.nth(i).locator("b").textContent()) === productName) {
      // Add to cart
      await this.products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

 }

 async navigateToCart () {
  await this.cart.click();
 }


}