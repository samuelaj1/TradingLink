import {productsService} from "@/apis/products.service";

const state = {
    products: [],
    uploadedData: null
}

const getters = {
    'GET_PROVIDERS' (state) {
        return state.providers;
    },
    'GET_UPLOADED_DATA' (state) {
        return state.uploadedData;
    },
}
const mutations = {
    'SET_PROVIDERS' (state, data) {
        return state.providers = data;
    },
    'ADD_PROVIDER' (state, provider) {
        state.providers.push(provider)
    },
    'REMOVE_PROVIDER' (state, id) {
        const index = state.providers.findIndex(e => e.id === id);
        state.providers.splice(index, 1);
    },
    'SET_UPLOADED_DATA' (state, data) {
        console.log(data)
        return state.uploadedData = data;
    },
}

const actions = {
    addProduct({commit, dispatch}, formData) {
        return new Promise((resolve) => {
            dispatch('showLoader')
            productsService.addProduct(formData).then(data => {
                dispatch('hideLoader')
                if(!data.status){
                    dispatch('error', {message:data.message, showSwal: true})
                    resolve({status: false});
                    return;
                }
                dispatch('success', {message: 'Product added successfully.', showSwal: true});
                resolve({status: true, data: data.extra})
            })
        });
    },

    //admin product functions
    addStock({commit, dispatch}, formData) {
        return new Promise((resolve) => {
            dispatch('showLoader')
            productsService.addStock(formData).then(data => {
                dispatch('hideLoader')
                if(!data.status){
                    dispatch('error', {message:data.message, showSwal: true})
                    resolve({status: false});
                    return;
                }
                dispatch('success', {message: data.message, showSwal: true});
                resolve({status: true, data: data.extra})
            })
        });
    },

    addStockByBranch({commit, dispatch}, formData) {
        return new Promise((resolve) => {
            dispatch('showLoader')
            productsService.addStockByBranch(formData).then(data => {
                dispatch('hideLoader')
                if(!data.status){
                    dispatch('error', {message:data.message, showSwal: true})
                    resolve({status: false});
                    return;
                }
                dispatch('success', {message: data.message, showSwal: true});
                resolve({status: true, data: data.extra})
            })
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}