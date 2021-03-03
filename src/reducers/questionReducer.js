import { questionActionTypes } from '../actions/types';

const initialState = {
  questions: []
}

export default function reducer(state = initialState, action) {
  const payload = action.payload;
  
  switch(action.type) {
    case questionActionTypes.ADD_QUESTION:
      return {
        ...state,
        questions:[...state.questions, payload]
      };
    case questionActionTypes.REMOVE_LAST_QUESTION:
      return {
        ...state,
        questions:[...state.questions.slice(0, state.questions.length - 1)]
      };
    case questionActionTypes.CLEAR_QUESTIONS:
      return {
        ...state,
        questions:[]
      };
    default: 
      return state
  }
}
