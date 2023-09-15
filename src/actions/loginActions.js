import serverData from '../api/ServerData'

export const OTPVERIFICATION = 'OTPVERIFICATION';
export const OTPVERIFICATIONSUCCESS = 'OTPVERIFICATIONSUCCESS';
export const OTPVERIFICATIONFAILED = 'OTPVERIFICATIONFAILED';

export const RESENDOTP = 'RESENDOTP';
export const RESENDOTPSUCCESS = 'RESENDOTPSUCCESS';
export const RESENDOTPFAILED = 'RESENDOTPFAILED';

export const REGISTERUSER = 'REGISTERUSER';
export const REGISTERUSERSUCCESS = 'REGISTERUSERSUCCESS';
export const REGISTERUSERFAILED = 'REGISTERUSERFAILED';

export const LOGINWITHOTP = 'LOGINWITHOTP';
export const LOGINWITHOTPSUCCESS = 'LOGINWITHOTPSUCCESS';
export const LOGINWITHOTPFAILED = 'LOGINWITHOTPFAILED';

export const OTPVERIFICATIONREGISTER = 'OTPVERIFICATIONREGISTER';
export const OTPVERIFICATIONREGISTERSUCCESS = 'OTPVERIFICATIONREGISTERSUCCESS';
export const OTPVERIFICATIONREGISTERFAILED = 'OTPVERIFICATIONREGISTERFAILED';

export const UPDATEPROFILEDATA = 'UPDATEPROFILEDATA';
export const UPDATEPROFILEDATASUCCESS = 'UPDATEPROFILEDATASUCCESS';
export const UPDATEPROFILEDATAFAILED = 'UPDATEPROFILEDATAFAILED';

export const GET_COUNTRY_LIST = 'GET_COUNTRY_LIST';
export const GET_COUNTRY_LIST_SUCCESS = 'GET_COUNTRY_LIST_SUCCESS';
export const GET_COUNTRY_LIST_FAILED = 'GET_COUNTRY_LIST_FAILED';


export function OTP_Verification(action) {
    return async dispatch => {
        dispatch({
            type: OTPVERIFICATION,
            payload: {},
        });
        await serverData.OTP_Verification(
            action,
            data => {
                dispatch({
                    type: OTPVERIFICATIONSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: OTPVERIFICATIONFAILED,
                    payload: error,
                });
            },
        );
    };
}




export function ResendOtp(action) {
    return async dispatch => {
        dispatch({
            type: RESENDOTP,
            payload: {},
        });
        await serverData.ResendOtp(
            action,
            data => {
                dispatch({
                    type: RESENDOTPSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: RESENDOTPFAILED,
                    payload: error,
                });
            },
        );
    };
}


export function RegisterUser(action) {
    return async dispatch => {
        dispatch({
            type: REGISTERUSER,
            payload: {},
        });
        await serverData.RegisterUser(
            action,
            data => {
                dispatch({
                    type: REGISTERUSERSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: REGISTERUSERFAILED,
                    payload: error,
                });
            },
        );
    };
}


export function LoginWithOtp(action) {
    return async dispatch => {
        dispatch({
            type: LOGINWITHOTP,
            payload: {},
        });
        await serverData.LoginWithOtp(
            action,
            data => {
                dispatch({
                    type: LOGINWITHOTPSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: LOGINWITHOTPFAILED,
                    payload: error,
                });
            },
        );
    };
}

export function OTP_VerificationRegister(action) {
    return async dispatch => {
        dispatch({
            type: OTPVERIFICATIONREGISTER,
            payload: {},
        });
        await serverData.OTP_Verification(
            action,
            data => {
                dispatch({
                    type: OTPVERIFICATIONREGISTERSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: OTPVERIFICATIONREGISTERFAILED,
                    payload: error,
                });
            },
        );
    };
}


export function UpdateProfileData(action) {

    return async dispatch => {
        dispatch({
            type: UPDATEPROFILEDATA,
            payload: {},
        });
        await serverData.UpdateProfileData(
            action,
            data => {
                dispatch({
                    type: UPDATEPROFILEDATASUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: UPDATEPROFILEDATAFAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetCountryList(action) {
    return async dispatch => {
        dispatch({
            type: GET_COUNTRY_LIST,
            payload: {},
        });
        await serverData.GetCountryList(
            action,
            data => {
                dispatch({
                    type: GET_COUNTRY_LIST_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_COUNTRY_LIST_FAILED,
                    payload: error,
                });
            },
        );
    };
}


