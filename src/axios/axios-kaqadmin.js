import axios from 'axios';
import {getBackEndUrl} from "@/utils/functions";

const instance = axios.create({
    baseURL: getBackEndUrl()
})

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if(error.response){
        if(error.response.status === 401){
            localStorage.clear();
            window.location.href="login";
        }
    }
    return Promise.reject(error);

});

export default instance;