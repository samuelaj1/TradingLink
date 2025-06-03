import axios from "../axios/axios-kaqadmin";
import {useBearerTokenHeaders} from "@/utils/functions";

export const branchService = {
    getBranches,
    getBranchDetail,
    addBranch,
    addBranchLocation,
    deleteBranch,
    deleteBranchLocation
}

function getBranches() {
    return new Promise((resolve) => {
        axios.get('/admin/api/branches', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}
function getBranchDetail() {
    return new Promise((resolve) => {
        axios.get('/branch/api/branch/', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function addBranch(payload) {
    return new Promise((resolve) => {
        axios.post('/admin/api/branches',payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function addBranchLocation(payload,apiType = 'admin') {
    return new Promise((resolve) => {
        axios.post(`/${apiType}/api/branch/location`,payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function deleteBranch(id) {
    return new Promise((resolve) => {
        axios.delete(`/admin/api/branches/${id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function deleteBranchLocation(branchId, locationId, apiType='admin') {
    return new Promise((resolve) => {
        axios.delete(`/${apiType}/api/branch/${branchId}/location/${locationId}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}