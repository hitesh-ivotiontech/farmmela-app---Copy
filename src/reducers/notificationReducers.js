





const initialState = { fetching: false, success: false, error: false };

import {
    GETNOTIFICATIONS,
    GETNOTIFICATIONS_SUCCESS,
    GETNOTIFICATIONS_FAILED,
    DELETENOTIFICATIONS,
    DELETENOTIFICATIONS_SUCCESS,
    DELETENOTIFICATIONS_FAILED,
    UPDATE_READ_NOTIFICATIONS,
    UPDATE_READ_NOTIFICATIONS_SUCCESS,
    UPDATE_READ_NOTIFICATIONS_FAILED
} from '../actions/notificationActions'



export function GetNotifications(state = initialState, action) {
    switch (action.type) {
        case GETNOTIFICATIONS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GETNOTIFICATIONS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GETNOTIFICATIONS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function DeleteNotifications(state = initialState, action) {
    switch (action.type) {
        case DELETENOTIFICATIONS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case DELETENOTIFICATIONS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case DELETENOTIFICATIONS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function UpdateReadNotifications(state = initialState, action) {
    switch (action.type) {
        case UPDATE_READ_NOTIFICATIONS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case UPDATE_READ_NOTIFICATIONS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case UPDATE_READ_NOTIFICATIONS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

