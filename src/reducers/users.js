import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }

      case ADD_QUESTION :
        return {
          ...state,
          [action.question.id]: action.question,
          [action.authedUser] : {
            ...state[action.authedUser],
            questions : [
                ...state[action.authedUser].questions,
                action.question.id
            ]
        }
      }
      
      case ADD_QUESTION_ANSWER:
        return {
            ...state,
            [action.authedUser] : {
                ...state[action.authedUser],
                answers : {
                    ...state[action.authedUser].answers,
                    [action.question_id] : action.answer
                }
            }
    }
    default :
      return state
  }
}