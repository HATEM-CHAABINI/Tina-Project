import { combineReducers } from 'redux';
import app from './appReducer';
import auth from './loginReducer';
import signup from './signupReducer';
import question from './questionReducer';

export default combineReducers({
  app,
  auth,
  signup,
  question
});
