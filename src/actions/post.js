import * as types from './actionTypes';

export const getPosts = () => ({
  type: types.GET_POST_REQUESTING
});


export const getPostRequested = () => ({
  type: types.GET_POST_REQUESTED
});

export const getPostRejected = () => ({
  type: types.GET_POST_REJECTED
});

export const getPostFulfilled = (posts) => ({
  type: types.GET_POST_FULFILLED,
  posts
});

export const hidePostMessage = () => ({
  type: types.HIDE_POST_MESSAGE
});

export const getPostAddedAction = (post) => ({
  type: types.GET_POST_ADDED_ACTION,
  post
});

export const createPost = (userInfo, contents, file) => ({
    type: types.CREATE_POST_REQUESTING,
    contents,
    userInfo,
    file
});

export const createPostRequested = () => ({
  type: types.CREATE_POST_REQUESTED
});

export const createPostRejected = () => ({
  type: types.CREATE_POST_REJECTED
});

export const createPostFulfilled = () => ({
  type: types.CREATE_POST_FULFILLED
});

export const postShowMessage = (message) => ({
  type: types.POST_SHOW_MESSAGE,
  message
});
