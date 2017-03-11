import * as types from '../actions/actionTypes';

const initialState = {
  requested: false,
  postLoading: true,
  posts: {},
  messageVisibility: false,
  message: '',

};

export default function post(state = initialState, action) {

	switch(action.type) {
    case types.GET_POST_REQUESTED:
      return {
        ...state,
        requested: true
      };
    case types.GET_POST_FULFILLED:
      return {
        ...state,
        requested: false,
        posts: action.posts,
        postLoading: false
      };
    case types.GET_POST_REJECTED:
      return {
        ...state,
        requested: false,
        messageVisibility: true
      }
    case types.CREATE_POST_REQUESTED:
      return {
        ...state,
        requested: true,
        postLoading: true
      };
    case types.CREATE_POST_FULFILLED:
      return {
        ...state,
        requested: false,
        postLoading: false
      };
    case types.CREATE_POST_REJECTED:
      return {
        ...state,
        requested: false,
        messageVisibility: true,
        postLoading: false
      }
    case types.HIDE_POST_MESSAGE:
      return {
        ...state,
        messageVisibility: false
      }
    case types.WATCH_GUEST_ADDED_EVENT:
      return {
        ...state,
      }
    case types.GET_POST_ADDED_ACTION:
      return {
        ...state,
        posts: Object.assign(state.posts, action.post)
      }
    case types.POST_SHOW_MESSAGE:
      return {
        ...state,
        messageVisibility: true,
        message: action.message
      }

		default:
			return state;
	}
}
