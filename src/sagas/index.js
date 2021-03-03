import { all } from 'redux-saga/effects'
import signup from './signupSagas';
import login from './loginSagas';

export default function* root() {
  yield all([
    login(),
    signup()
  ])
}
