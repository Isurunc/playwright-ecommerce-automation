const {DashboardPage} = require ('./DashBoardPage');
const {LoginPage} = require ('./LoginPage');


export class POManager {

 constructor (page) {

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