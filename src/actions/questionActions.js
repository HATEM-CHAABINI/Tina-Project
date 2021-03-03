import * as types from './types/questionActionTypes';

export function addQuestion({qid, title, answerId, answerText}) {
  return {
    type: types.ADD_QUESTION,
    payload:{qid, title, answerId, answerText}
  }
}

export function removeLastQuestion(){
  return{
    type: types.REMOVE_LAST_QUESTION
  }
}

export function clearQuestions() {
  return {
    type: types.CLEAR_QUESTIONS
  }
}
