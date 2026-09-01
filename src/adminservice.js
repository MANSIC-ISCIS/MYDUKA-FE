import { apiRequest } from "./api";


// Add a clerk
export function addClerk(clerkData) {

    return apiRequest("/clerks", {

        method: "POST",

        body: JSON.stringify(clerkData)

    });

}


// Get all clerks
export function getClerks() {

    return apiRequest("/clerks");

}

// Edit clerk
export const updateClerk = (clerkId, clerkData) => {
    return apiRequest(`/clerks/${clerkId}`, {
        method: "PUT",
        body: JSON.stringify(clerkData)
    });
};

// Deactivate clerk
export const deactivateClerk = (clerkId) => {
    return apiRequest(`/clerks/${clerkId}/deactivate`, {
        method: "PUT"
    });
};

// Delete clerk
export const deleteClerk = (clerkId) => {
    return apiRequest(`/clerks/${clerkId}`, {
        method: "DELETE"
    });
};

// Get all supply requests
export const getSupplyRequests = () => {
    return apiRequest("/supply-requests");
};

// Approve supply request
export function approveRequest(id) {

    return apiRequest(`/supply-request/${id}`, {

        method: "PUT"

    });

}


// Decline supply request
export function declineRequest(id) {

    return apiRequest(`/supply-request/${id}/decline`, {

        method: "PUT"

    });

}


// View payments
export function getPayments() {

    return apiRequest("/payments");

}


// Change payment status
export function markAsPaid(id) {

    return apiRequest(`/payments/${id}`, {

        method: "PUT"

    });

}