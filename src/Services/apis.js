const BASE_URL = "http://localhost:5000/api/v1";

export const productEndpoints = {
    FETCH_ALL_PRODUCTS : BASE_URL + '/products/getAllProducts',
    FETCH_FILTERED_PRODUCTS : BASE_URL + '/products/fetchFilteredProducts',
    FETCH_PRICED_PRODUCTS : BASE_URL + '/products/fetchPricedProducts',
}

export const userEndPoints = {
    LOGIN_API : BASE_URL + "/users/login",
    SIGNUP_API : BASE_URL + "/users/signup",
    SIGNOUT_API : BASE_URL + "/users/signout",
    VERIFY_USER : BASE_URL + "/users/verifyUser",
}

export const paymentEndPoints = {
    INITIATE_PAYMENT : BASE_URL + "/payment/initiatePayment",
    VERIFY_PAYMENT : BASE_URL + "/payment/verifyPayment",
}
