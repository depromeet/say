import * as types from './actionTypes';


export const authLoginDetected = (user) => ({
  type: types.AUTH_LOGIN_DETECTED,
  user
});

export const authLoginGetUserInfo = (userInfo) => ({
  type: types.AUTH_LOGIN_GET_USER_INFO,
  userInfo
});

export const authLoginRequested = () => ({
  type: types.AUTH_LOGIN_REQUESTED,
});

export const authLogoutRequesting = () => ({
  type: types.AUTH_LOGOUT_REQUESTING,
});

export const authLogoutRequested = () => ({
  type: types.AUTH_LOGOUT_REQUESTED,
});

export const authLogoutFulfilled = () => ({
  type: types.AUTH_LOGOUT_FULFILLED
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

export const authAnonymouslyLoginFromGirl = () => ({
  type: types.AUTH_ANONYMOUSLY_LOGIN_FROM_GIRL,
});

export const authAnonymouslyLoginFromBoy = () => ({
  type: types.AUTH_ANONYMOUSLY_LOGIN_FROM_BOY,
});

export const authShowMessage = (message) => ({
  type: types.AUTH_SHOW_MESSAGE,
  message
});
