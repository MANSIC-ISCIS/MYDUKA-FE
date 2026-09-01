import { apiRequest } from "./api";


// Invite a new admin
export function inviteAdmin(email) {

    return apiRequest("/merchant/invite-admin", {

        method: "POST",

        body: JSON.stringify({ email })

    });

}


// Get all stores
export async function getStores() {
  return await apiRequest("/stores/stores", {
    method: "GET",
  });
}


// Add a store
export const addStore = (storeData) => {
    return apiRequest("/stores/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(storeData)
    });
};



// Edit a store
export const updateStore = (storeId, storeData) => {
    return apiRequest(`/stores/stores/${storeId}`, {
        method: "PUT",
        body: JSON.stringify(storeData)
    });
};



// Delete a store
export const deleteStore = (storeId) => {
    return apiRequest(`/stores/stores/${storeId}`, {
        method: "DELETE"
    });
};


// Get all admins
export function getAdmins() {

    return apiRequest("/merchant/admins");

}


// Deactivate an admin
export function deactivateAdmin(id) {

    return apiRequest(`/merchant/admins/${id}`, {

        method: "PUT"

    });

}


// Delete an admin
export function deleteAdmin(id) {

    return apiRequest(`/merchant/admins/${id}`, {

        method: "DELETE"

    });

}


// Merchant reports
export function getMerchantReports() {

    return apiRequest("/merchant/reports");

}