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

export const hideWarning = () => ({
  type: types.HIDE_WARNING
});

export const getPostAddedAction = (post) => ({
  type: types.GET_POST_ADDED_ACTION,
  post
});

export const createPost = (post, userInfo) => ({
    type: types.CREATE_POST_REQUESTING,
    post,
    userInfo
});

export const createPostRequested = () => ({
  type: types.CREATE_POST_REQUESTED
});

export const createPostRejected = () => ({
  type: types.CREATE_POST_REJECTED
});

export const createPostFulfilled = (posts) => ({
  type: types.CREATE_POST_FULFILLED,
  posts
});
