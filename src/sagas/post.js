import { delay, eventChannel } from 'redux-saga';
import { put, takeEvery, fork, take, call } from 'redux-saga/effects';
import * as actions from '../actions/post';
import * as types from '../actions/actionTypes';
import { database, storage } from '../database/database';

function* requestPost(action){
  try{
    yield put(actions.getPostRequested());
    let posts = {};
    yield database.ref('posts').limitToLast(100).once('value', snap => {
        if(snap.val()!==null){
          posts = snap.val();
        }
      })
    yield put(actions.getPostFulfilled(posts));
  } catch(e){
    yield put(actions.getPostRejected());
    yield put(actions.postShowMessage(`Server ERROR`));
  }
}

function* watchRequestPost(){
  yield takeEvery(types.GET_POST_REQUESTING, updatedItemSaga);// 실시간 동기화
  yield takeEvery(types.GET_POST_REQUESTING, requestPost);
}

function* showMessageAndHide(){
  yield delay(1500);
  yield put(actions.hidePostMessage());
}

function* watchGetPostRejected(){
  yield takeEvery(types.POST_SHOW_MESSAGE, showMessageAndHide);
}

function* insertPost(userInfo, contents, file) {
    const filename = userInfo.uid + "-" + Date();
    const storageRef = storage.ref();
    const mountainsRef = storageRef.child(filename);
    let fileUrl = null;
    if(file!==null){
      yield mountainsRef.put(file).then(function(snapshot) {
        fileUrl = snapshot.a.downloadURLs[0]
      });
    }

    const newItemRef = yield database.ref('posts').push();
    yield newItemRef.set({
      contents,
      userInfo,
      fileUrl
    });
    return null
}

function* createPost(action) {
    const userInfo = action.userInfo;
    const contents = action.contents;
    const file = action.file;
    try {
      yield put(actions.createPostRequested());
      yield call(insertPost, userInfo, contents, file);
      yield put(actions.createPostFulfilled());
      yield put(actions.postShowMessage(`Success`));
    } catch (e) {
      yield put(actions.createPostRejected());
      yield put(actions.postShowMessage(`Create ERROR`));
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
