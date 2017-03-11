import { combineReducers } from 'redux';
import post from './post';
import auth from './auth';

const reducers = combineReducers({
	postReducer: post,
  authReducer: auth
})

export default reducers;
