import * as types from './actionTypes';

export const authLoginRequestingWithEmail = (email, pw) => ({
  type: types.AUTH_LOGIN_REQUESTING_WITH_EMAIL,
  email,
  pw
});

export const authLoginRequested = () => ({
  type: types.AUTH_LOGIN_REQUESTED,
});

export const authLoginFulfilled = () => ({
  type: types.AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = (message) => ({
  type: types.AUTH_LOGIN_REJECTED,
  message
});

export const authLoginDetected = (user) => ({
  type: types.AUTH_LOGIN_DETECTED,
  user
});

export const authLoginGetUserInfo = (userInfo, message) => ({
  type: types.AUTH_LOGIN_GET_USER_INFO,
  userInfo,
  message
});

export const authLogoutRequesting = () => ({
  type: types.AUTH_LOGOUT_REQUESTING,
});

export const authLogoutRequested = () => ({
  type: types.AUTH_LOGOUT_REQUESTED,
});

export const authLogoutFulfilled = (message) => ({
  type: types.AUTH_LOGOUT_FULFILLED,
  message
});

export const authLogoutRejected = () => ({
  type: types.AUTH_LOGOUT_REJECTED,
});

export const hideAuthMessage = () => ({
  type: types.HIDE_AUTH_MESSAGE
});

export const authLogoutDetected = () => ({
  type: types.AUTH_LOGOUT_DETECTED
});

export const authRegisterRequesting = (email, pw, name) => ({
  type: types.AUTH_REGISTER_REQUESTING,
  email,
  pw,
  name
});

export const authLoginRequestingWithFacebook = () => ({
  type: types.AUTH_LOGIN_REQUESTING_WITH_FACEBOOK
});

export const authRegisterRequested = () => ({
  type: types.AUTH_REGISTER_REQUESTED
});

export const authRegisterRejected = (message) => ({
  type: types.AUTH_REGISTER_REJECTED,
  message
});

export const authRegisterFulfilled = () => ({
  type: types.AUTH_REGISTER_FULFILLED,
});
