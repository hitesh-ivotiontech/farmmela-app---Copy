import serverData from '../api/ServerData'

export const POSTNEWADVERTISEMENT = 'POSTNEWADVERTISEMENT';
export const POSTNEWADVERTISEMENT_SUCCESS = 'POSTNEWADVERTISEMENT_SUCCESS';
export const POSTNEWADVERTISEMENT_FAILED = 'POSTNEWADVERTISEMENT_FAILED';

export const GETADVERTISEMENT = 'GETADVERTISEMENT';
export const GETADVERTISEMENT_SUCCESS = 'GETADVERTISEMENT_SUCCESS';
export const GETADVERTISEMENT_FAILED = 'GETADVERTISEMENT_FAILED';

export const GETMYADVERTISEMENT = 'GETMYADVERTISEMENT';
export const GETMYADVERTISEMENT_SUCCESS = 'GETMYADVERTISEMENT_SUCCESS';
export const GETMYADVERTISEMENT_FAILED = 'GETMYADVERTISEMENT_FAILED';

export const EDIT_ADVERTISEMENT = 'EDIT_ADVERTISEMENT';
export const EDIT_ADVERTISEMENT_SUCCESS = 'EDIT_ADVERTISEMENT_SUCCESS';
export const EDIT_ADVERTISEMENT_FAILED = 'EDIT_ADVERTISEMENT_FAILED';

export const DELETE_ADVERTISEMENT = 'DELETE_ADVERTISEMENT';
export const DELETE_ADVERTISEMENT_SUCCESS = 'DELETE_ADVERTISEMENT_SUCCESS';
export const DELETE_ADVERTISEMENT_FAILED = 'DELETE_ADVERTISEMENT_FAILED';

export function PostNewAdvertisement(action) {
    return async dispatch => {
        dispatch({
            type: POSTNEWADVERTISEMENT,
            payload: {},
        });
        await serverData.PostNewAdvertisement(
            action,
            data => {
                dispatch({
                    type: POSTNEWADVERTISEMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: POSTNEWADVERTISEMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function GetAdvertisement(action) {
    return async dispatch => {
        dispatch({
            type: GETADVERTISEMENT,
            payload: {},
        });
        await serverData.GetAdvertisement(
            action,
            data => {
                dispatch({
                    type: GETADVERTISEMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GETADVERTISEMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function GetMyAdvertisement(action) {
    return async dispatch => {
        dispatch({
            type: GETMYADVERTISEMENT,
            payload: {},
        });
        await serverData.GetMyAdvertisement(
            action,
            data => {
                dispatch({
                    type: GETMYADVERTISEMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GETMYADVERTISEMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function EditAdvertisement(action) {
    return async dispatch => {
        dispatch({
            type: EDIT_ADVERTISEMENT,
            payload: {},
        });
        await serverData.EditAdvertisement(
            action,
            data => {
                dispatch({
                    type: EDIT_ADVERTISEMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: EDIT_ADVERTISEMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function DeleteAdvertisement(action) {
    return async dispatch => {
        dispatch({
            type: DELETE_ADVERTISEMENT,
            payload: {},
        });
        await serverData.DeleteAdvertisement(
            action,
            data => {
                dispatch({
                    type: DELETE_ADVERTISEMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: DELETE_ADVERTISEMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}