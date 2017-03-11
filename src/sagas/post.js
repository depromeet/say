import { delay, eventChannel } from 'redux-saga';
import { put, takeEvery, fork, take, call } from 'redux-saga/effects';
import * as actions from '../actions/post';
import * as types from '../actions/actionTypes';
import { database } from '../database/database';

function* requestPost(action){
  try{
    yield put(actions.getPostRequested());
    let posts = null;
    yield database.ref('posts').limitToLast(15).once('value', snap => {
        posts = snap.val();
      })
    yield put(actions.getPostFulfilled(posts));
  } catch(e){
    yield put(actions.getPostRejected());
  }

}

function* watchRequestPost(){
  yield takeEvery(types.GET_POST_REQUESTING, updatedItemSaga);// 실시간 동기화
  yield takeEvery(types.GET_POST_REQUESTING, requestPost);
}

function* showWarning(action){
  yield delay(1500);
  yield put(actions.hideWarning());
}

function* watchGetPostRejected(){
  yield takeEvery(types.GET_POST_REJECTED, showWarning);
  yield takeEvery(types.CREATE_POST_REJECTED, showWarning);
}

function insertPost(post, userInfo) {
    const newItemRef = database.ref('posts').push();
    return newItemRef.set({
      contents: post,
      userInfo: userInfo
    });
}

function* createPost(action) {
    const post = action.post;
    const userInfo = action.userInfo;
    try {
      yield put(actions.createPostRequested());
      yield call(insertPost, post, userInfo);
      yield put(actions.createPostFulfilled(post));
    } catch (e) {
      yield put(actions.createPostRejected());
    }
}

function* watchCreatePost(){
  yield takeEvery(types.CREATE_POST_REQUESTING, createPost);
}

function createEventChannel() {
    const listener = eventChannel(
        emit => {
            database.ref('posts')
            .on('child_added', data => {
              let post = {}
              post[data.key] = data.val()
              emit(post)})
            return () => database.ref('posts').off(listener);
        }
    );
    return listener;
}
function* updatedItemSaga() {
    const updateChannel = createEventChannel();
    while(true) {
        const post = yield take(updateChannel);
        yield put(actions.getPostAddedAction(post));
    }
}

export default function* postSaga(){
  yield fork(watchRequestPost);
  yield fork(watchGetPostRejected);
  yield fork(watchCreatePost);
}
