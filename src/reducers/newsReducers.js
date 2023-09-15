const initialState = { fetching: false, success: false, error: false };

import {
    GETNEWS,
    GETNEWS_SUCCESS,
    GETNEWS_FAILED
} from '../actions/newsActions'



export function GetNews(state = initialState, action) {
    switch (action.type) {
        case GETNEWS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GETNEWS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GETNEWS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}
