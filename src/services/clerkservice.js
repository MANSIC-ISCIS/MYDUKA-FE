import { apiRequest } from "./api";


// Record new stock
export function addStock(stockData) {

    return apiRequest("/clerk/stock", {

        method: "POST",

        body: JSON.stringify(stockData)

    });

}


// View stock
export function getStock() {

    return apiRequest("/clerk/stock");

}


// Request more products
export function requestSupply(requestData) {

    return apiRequest("/clerk/supply-request", {

        method: "POST",

        body: JSON.stringify(requestData)

    });

}


// View my records
export function getMyRecords() {

    return apiRequest("/clerk/records");

}