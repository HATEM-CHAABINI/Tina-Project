import { appActionTypes } from '../actions/types';
import { LOAD, SAVE } from 'redux-storage';

export const initialState = {
  isFirstOpen: true,
  globalNotification: {
    message: null,
    type: 'success',
    duration: 4000
  },
  loaded: false,
  lat: "",
  lng: "",
  onesignal: null,
  adMobId: null,
  evaluated: false,
  advertisements: []
};

export default function AppStateReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case appActionTypes.SET_FIRST_OPEN:
      return {
        ...state,
        isFirstOpen: false,
      };
    case appActionTypes.SET_GLOBAL_NOTIFICATION:
      return {
        ...state,
        globalNotification: {
          message: action.payload.message,
          type: action.payload.type,
          duration: action.payload.duration ? action.payload.duration : 4000
        }
      }
    case appActionTypes.SET_GEOLOCATION:
      return{
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng
      }
    case appActionTypes.SET_PUSH_NOTIFICATION_IDS:
      return {
        ...state,
        onesignal: action.payload.onesignal
      }
    case appActionTypes.SET_ADMOB_ID:
      return {
        ...state,
        adMobId: action.payload.adMobId
      }
    case appActionTypes.SET_ADVERTISEMENTS:
      return {
        ...state,
        advertisements: action.payload.advertisements
      }
    case appActionTypes.SET_EVALUATED:
      return {
        ...state,
        evaluated: action.payload.evaluated
      }    
    case LOAD:
      console.log('==== LOAD: ', state);
      return { ...state, loaded: true };
    default:
      return state;
  }
}
