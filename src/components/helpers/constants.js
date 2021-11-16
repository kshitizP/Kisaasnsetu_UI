const ENDPOINT = '/api';
const Constants = {
    emailRegex: '^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+(\-)?[a-zA-Z0-9]+(\.)?[a-zA-Z0-9]{2,6}?\.[a-zA-Z]{2,6}$',
    mobileRegex: '^[6-9]{1}[0-9]{9}|[0-9]{3}-[0-9]{2}-[0-9]{3}$',
    nameRegex: '^[A-Za-z]{3,}',
    SERVER_ENDPOINT: ENDPOINT,
    LOGIN_ENDPOINT: ENDPOINT + '/accounts/login/',
    REFRESH_ENDPOINT: ENDPOINT + '/accounts/refresh_token/',
    REGISTER_ENDPOINT: ENDPOINT + '/accounts/register/',
    PRODUCTS_BY_CATEGORY_ENDPOINT: ENDPOINT + '/productsdata/get_products_by_category/',
    CATEGORY_LIST_ENDPOINT: ENDPOINT + '/productsdata/get_categories/',
    PRODUCT_ENDPOINT: ENDPOINT + '/productsdata/get_product/',
    CART_UPDATE_ENDPOINT: ENDPOINT + '/orders/cart_update/',
    SEARCH_ENDPOINT: ENDPOINT + '/productsdata/search/',
    SEND_MSG_ENDPOINT: ENDPOINT + '/anonymous/save_message/',
    ADDRESS_UPDATE_ENDPOINT : ENDPOINT + '/orders/address_update/',
    ORDER_LIST_ENDPOINT : ENDPOINT + '/orders/orders_list/',
    ADDRESS_LIST_ENDPOINT : ENDPOINT + '/orders/address_update/',
    SHIPPING_TOTAL_ENDPOINT : ENDPOINT + '/orders/shipping_total/',
    PLACE_ORDER_ENDPOINT : ENDPOINT + '/orders/place_order/',
    GET_SELL_PRODUCTS_ENDPOINT : ENDPOINT + '/orders/get_sell_products/',
    PLACE_SELL_ORDER_ENDPOINT : ENDPOINT + '/orders/place_sell_order/',
    LOGOUT_USER_ENDPOINT : ENDPOINT + '/accounts/logout_user/',
    ACCESS_TOKEN_TIMEOUT: new Date(new Date().getTime() + 30 * 60 * 1000),
    CALCULATE_EXPIRY_TIME: (input) => { return new Date(new Date().getTime() + parseInt(input) * 60 * 1000) },
    LOGIN_AGAIN_MSG: "Session has Expired. Please Login Again!",
    DEFAULT_NOTYF_CONFIG: { duration: 2000, position: { x: 'right', y: 'top', } },
    FIXED_ERROR_MSG: "ERROR",
    DEFAULT_ERROR_MSG: "Some Error has Occured While retrieving Data from Server!",
    RUPEE_SYMBOL: "₹",
    DESELECT_ITEMS_TXT: "Deselect all items",
    SELECT_ITEMS_TXT: "Select all items",
    SHOPPING_CART_TXT: "Shopping Cart:",
    TOTAL_CART_TXT: "Total",
    ADDED_TO_CART_MSG: "Added to Cart",
    SHOPPING_CART_EMPTY_TXT: "Shopping Cart is Empty!",
    CART_TOTAL_TXT: "Subtotal",
    CART_NO_SELECTED_TXT: "No Items Selected:",
    SELECT_ADDRESS_TXT: "Select a Delivery Address",
    NO_EXISTING_ADDRESS_TXT: "No Existing Address",
    DELIVER_TO_BTN_TXT : "Deliver to this address",
    LIST_OF_STATES : [
        {
            name: "Andhra Pradesh",
            value: "Andhra Pradesh"
        },
        {
            name: "Arunachal Pradesh",
            value: "Arunachal Pradesh"
        },
        {
            name: "Assam",
            value: "Assam"
        },
        {
            name: "Bihar",
            value: "Bihar"
        },
        {
            name: "Chattisgarh",
            value: "Chattisgarh"
        },
        {
            name: "Goa",
            value: "Goa"
        },
        {
            name: "Haryana",
            value: "Haryana"
        },
        {
            name: "Himachal Pradesh",
            value: "Himachal Pradesh"
        },
        {
            name: "Jharkhand",
            value: "Jharkhand"
        },
        {
            name: "Karnataka",
            value: "Karnataka"
        },
        {
            name: "Kerala",
            value: "Kerala"
        },
        {
            name: "Madhya Pradesh",
            value: "Madhya Pradesh"
        },
        {
            name: "Maharashtra",
            value: "Maharashtra"
        },
        {
            name: "Manipur",
            value: "Manipur"
        },
        {
            name: "Meghalaya",
            value: "Meghalaya"
        },
        {
            name: "Mizoram",
            value: "Nagaland"
        },
        {
            name: "Odisha",
            value: "Odisha"
        },
        {
            name: "Punjab",
            value: "Punjab"
        },
        {
            name: "Rajasthan",
            value: "Rajasthan"
        },
        {
            name: "Sikkim",
            value: "Sikkim"
        },
        {
            name: "Tamil Nadu",
            value: "Tamil Nadu"
        },
        {
            name: "Telangana",
            value: "Telangana"
        },
        {
            name: "Tripura",
            value: "Tripura"
        },
        {
            name: "Uttar Pradesh",
            value: "Uttar Pradesh"
        },
        {
            name: "Uttarakhand",
            value: "Uttarakhand"
        },
        {
            name: "West Bengal",
            value: "West Bengal"
        }
    ]
}

export default Constants;