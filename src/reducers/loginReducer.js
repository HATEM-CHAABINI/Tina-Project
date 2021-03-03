import { loginActionTypes } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  statusMessage: '',
  credential: null,
}

export default function reducer(state = initialState, action) {
  const payload = action.payload;
  switch(action.type) {
    case loginActionTypes.LOGIN_INIT:
      return {
        ...initialState
      };
    case loginActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case loginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        credential: payload.credential
      };
    case loginActionTypes.LOGIN_UPDATE_INFO:
      return {
        ...state,
        credential: payload.credential
      };
    case loginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusMessage: payload.statusMessage
      };
    case loginActionTypes.LOGIN_CANCELED:
        return {
          ...state,
          isFetching: false,
          statusMessage: ''
        };
    case loginActionTypes.LOGOUT_DONE:
      return {
        ...state,
        isAuthenticated: false,
        credential: null
      };
    case loginActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        statusMessage: ''
      };
    case loginActionTypes.LOGIN_LOAD_PREV_STATE:
      return {
        ...action.payload.prevState
      }
    default: 
      return state
  }
}
