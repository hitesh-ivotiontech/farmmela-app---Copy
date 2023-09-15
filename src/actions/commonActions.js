import serverData from '../api/ServerData'

export const ALL_LANGUAGES = 'ALL_LANGUAGES';
export const ALL_LANGUAGESSUCCESS = 'ALL_LANGUAGESSUCCESS';
export const ALL_LANGUAGESFAILED = 'ALL_LANGUAGESFAILED';

export const ALL_STATES = 'ALL_STATES';
export const ALL_STATESSUCCESS = 'ALL_STATESSUCCESS';
export const ALL_STATESFAILED = 'ALL_STATESFAILED';

export const ALL_CITIES = 'ALL_CITIES';
export const ALL_CITIESSUCCESS = 'ALL_CITIESSUCCESS';
export const ALL_CITIESFAILED = 'ALL_CITIESFAILED';

export const GET_ASK_QUESTION_CATEGORY = 'GET_ASK_QUESTION_CATEGORY';
export const GET_ASK_QUESTION_CATEGORY_SUCCESS = 'GET_ASK_QUESTION_CATEGORY_SUCCESS';
export const GET_ASK_QUESTION_CATEGORY_FAILED = 'GET_ASK_QUESTION_CATEGORY_FAILED';

export const GET_ASK_QUESTION_SUBCATEGORY = 'GET_ASK_QUESTION_SUBCATEGORY';
export const GET_ASK_QUESTION_SUBCATEGORY_SUCCESS = 'GET_ASK_QUESTION_SUBCATEGORY_SUCCESS';
export const GET_ASK_QUESTION_SUBCATEGORY_FAILED = 'GET_ASK_QUESTION_SUBCATEGORY_FAILED';

export const GET_HOME_BANNER = 'GET_HOME_BANNER';
export const GET_HOME_BANNER_SUCCESS = 'GET_HOME_BANNER_SUCCESS';
export const GET_HOME_BANNER_FAILED = 'GET_HOME_BANNER_FAILED';

export const GET_POST_SUBCATEGORY = 'GET_POST_SUBCATEGORY';
export const GET_POST_SUBCATEGORY_SUCCESS = 'GET_POST_SUBCATEGORY_SUCCESS';
export const GET_POST_SUBCATEGORY_FAILED = 'GET_POST_SUBCATEGORY_FAILED';

export const GET_POST_SUBSUBCATEGORY = 'GET_POST_SUBSUBCATEGORY';
export const GET_POST_SUBSUBCATEGORY_SUCCESS = 'GET_POST_SUBSUBCATEGORY_SUCCESS';
export const GET_POST_SUBSUBCATEGORY_FAILED = 'GET_POST_SUBSUBCATEGORY_FAILED';

export const GET_POST_CATEGORY = 'GET_POST_CATEGORY';
export const GET_POST_CATEGORY_SUCCESS = 'GET_POST_CATEGORY_SUCCESS';
export const GET_POST_CATEGORY_FAILED = 'GET_POST_CATEGORY_FAILED';

export const GET_MAP_CATEGORY = 'GET_MAP_CATEGORY';
export const GET_MAP_CATEGORY_SUCCESS = 'GET_MAP_CATEGORY_SUCCESS';
export const GET_MAP_CATEGORY_FAILED = 'GET_MAP_CATEGORY_FAILED';



export function AllLanguages(action) {
    return async dispatch => {
        dispatch({
            type: ALL_LANGUAGES,
            payload: {},
        });
        await serverData.AllLanguages(
            action,
            data => {
                dispatch({
                    type: ALL_LANGUAGESSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ALL_LANGUAGESFAILED,
                    payload: error,
                });
            },
        );
    };
}

export function AllStates(action) {
    return async dispatch => {
        dispatch({
            type: ALL_STATES,
            payload: {},
        });
        await serverData.AllStates(
            action,
            data => {
                dispatch({
                    type: ALL_STATESSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ALL_STATESFAILED,
                    payload: error,
                });
            },
        );
    };
}


export function AllCities(action) {
    return async dispatch => {
        dispatch({
            type: ALL_CITIES,
            payload: {},
        });
        await serverData.AllCities(
            action,
            data => {
                dispatch({
                    type: ALL_CITIESSUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ALL_CITIESFAILED,
                    payload: error,
                });
            },
        );
    };
}


export function GetAskQuestionCategory(action) {
    return async dispatch => {
        dispatch({
            type: GET_ASK_QUESTION_CATEGORY,
            payload: {},
        });
        await serverData.GetAskQuestionCategory(
            action,
            data => {
                dispatch({
                    type: GET_ASK_QUESTION_CATEGORY_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_ASK_QUESTION_CATEGORY_FAILED,
                    payload: error,
                });
            },
        );
    };
}



export function GetAskQuestionSubCategory(action) {
    return async dispatch => {
        dispatch({
            type: GET_ASK_QUESTION_SUBCATEGORY,
            payload: {},
        });
        await serverData.GetAskQuestionSubCategory(
            action,
            data => {
                dispatch({
                    type: GET_ASK_QUESTION_SUBCATEGORY_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_ASK_QUESTION_SUBCATEGORY_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetPostSubCategory(action) {
    return async dispatch => {
        dispatch({
            type: GET_POST_SUBCATEGORY,
            payload: {},
        });
        await serverData.GetPostSubCategory(
            action,
            data => {
                dispatch({
                    type: GET_POST_SUBCATEGORY_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_POST_SUBCATEGORY_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetPostSubSubCategory(action) {
    return async dispatch => {
        dispatch({
            type: GET_POST_SUBSUBCATEGORY,
            payload: {},
        });
        await serverData.GetPostSubSubCategory(
            action,
            data => {
                dispatch({
                    type: GET_POST_SUBSUBCATEGORY_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_POST_SUBSUBCATEGORY_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetHomeBanner(action) {
    return async dispatch => {
        dispatch({
            type: GET_HOME_BANNER,
            payload: {},
        });
        await serverData.GetHomeBanner(
            action,
            data => {
                dispatch({
                    type: GET_HOME_BANNER_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_HOME_BANNER_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function PostCategoryList(action) {
    return async dispatch => {
        dispatch({
            type: GET_POST_CATEGORY,
            payload: {},
        });
        await serverData.PostCategoryList(
            action,
            data => {
                dispatch({
                    type: GET_POST_CATEGORY_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_POST_CATEGORY_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetMapCategoryList(action) {
    return async dispatch => {
        dispatch({
            type: GET_MAP_CATEGORY,
            payload: {},
        });
        await serverData.GetMapCategoryList(
            action,
            data => {
                dispatch({
                    type: GET_MAP_CATEGORY_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_MAP_CATEGORY_FAILED,
                    payload: error,
                });
            },
        );
    };
}



