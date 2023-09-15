

const initialState = { fetching: false, success: false, error: false };

import {
    POSTNEWADVERTISEMENT,
    POSTNEWADVERTISEMENT_SUCCESS,
    POSTNEWADVERTISEMENT_FAILED,
    GETADVERTISEMENT,
    GETADVERTISEMENT_SUCCESS,
    GETADVERTISEMENT_FAILED,
    GETMYADVERTISEMENT,
    GETMYADVERTISEMENT_SUCCESS,
    GETMYADVERTISEMENT_FAILED,
    EDIT_ADVERTISEMENT,
    EDIT_ADVERTISEMENT_SUCCESS,
    EDIT_ADVERTISEMENT_FAILED,
    DELETE_ADVERTISEMENT,
    DELETE_ADVERTISEMENT_SUCCESS,
    DELETE_ADVERTISEMENT_FAILED,
} from '../actions/buysellrentActions'



export function PostNewAdvertisement(state = initialState, action) {
    switch (action.type) {
        case POSTNEWADVERTISEMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case POSTNEWADVERTISEMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case POSTNEWADVERTISEMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function GetAdvertisement(state = initialState, action) {
    switch (action.type) {
        case GETADVERTISEMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GETADVERTISEMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GETADVERTISEMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function GetMyAdvertisement(state = initialState, action) {
    switch (action.type) {
        case GETMYADVERTISEMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GETMYADVERTISEMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GETMYADVERTISEMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}




export function EditAdvertisement(state = initialState, action) {
    switch (action.type) {
        case EDIT_ADVERTISEMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case EDIT_ADVERTISEMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case EDIT_ADVERTISEMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function DeleteAdvertisement(state = initialState, action) {
    switch (action.type) {
        case DELETE_ADVERTISEMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case DELETE_ADVERTISEMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case DELETE_ADVERTISEMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}