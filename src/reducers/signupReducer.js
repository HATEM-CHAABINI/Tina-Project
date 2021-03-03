import { signupActionTypes } from '../actions/types';

const initialState = {
  isFetching: false,
  statusMessage: '',
  statusMessageType: '',
  signupInfo: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case signupActionTypes.SIGNUP_INIT:
      return {
        ...initialState,
        isFetching: false
      }
    case signupActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case signupActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        statusMessage: action.payload.statusMessage,
        statusMessageType: 'success'
      }
    case signupActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusMessage: action.payload.statusMessage,
        statusMessageType: 'danger'
      }
    case signupActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        statusMessage: ''
      }
    default: 
      return state
  }
}
