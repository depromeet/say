import post from './post';
import auth from './auth';

export default function* rootSaga() {
  yield [
    post(),
    auth()
  ];
};
