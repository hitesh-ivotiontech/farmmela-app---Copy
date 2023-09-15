

const initialState = { fetching: false, success: false, error: false };

import {
    OTPVERIFICATION,
    OTPVERIFICATIONSUCCESS,
    OTPVERIFICATIONFAILED,

    RESENDOTP,
    RESENDOTPSUCCESS,
    RESENDOTPFAILED,

    REGISTERUSER,
    REGISTERUSERSUCCESS,
    REGISTERUSERFAILED,

    LOGINWITHOTP,
    LOGINWITHOTPSUCCESS,
    LOGINWITHOTPFAILED,

    OTPVERIFICATIONREGISTER,
    OTPVERIFICATIONREGISTERSUCCESS,
    OTPVERIFICATIONREGISTERFAILED,

    UPDATEPROFILEDATA,
    UPDATEPROFILEDATASUCCESS,
    UPDATEPROFILEDATAFAILED,

    GET_COUNTRY_LIST,
    GET_COUNTRY_LIST_SUCCESS,
    GET_COUNTRY_LIST_FAILED


} from '../actions/loginActions'


export function OTP_Verification(state = initialState, action) {
    switch (action.type) {
        case OTPVERIFICATION: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case OTPVERIFICATIONSUCCESS: {
            //  console.log(action.payload)
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case OTPVERIFICATIONFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}



export function ResendOtp(state = initialState, action) {
    switch (action.type) {
        case RESENDOTP: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case RESENDOTPSUCCESS: {
            //  console.log(action.payload)
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case RESENDOTPFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}



export function RegisterUser(state = initialState, action) {
    switch (action.type) {
        case REGISTERUSER: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case REGISTERUSERSUCCESS: {
            //  console.log(action.payload)
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case REGISTERUSERFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}


export function LoginWithOtp(state = initialState, action) {
    switch (action.type) {
        case LOGINWITHOTP: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case LOGINWITHOTPSUCCESS: {
            //  console.log(action.payload)
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case LOGINWITHOTPFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}



export function OTP_VerificationRegister(state = initialState, action) {
    switch (action.type) {
        case OTPVERIFICATIONREGISTER: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case OTPVERIFICATIONREGISTERSUCCESS: {
            //  console.log(action.payload)
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case OTPVERIFICATIONREGISTERFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}



export function UpdateProfileData(state = initialState, action) {
    switch (action.type) {
        case UPDATEPROFILEDATA: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case UPDATEPROFILEDATASUCCESS: {
            //  console.log(action.payload)
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case UPDATEPROFILEDATAFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}


export function GetCountryList(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRY_LIST: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_COUNTRY_LIST_SUCCESS: {
            //  console.log(action.payload)
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_COUNTRY_LIST_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }
    }
}