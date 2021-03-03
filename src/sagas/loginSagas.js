import { put, takeLatest, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { loginActionTypes } from '../actions/types';
import { loginInWithEmailPassword } from '../common/firebase/auth';
import { AppActions, LoginActions } from '../actions';
import { getCurrentUserInfo } from '../common/firebase/database';

const { setGlobalNotification } = AppActions;
const { loginSuccess, loginFailed } = LoginActions;

export default function* watcher() {
  yield takeLatest(loginActionTypes.LOGIN_REQUEST, LoginWithEmail);
  yield takeLatest(loginActionTypes.LOGIN_SUCCESS, processLoginSuccess);
}

function* LoginWithEmail(action) {
  const {email, password} = action.payload;
  const res = yield call(loginInWithEmailPassword,{email, password});
  console.log('===== res: ', res);
  if (res.error) {
    yield put(loginFailed(res.error));
    yield put(setGlobalNotification({
      message: res.error,
      type: 'danger',
      duration: 6000
    }));
    return;
  }
  const _user = yield call(getCurrentUserInfo);
  console.log('===== current user info:', _user);
  yield put(loginSuccess({...res.credential, _user}));
}

export function* processLoginSuccess() {
  Actions.reset('home')
}