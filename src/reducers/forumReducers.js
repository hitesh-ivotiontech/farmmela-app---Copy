

const initialState = { fetching: false, success: false, error: false };

import {
    ASK_QUESTION,
    ASK_QUESTION_SUCCESS,
    ASK_QUESTION_FAILED,
    CREATE_FORUM,
    CREATE_FORUM_SUCCESS,
    CREATE_FORUM_FAILED,
    GET_FORUMLIST,
    GET_FORUMLIST_SUCCESS,
    GET_FORUMLIST_FAILED,
    FORUM_LIKE,
    FORUM_LIKE_SUCCESS,
    FORUM_LIKE_FAILED,
    FORUM_UNLIKE,
    FORUM_UNLIKE_SUCCESS,
    FORUM_UNLIKE_FAILED,
    FORUM_ADD_COMMENT,
    FORUM_ADD_COMMENT_SUCCESS,
    FORUM_ADD_COMMENT_FAILED,
    FORUM_DELETE_COMMENT,
    FORUM_DELETE_COMMENT_SUCCESS,
    FORUM_DELETE_COMMENT_FAILED,
    ADDREPORT,
    ADDREPORT_SUCCESS,
    ADDREPORT_FAILED,

    FORUM_EDIT_COMMENT,
    FORUM_EDIT_COMMENT_SUCCESS,
    FORUM_EDIT_COMMENT_FAILED,

    FORUM_EDIT,
    FORUM_EDIT_SUCCESS,
    FORUM_EDIT_FAILED,

    FORUM_DELETE,
    FORUM_DELETE_SUCCESS,
    FORUM_DELETE_FAILED

} from '../actions/forumActions'



export function AskQuestion(state = initialState, action) {
    switch (action.type) {
        case ASK_QUESTION: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ASK_QUESTION_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ASK_QUESTION_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function CreateForum(state = initialState, action) {
    switch (action.type) {
        case CREATE_FORUM: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case CREATE_FORUM_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case CREATE_FORUM_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}
export function GetForumList(state = initialState, action) {
    switch (action.type) {
        case GET_FORUMLIST: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_FORUMLIST_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_FORUMLIST_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}
export function ForumLike(state = initialState, action) {
    switch (action.type) {
        case FORUM_LIKE: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case FORUM_LIKE_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case FORUM_LIKE_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}
export function ForumUnlike(state = initialState, action) {
    switch (action.type) {
        case FORUM_UNLIKE: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case FORUM_UNLIKE_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case FORUM_UNLIKE_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}
export function ForumAddComment(state = initialState, action) {
    switch (action.type) {
        case FORUM_ADD_COMMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case FORUM_ADD_COMMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case FORUM_ADD_COMMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function ForumDeleteComment(state = initialState, action) {
    switch (action.type) {
        case FORUM_DELETE_COMMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case FORUM_DELETE_COMMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case FORUM_DELETE_COMMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function AddReport(state = initialState, action) {
    switch (action.type) {
        case ADDREPORT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ADDREPORT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ADDREPORT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function EditCommnetForum(state = initialState, action) {
    switch (action.type) {
        case FORUM_EDIT_COMMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case FORUM_EDIT_COMMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case FORUM_EDIT_COMMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function EditForum(state = initialState, action) {
    switch (action.type) {
        case FORUM_EDIT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case FORUM_EDIT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case FORUM_EDIT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function DeleteForum(state = initialState, action) {
    switch (action.type) {
        case FORUM_DELETE: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case FORUM_DELETE_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case FORUM_DELETE_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}
