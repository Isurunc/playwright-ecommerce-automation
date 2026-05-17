const base = require("@playwright/test");

exports.customtest = base.test.extend(
 {
testDataForOrder : {
 username: "",
 password : "",
 productName: "ZARA COAT 3"
}

 })