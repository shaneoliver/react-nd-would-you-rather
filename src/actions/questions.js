import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

function addQuestion (question, authedUser) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
    .then((question) => dispatch(addQuestion(question, authedUser)))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}


export function addQuestionAnswer(authedUser, question_id, answer) {
  return {
      type: ADD_QUESTION_ANSWER,
      authedUser,
      question_id,
      answer
  }
}

export function handleAddQuestionAnswer({question_id, answer}) {
  return (dispatch, getState) => {
      const { authedUser } = getState();
      return saveQuestionAnswer({
          authedUser,
          question_id,
          answer
      })
      .then(() => dispatch(addQuestionAnswer(authedUser, question_id, answer)))
  }
}
