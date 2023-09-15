import serverData from '../api/ServerData'

export const GETNEWS = 'GETNEWS';
export const GETNEWS_SUCCESS = 'GETNEWS_SUCCESS';
export const GETNEWS_FAILED = 'GETNEWS_FAILED';



export function GetNews(action) {
    return async dispatch => {
        dispatch({
            type: GETNEWS,
            payload: {},
        });
        await serverData.GetNews(
            action,
            data => {
                dispatch({
                    type: GETNEWS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GETNEWS_FAILED,
                    payload: error,
                });
            },
        );
    };
}
