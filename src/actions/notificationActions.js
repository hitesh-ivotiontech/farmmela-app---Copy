import serverData from '../api/ServerData'

export const GETNOTIFICATIONS = 'GETNOTIFICATIONS';
export const GETNOTIFICATIONS_SUCCESS = 'GETNOTIFICATIONS_SUCCESS';
export const GETNOTIFICATIONS_FAILED = 'GETNOTIFICATIONS_FAILED';

export const DELETENOTIFICATIONS = 'DELETENOTIFICATIONS';
export const DELETENOTIFICATIONS_SUCCESS = 'DELETENOTIFICATIONS_SUCCESS';
export const DELETENOTIFICATIONS_FAILED = 'DELETENOTIFICATIONS_FAILED';

export const UPDATE_READ_NOTIFICATIONS = 'UPDATE_READ_NOTIFICATIONS';
export const UPDATE_READ_NOTIFICATIONS_SUCCESS = 'UPDATE_READ_NOTIFICATIONS_SUCCESS';
export const UPDATE_READ_NOTIFICATIONS_FAILED = 'UPDATE_READ_NOTIFICATIONS_FAILED';

export function GetNotifications(action) {
    return async dispatch => {
        dispatch({
            type: GETNOTIFICATIONS,
            payload: {},
        });
        await serverData.GetNotifications(
            action,
            data => {
                dispatch({
                    type: GETNOTIFICATIONS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GETNOTIFICATIONS_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function DeleteNotifications(action) {
    return async dispatch => {
        dispatch({
            type: DELETENOTIFICATIONS,
            payload: {},
        });
        await serverData.DeleteNotifications(
            action,
            data => {
                dispatch({
                    type: DELETENOTIFICATIONS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: DELETENOTIFICATIONS_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function UpdateReadNotifications(action) {
    return async dispatch => {
        dispatch({
            type: UPDATE_READ_NOTIFICATIONS,
            payload: {},
        });
        await serverData.UpdateReadNotifications(
            action,
            data => {
                dispatch({
                    type: UPDATE_READ_NOTIFICATIONS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: UPDATE_READ_NOTIFICATIONS_FAILED,
                    payload: error,
                });
            },
        );
    };
}