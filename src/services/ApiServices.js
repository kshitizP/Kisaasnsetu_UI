
import axios from 'axios';
import Cookies from 'js-cookie';
import Constants from '../components/helpers/constants';

const httpClient = axios.create()
httpClient.interceptors.request.use((config) => {
    /** In dev, intercepts request and logs it into console for dev */
    if (true) { console.info("✉️ ", config); }
    return config;
}, (error) => {
    if (true) { console.error("✉️ ", error); }
    return Promise.reject(error);
});
httpClient.defaults.timeout = 5000;
httpClient.defaults.withCredentials = true;
httpClient.defaults.xsrfCookieName = 'csrftoken'
httpClient.defaults.xsrfHeaderName = 'X-CSRFToken'
export const refreshToken = async () => {
        const access_token = Cookies.get('access_token')
        if(access_token){
            return {Authorization: `Token ${access_token}`}
        } else {
            return await httpClient.post(Constants.REFRESH_ENDPOINT)
            .then( (response) => {
                Cookies.set('access_token',response.access_token,{path:'/', expires: Constants.ACCESS_TOKEN_TIMEOUT});
                return {Authorization: `Token ${response.access_token}`};
            })
            .catch( (error) => {
                return undefined;
            })
        }
}

export const post = async (data, url) => {
    return await refreshToken()
    .then ( (response) => {
        if(response === undefined){
            window.location.href=`/login?ref=${window.location.pathname}`;
            return {data: Constants.FIXED_ERROR_MSG, status: 400}
        }
        let config = {headers: {...response}};
        return httpClient.post(url, data, config)
        .then( (response) => {
            return {data: response.data}
        })
        .catch ((error) => {
            return {data: Constants.FIXED_ERROR_MSG}
        //     if(error.response){
        //         return {data: Constants.FIXED_ERROR_MSG}
        //     } else if (error.request){
        //         console.log(error.request)
        //     } else {
        //         console.log(error.message)
        //     }
        // })
    })
})
}

export const get = async (data, url) => {
    // Cookies.remove('cust_type');
    return await httpClient.get(url,{params: data})
    .then( (response) => {
        return {data: response.data}
    })
    .catch ((error) => {
        return {data: Constants.FIXED_ERROR_MSG}
    })
}

export const loginUser = async (data, url) => {
    return await httpClient.post(url,data)
    .then((response) => {
        const userdata = response.data.user;
        Cookies.set('userinfo',JSON.stringify(userdata),{path:'/',expires:Constants.CALCULATE_EXPIRY_TIME(50000)});
        Cookies.set('access_token', String(response.data.access_token),{path:'/', expires:Constants.ACCESS_TOKEN_TIMEOUT});
        return {data: response.data};
    })
    .catch( (error) => {
        return {data: Constants.FIXED_ERROR_MSG}
    })
}

export const logoutUser = async (url) => {
    return await httpClient.post(url, {})
    .then( (response) => {

    })
    .catch( (error) => {

    })
}

export const submitMessage = async (data) => {
    return httpClient.post(Constants.SEND_MSG_ENDPOINT, data)
    .then( (response) => {
        return {data: "OK", message: response.data}
    })
    .catch ((error) => {
        if(error.response){
            return {data: Constants.FIXED_ERROR_MSG, message: error.response.data}
        }
    })
}