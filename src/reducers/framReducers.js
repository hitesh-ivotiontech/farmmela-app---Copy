const initialState = { fetching: false, success: false, error: false };
import {POSTREVENU,POSTREVENU_FAILED,POSTREVENU_SUCCESS} from '../actions/farmAction'

export function PostNewRevenu(state = initialState, action) {
    switch (action.type) {
        case POSTREVENU: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case POSTREVENU_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case POSTREVENU_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}