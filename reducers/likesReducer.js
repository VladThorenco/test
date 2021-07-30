import {UPDATE_LIKE_SUCCESS, GET_LIKE, UPDATE_LIKE_COUNT} from 'redux/actions/entities/likesActions';
import _ from 'lodash';
import { CLEAR_STORE } from 'redux/actions/entities/clearStoreActions';
import { DELETE_POST_SUCCESS } from 'redux/actions/entities/postsActions';
import { SIGN_OUT_SUCCESS } from 'redux/actions/entities/authenticate/authenticate';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_LIKE:
        return {...state, [action.payload.likedId]: action.payload};
    case UPDATE_LIKE_SUCCESS:
        return {...state, [action.payload.likedId]: action.payload};
    case UPDATE_LIKE_COUNT:
        return {...state, [action.payload.likedId]: {...state[action.payload.likedId], ...action.payload}};
    case DELETE_POST_SUCCESS:
        return _.omit(state, action.payload);
    case CLEAR_STORE:
        return initialState;
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}
