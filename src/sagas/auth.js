import { firebaseAuth, database } from '../database/database'
import { put, takeEvery, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/auth';
import * as types from '../actions/actionTypes';

function* logout () {
  try{
    yield put(actions.authLogoutRequested());
    yield firebaseAuth().signOut();
    yield put(actions.authLogoutFulfilled());
    yield put(actions.showMessage(`Goodbye`));
  } catch(e){
    yield put(actions.authLogoutRejected());
  }
}

function* watchLogout(){
  yield takeEvery(types.AUTH_LOGOUT_REQUESTING, logout);
}

function* watchLogin(){
  yield takeEvery(types.AUTH_ANONYMOUSLY_LOGIN_FROM_GIRL, authAnonymouslyLoginFromGirl);
  yield takeEvery(types.AUTH_ANONYMOUSLY_LOGIN_FROM_BOY, authAnonymouslyLoginFromBoy);
}

function* authAnonymouslyLoginFromGirl () {
  try{
    yield put(actions.authLoginRequested());
    let userCnt = 0;
    yield database.ref('users').once('value', snap => {
      if (snap.val() !== null){
        userCnt = Object.keys(snap.val()).length
      }
    })
    const user = yield firebaseAuth().signInAnonymously()
    yield saveAnonymousUser(user, "girl", userCnt+1)
  } catch(e){
    yield put(actions.showMessage(e.message));
  }
}

function* authAnonymouslyLoginFromBoy () {
  try{
    yield put(actions.authLoginRequested());
    let userCnt = 0;
    yield database.ref('users').once('value', snap => {
      if (snap.val() !== null){
        userCnt = Object.keys(snap.val()).length
      }
    })
    const user = yield firebaseAuth().signInAnonymously()
    yield saveAnonymousUser(user, "boy", userCnt+1)

  } catch(e){
    yield put(actions.showMessage(e.message));
  }
}

function saveAnonymousUser (user, gender, idx) {
  return database.ref().child(`users/${user.uid}`)
    .set({
      uid: user.uid,
      gender: gender,
      date: (new Date()).toJSON(),
      idx: idx
    })
    .then(() => user)

}

function* showMessage(){
  yield delay(1500);
  yield put(actions.hideAuthMessage());
}

function* watchShowMessage(){
  yield takeEvery(types.SHOW_MESSAGE, showMessage);
}

function* getUserInfo(action){
  try{
    const user = action.user
    let userInfo = null;
    yield database.ref(`users/${user.uid}`)
    .once('value', snap => {
      userInfo = snap.val();
    })
    yield put(actions.authLoginGetUserInfo(userInfo));
    yield put(actions.showMessage(`Hello ${userInfo.gender}`));
  } catch(e){
    yield put(actions.showMessage(e.message));
  }
}


function* watchLoginDetected(){
  yield takeEvery(types.AUTH_LOGIN_DETECTED, getUserInfo);
}

export default function* auth(){
  yield fork(watchLogout);
  yield fork(watchLogin);
  yield fork(watchLoginDetected);
  yield fork(watchShowMessage);
  // yield fork(logout);
}
