import { firebaseAuth, database } from '../database/database'
import { put, takeEvery, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/auth';
import * as types from '../actions/actionTypes';

function* register(action){
  try{
    yield put(actions.authRegisterRequested());
    const user = yield firebaseAuth().createUserWithEmailAndPassword(action.email, action.pw)
    yield saveUserWithEmail(user, action.name)
    yield put(actions.authRegisterFulfilled());
  } catch(e){
    yield put(actions.authRegisterRejected(e.message));
  }
}

function* showMessage(){
  yield delay(1500);
  yield put(actions.hideAuthMessage());
}

function* watchShowMessage(){
  yield takeEvery(types.AUTH_REGISTER_REJECTED, showMessage);
  yield takeEvery(types.AUTH_LOGIN_GET_USER_INFO, showMessage);
  yield takeEvery(types.AUTH_LOGIN_REJECTED, showMessage);
  yield takeEvery(types.AUTH_LOGOUT_FULFILLED, showMessage);
}

function saveUserWithEmail (user, name) {
  return database.ref().child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      name: name
    })
    .then(() => user)
}

function saveUserWithFacebook (user) {
  console.log(user.displayName);
  return database.ref().child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
      name: user.displayName!==undefined?user.displayName:null
    })
    .then(() => user)
}

function* watchRegister(){
  yield takeEvery(types.AUTH_REGISTER_REQUESTING, register);
}

function* getUserInfo(action){
  try{
    const user = action.user
    let userInfo = null;
    yield database.ref(`users/${user.uid}/info`)
    .once('value', snap => {
      userInfo = snap.val();
    })
    if(userInfo===null){
      yield saveUserWithFacebook(user)
      yield database.ref(`users/${user.uid}/info`)
      .once('value', snap => {
        userInfo = snap.val();
      })
    }
    yield put(actions.authLoginGetUserInfo(userInfo, `Hello ${userInfo.name!==undefined?userInfo.name:userInfo.email}`));
  } catch(e){
    console.log(e);
  }
}

function* watchLoginDetected(){
  yield takeEvery(types.AUTH_LOGIN_DETECTED, getUserInfo);
}

function* logout () {
  try{
    yield put(actions.authLogoutRequested());
    yield firebaseAuth().signOut();
    yield put(actions.authLogoutFulfilled("Goodbye"));
  } catch(e){
    yield put(actions.authLogoutRejected());
  }
}

function* watchLogout(){
  yield takeEvery(types.AUTH_LOGOUT_REQUESTING, logout);
}

function* loginWithEmail (action) {
  try{
    yield put(actions.authLoginRequested());
    yield firebaseAuth().signInWithEmailAndPassword(action.email, action.pw)
    yield put(actions.authLoginFulfilled());
  } catch(e){
    yield put(actions.authLoginRejected(e.message));
  }
}

function* loginWithFacebook (action) {
  try{
    yield put(actions.authLoginRequested());
    const provider = new firebaseAuth.FacebookAuthProvider()
    yield firebaseAuth().signInWithPopup(provider)
    yield put(actions.authLoginFulfilled());
  } catch(e){
    yield put(actions.authLoginRejected(e.message));
  }
}

function* watchLogin(){
  yield takeEvery(types.AUTH_LOGIN_REQUESTING_WITH_EMAIL, loginWithEmail);
  yield takeEvery(types.AUTH_LOGIN_REQUESTING_WITH_FACEBOOK, loginWithFacebook);
}


export default function* auth(){
  yield fork(watchRegister);
  yield fork(watchLogout);
  yield fork(watchLogin);
  yield fork(watchLoginDetected);
  yield fork(watchShowMessage);
}
