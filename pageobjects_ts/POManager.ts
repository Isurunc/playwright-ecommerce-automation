import  {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage'
import {Page} from '@playwright/test';

export class POManager {

   loginPage: LoginPage;
   dashBoardPage: DashboardPage
   page: Page;

 constructor (page:Page) {

     this.page = page;
     this.loginPage = new LoginPage (page);
     this.dashBoardPage = new DashboardPage (page);
 }

 getLoginPage () {
    return this.loginPage;
 }

 getDashBoardPage () {
    return this.dashBoardPage;
 }


}