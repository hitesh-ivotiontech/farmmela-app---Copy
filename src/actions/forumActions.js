import serverData from '../api/ServerData'

export const ASK_QUESTION = 'ASK_QUESTION';
export const ASK_QUESTION_SUCCESS = 'ASK_QUESTION_SUCCESS';
export const ASK_QUESTION_FAILED = 'ASK_QUESTION_FAILED';

export const CREATE_FORUM = 'CREATE_FORUM';
export const CREATE_FORUM_SUCCESS = 'CREATE_FORUM_SUCCESS';
export const CREATE_FORUM_FAILED = 'CREATE_FORUM_FAILED';

export const GET_FORUMLIST = 'GET_FORUMLIST';
export const GET_FORUMLIST_SUCCESS = 'GET_FORUMLIST_SUCCESS';
export const GET_FORUMLIST_FAILED = 'GET_FORUMLIST_FAILED';

export const FORUM_LIKE = 'FORUM_LIKE';
export const FORUM_LIKE_SUCCESS = 'FORUM_LIKE_SUCCESS';
export const FORUM_LIKE_FAILED = 'FORUM_LIKE_FAILED';

export const FORUM_UNLIKE = 'FORUM_UNLIKE';
export const FORUM_UNLIKE_SUCCESS = 'FORUM_UNLIKE_SUCCESS';
export const FORUM_UNLIKE_FAILED = 'FORUM_UNLIKE_FAILED';

export const FORUM_ADD_COMMENT = 'FORUM_ADD_COMMENT';
export const FORUM_ADD_COMMENT_SUCCESS = 'FORUM_ADD_COMMENT_SUCCESS';
export const FORUM_ADD_COMMENT_FAILED = 'FORUM_ADD_COMMENT_FAILED';

export const FORUM_DELETE_COMMENT = 'FORUM_DELETE_COMMENT';
export const FORUM_DELETE_COMMENT_SUCCESS = 'FORUM_DELETE_COMMENT_SUCCESS';
export const FORUM_DELETE_COMMENT_FAILED = 'FORUM_DELETE_COMMENT_FAILED';

export const ADDREPORT = 'ADDREPORT';
export const ADDREPORT_SUCCESS = 'ADDREPORT_SUCCESS';
export const ADDREPORT_FAILED = 'ADDREPORT_FAILED';

export const FORUM_EDIT_COMMENT = 'FORUM_EDIT_COMMENT';
export const FORUM_EDIT_COMMENT_SUCCESS = 'FORUM_EDIT_COMMENT_SUCCESS';
export const FORUM_EDIT_COMMENT_FAILED = 'FORUM_EDIT_COMMENT_FAILED';

export const FORUM_EDIT = 'FORUM_EDIT';
export const FORUM_EDIT_SUCCESS = 'FORUM_EDIT_SUCCESS';
export const FORUM_EDIT_FAILED = 'FORUM_EDIT_FAILED';


export const FORUM_DELETE = 'FORUM_DELETE';
export const FORUM_DELETE_SUCCESS = 'FORUM_DELETE_SUCCESS';
export const FORUM_DELETE_FAILED = 'FORUM_DELETE_FAILED';

export function AskQuestion(action) {
    return async dispatch => {
        dispatch({
            type: ASK_QUESTION,
            payload: {},
        });
        await serverData.AskQuestion(
            action,
            data => {
                dispatch({
                    type: ASK_QUESTION_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ASK_QUESTION_FAILED,
                    payload: error,
                });
            },
        );
    };
}




export function CreateForum(action) {
    return async dispatch => {
        dispatch({
            type: CREATE_FORUM,
            payload: {},
        });
        await serverData.CreateForum(
            action,
            data => {
                dispatch({
                    type: CREATE_FORUM_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: CREATE_FORUM_FAILED,
                    payload: error,
                });
            },
        );
    };
}
export function GetForumList(action) {
    return async dispatch => {
        dispatch({
            type: GET_FORUMLIST,
            payload: {},
        });
        await serverData.GetForumList(
            action,
            data => {
                dispatch({
                    type: GET_FORUMLIST_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_FORUMLIST_FAILED,
                    payload: error,
                });
            },
        );
    };
}
export function ForumLike(action) {
    return async dispatch => {
        dispatch({
            type: FORUM_LIKE,
            payload: {},
        });
        await serverData.ForumLike(
            action,
            data => {
                dispatch({
                    type: FORUM_LIKE_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: FORUM_LIKE_FAILED,
                    payload: error,
                });
            },
        );
    };
}
export function ForumUnlike(action) {
    return async dispatch => {
        dispatch({
            type: FORUM_UNLIKE,
            payload: {},
        });
        await serverData.ForumUnlike(
            action,
            data => {
                dispatch({
                    type: FORUM_UNLIKE_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: FORUM_UNLIKE_FAILED,
                    payload: error,
                });
            },
        );
    };
}
export function ForumAddComment(action) {
    return async dispatch => {
        dispatch({
            type: FORUM_ADD_COMMENT,
            payload: {},
        });
        await serverData.ForumAddComment(
            action,
            data => {
                dispatch({
                    type: FORUM_ADD_COMMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: FORUM_ADD_COMMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function ForumDeleteComment(action) {
    return async dispatch => {
        dispatch({
            type: FORUM_DELETE_COMMENT,
            payload: {},
        });
        await serverData.ForumDeleteComment(
            action,
            data => {
                dispatch({
                    type: FORUM_DELETE_COMMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: FORUM_DELETE_COMMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}



export function AddReport(action) {
    return async dispatch => {
        dispatch({
            type: ADDREPORT,
            payload: {},
        });
        await serverData.AddReport(
            action,
            data => {
                dispatch({
                    type: ADDREPORT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ADDREPORT_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function EditCommnetForum(action) {
    return async dispatch => {
        dispatch({
            type: FORUM_EDIT_COMMENT,
            payload: {},
        });
        await serverData.EditCommnetForum(
            action,
            data => {
                dispatch({
                    type: FORUM_EDIT_COMMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: FORUM_EDIT_COMMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function EditForum(action) {
    return async dispatch => {
        dispatch({
            type: FORUM_EDIT,
            payload: {},
        });
        await serverData.EditForum(
            action,
            data => {
                dispatch({
                    type: FORUM_EDIT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: FORUM_EDIT_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function DeleteForum(action) {
    return async dispatch => {
        dispatch({
            type: FORUM_DELETE,
            payload: {},
        });
        await serverData.DeleteForum(
            action,
            data => {
                dispatch({
                    type: FORUM_DELETE_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: FORUM_DELETE_FAILED,
                    payload: error,
                });
            },
        );
    };
}