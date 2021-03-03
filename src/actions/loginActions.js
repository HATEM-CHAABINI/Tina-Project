import * as types from './types/loginActionTypes';

export function initLogin() {
  return {
    type: types.LOGIN_INIT
  }
}

export function tryLogin({email, password}) {
  return {
    type: types.LOGIN_REQUEST,
    payload: { email, password }
  }
}

export function loginSuccess(credential) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: { credential }
  }
}

export function loginUpdateInfo(credential) {
  return {
    type: types.LOGIN_UPDATE_INFO,
    payload: { credential }
  }
}

export function loginCanceled() {
  return {
    type: types.LOGIN_CANCELED
  }
}

export function loginFailed(errorMessage) {
  return {
    type: types.LOGIN_FAILURE,
    payload: {
      statusMessage: errorMessage
    }
  }
}

export function clearMessage() {
  return {
    type: types.CLEAR_MESSAGE
  }
}

export function doLogout() {
  return {
    type: types.LOGOUT_DONE
  }
}

export function loadPrevState (prevState) {
  return {
    type: types.LOGIN_LOAD_PREV_STATE,
    payload: { prevState }
  }
}