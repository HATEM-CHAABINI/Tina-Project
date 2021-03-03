import * as types from './types/signupActionTypes';

export function initSignup() {
  return {
    type: types.SIGNUP_INIT
  }
}

export function trySignup(signupInfo) {
  return {
    type: types.SIGNUP_REQUEST,
    payload: { signupInfo }
  }
}

export function signUpSuccess() {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: { statusMessage: 'Signup success.' }
  }
}

export function signUpFailed(errorMessage) {
  return {
    type: types.SIGNUP_FAILURE,
    payload: { statusMessage: errorMessage }
  }
}

export function clearMessage() {
  return {
    type: types.CLEAR_MESSAGE
  }
}