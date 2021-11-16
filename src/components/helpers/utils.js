import { Notyf } from 'notyf';
import Constants from './constants';
import Dictionary from './dictionary';
import Cookies from 'js-cookie';
export const get_state_from_response = (userinfo) =>{
    if(userinfo !== undefined && userinfo.name !== undefined){
        return { 
            isAuthenticated: true,
            name: userinfo.name ? userinfo.name: Dictionary.NOT_AVAILABLE,
            phone: userinfo.phone ? userinfo.phone: Dictionary.NOT_AVAILABLE,
            email: userinfo.email ? userinfo.email: Dictionary.NOT_AVAILABLE,
            profile: userinfo.user_type ? userinfo.user_type === "C" ? Dictionary.CUSTOMER_USER : Dictionary.FARMER_USER: Dictionary.NOT_AVAILABLE
        }
    } else {
        return { 
            isAuthenticated: false,
            name: undefined,
            phone: undefined,
            email: undefined,
            profile: undefined
        }
    }
}

export const parseQuery =(queryStr, key) => {
    let inputs = queryStr.replace("?","").split("&");
    let returnVal = {};
    inputs.forEach(element => {
            returnVal[String(element.split("=")[0])] = String(element.split("=")[1])
    });
    return returnVal;
}
export const notyf = new Notyf(Constants.DEFAULT_NOTYF_CONFIG)
export const create_notification = (type, msg) => {
    switch(type){
        case 'ERROR': return notyf.error(String(msg))
        case 'SUCCESS': return notyf.success(String(msg))
        default: return
    }
}

export const format_cart_data = (data) => {
    let cart = {}
    if(data) {
        for (const cartitem of data) {
            cartitem['selected'] = true
            cart["cart"+String(cartitem.cart_id)] = cartitem
        }
    }
    return cart;
}

export const getCustomerType = () => {
    if(Cookies.getJSON('userinfo')){
        return Cookies.getJSON('userinfo')['user_type'];
    } else if(Cookies.get('cust_type')) {
        return String(Cookies.get('cust_type'));
    }
    return undefined;
}

export const setCustomerType = (value) => {
    Cookies.set('cust_type', value, {path:'/', expires: Constants.CALCULATE_EXPIRY_TIME(50000)});
}

export const getAllSelectedCarts = (cartState) => {
    let cart = []
    const cart_data = cartState.cartitems
    for(const item in cart_data) {
        if(cart_data[item].selected)
            cart.push(cart_data[item])
    }
    return cart;
}

export const dismissibleNotyf = new Notyf({ duration: 0, dismissible:true, position: { x: 'center', y: 'top', } });
export const getOneLineAddress = (address) => {
    return [String(address.contact_name),String(address.address_line1) + ", " + String(address.address_line2) + ", " + String(address.city) + ", " + String(address.state), String(address.contact_num)]
}