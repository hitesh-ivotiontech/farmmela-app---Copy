

const initialState = { fetching: false, success: false, error: false };

import {
    ALL_LANGUAGES,
    ALL_LANGUAGESSUCCESS,
    ALL_LANGUAGESFAILED,
    ALL_STATES,
    ALL_STATESSUCCESS,
    ALL_STATESFAILED,
    ALL_CITIES,
    ALL_CITIESSUCCESS,
    ALL_CITIESFAILED,
    GET_ASK_QUESTION_CATEGORY,
    GET_ASK_QUESTION_CATEGORY_SUCCESS,
    GET_ASK_QUESTION_CATEGORY_FAILED,
    GET_ASK_QUESTION_SUBCATEGORY,
    GET_ASK_QUESTION_SUBCATEGORY_SUCCESS,
    GET_ASK_QUESTION_SUBCATEGORY_FAILED,
    GET_HOME_BANNER,
    GET_HOME_BANNER_SUCCESS,
    GET_HOME_BANNER_FAILED,
    GET_POST_SUBCATEGORY,
    GET_POST_SUBCATEGORY_SUCCESS,
    GET_POST_SUBCATEGORY_FAILED,
    GET_POST_SUBSUBCATEGORY,
    GET_POST_SUBSUBCATEGORY_SUCCESS,
    GET_POST_SUBSUBCATEGORY_FAILED,

    GET_POST_CATEGORY,
    GET_POST_CATEGORY_SUCCESS,
    GET_POST_CATEGORY_FAILED,

    GET_MAP_CATEGORY,
    GET_MAP_CATEGORY_SUCCESS,
    GET_MAP_CATEGORY_FAILED


} from '../actions/commonActions'



export function AllLanguages(state = initialState, action) {
    switch (action.type) {
        case ALL_LANGUAGES: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ALL_LANGUAGESSUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ALL_LANGUAGESFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function AllStates(state = initialState, action) {
    switch (action.type) {
        case ALL_STATES: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ALL_STATESSUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ALL_STATESFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function AllCities(state = initialState, action) {
    switch (action.type) {
        case ALL_CITIES: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ALL_CITIESSUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ALL_CITIESFAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function GetAskQuestionCategory(state = initialState, action) {
    switch (action.type) {
        case GET_ASK_QUESTION_CATEGORY: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_ASK_QUESTION_CATEGORY_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_ASK_QUESTION_CATEGORY_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function GetAskQuestionSubCategory(state = initialState, action) {
    switch (action.type) {
        case GET_ASK_QUESTION_SUBCATEGORY: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_ASK_QUESTION_SUBCATEGORY_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_ASK_QUESTION_SUBCATEGORY_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function GetPostSubCategory(state = initialState, action) {
    switch (action.type) {
        case GET_POST_SUBCATEGORY: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_POST_SUBCATEGORY_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_POST_SUBCATEGORY_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function GetPostSubSubCategory(state = initialState, action) {
    switch (action.type) {
        case GET_POST_SUBSUBCATEGORY: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_POST_SUBSUBCATEGORY_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_POST_SUBSUBCATEGORY_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function GetHomeBanner(state = initialState, action) {
    switch (action.type) {
        case GET_HOME_BANNER: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_HOME_BANNER_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_HOME_BANNER_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function PostCategoryList(state = initialState, action) {
    switch (action.type) {
        case GET_POST_CATEGORY: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_POST_CATEGORY_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_POST_CATEGORY_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function GetMapCategoryList(state = initialState, action) {
    switch (action.type) {
        case GET_MAP_CATEGORY: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_MAP_CATEGORY_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_MAP_CATEGORY_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}