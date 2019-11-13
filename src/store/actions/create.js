import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATOR} from './actionTypes'
import axios from 'axios'
export function createQuizQuestion(item) {
	return{
		type: CREATE_QUIZ_QUESTION,
		item
	}
}
export function resetQuizCreator(){
	return{
		type: RESET_QUIZ_CREATOR,

	}
}
export function finishCreateQuiz(){
	return async (dispatch, getState) =>{
		await axios.post('https://react-quiz-2a9c7.firebaseio.com/quizes.json', getState().create.quiz)
		dispatch(resetQuizCreator())
	}
}