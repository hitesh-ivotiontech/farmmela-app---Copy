import serverData from '../api/ServerData'

export const POSTREVENU = 'POSTREVENU';
export const POSTREVENU_SUCCESS = 'POSTREVENU_SUCCESS';
export const POSTREVENU_FAILED = 'POSTREVENU_FAILED';

export function PostNewRevenu(action) {
    return async dispatch => {
        dispatch({
            type: POSTREVENU,
            payload: {},
        });
        await serverData.PostNewRevenu(
            action,
            data => {
                dispatch({
                    type: POSTREVENU_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: POSTREVENU_FAILED,
                    payload: error,
                });
            },
        );
    };
}
