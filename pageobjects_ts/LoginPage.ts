import {test, expect,Locator} from '@playwright/test';
import {Page} from '@playwright/test';

export class LoginPage {

    userName : Locator;
    password : Locator;
    signInbutton : Locator;
    page: Page;


    constructor(page: Page) {
        this.page = page; 
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInbutton = page.locator('#login');
    }


   async goTo () {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

   async validLogin (username, password) { 

  await this.userName.fill(username);
  await this.password.fill(password);
  await this.signInbutton.click();
  await this.page.waitForLoadState('networkidle');
    }


}