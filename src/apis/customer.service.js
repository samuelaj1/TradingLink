import axios from "../axios/axios-kaqadmin";
import {useBearerTokenHeaders} from "@/utils/functions";

export const customerService = {
    getShops,
    getVendorsByStatus,
    updateAccountStatus,
    getDeliveryStats,
    getPendingStats,
    getRevenueStats,
    getProductStats,
    getWeeklyOrderStats,
    fetchPendingOrders
}

function getWeeklyOrderStats() {
    return new Promise((resolve) => {
        axios.get('/customer/api/orders/weekly-order-sales', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getProductStats() {
    return new Promise((resolve) => {
        axios.get('/customer/api/orders/product-stats', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}
function getRevenueStats() {
    return new Promise((resolve) => {
        axios.get('/customer/api/orders/revenue-stats', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getDeliveryStats() {
    return new Promise((resolve) => {
        axios.get('/customer/api/orders/delivery-stats', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getPendingStats() {
    return new Promise((resolve) => {
        axios.get('/customer/api/orders/pending-stats', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchPendingOrders() {
    return new Promise((resolve) => {
        axios.get('/admin/api/pending-orders-stats', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getShops() {
    return new Promise((resolve) => {
        axios.get('/admin/api/shops', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getVendorsByStatus(status) {
    return new Promise((resolve) => {
        const url = `/admin/api/vendors/status?status=${status}`
        axios.get(url, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function updateAccountStatus(payload) {
    return new Promise((resolve) => {
        axios.post('/admin/api/vendor/activate',payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}