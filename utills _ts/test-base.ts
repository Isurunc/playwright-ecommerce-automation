import {test as baseTest} from "@playwright/test";
interface testDataForOrder {
    username: string;
    password : string;
    productName: string;
};

export const customTest = baseTest.extend<{testDataForOrder:testDataForOrder}>(
 {
testDataForOrder : {
 username: "",
 password : "",
 productName: "ZARA COAT 3"
}

 })