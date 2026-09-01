import { apiRequest } from "./api";

// Login
export function login(email, password) {

    return apiRequest("/auth/login", {

        method: "POST",

        body: JSON.stringify({
            email,
            password
        })

    });

}


// Merchant Registration
export function registerMerchant(userData) {

    return apiRequest("/auth/register-merchant", {

        method: "POST",

        body: JSON.stringify(userData)

    });

}


// Admin Registration (with access code)
export function registerAdmin(userData) {

    return apiRequest("/auth/register-admin", {

        method: "POST",

        body: JSON.stringify(userData)

    });

}


// Clerk Registration (with access code)
export function registerClerk(userData) {

    return apiRequest("/clerks", {

        method: "POST",

        body: JSON.stringify(userData)

    });

}

// Logout
export function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

}