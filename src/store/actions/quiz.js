import axios from 'axios'
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY} from '../actions/actionTypes'
export function fetchQuizes () {
	return async (dispatch) =>{
		dispatch(fetchQuizesStart())
		try{
			const response = await axios.get('https://react-quiz-2a9c7.firebaseio.com/quizes.json')
			const quizes = []
			Object.keys(response.data).forEach((key, index) =>{
				quizes.push({
					id: key,
					name: `Тест № ${index + 1}`
				})
			})
			dispatch(fetchQuizesSuccess(quizes))
		} catch (e){
			dispatch(fetchQuizesError(e))
		}
	}
}
export function fetchQuizById(quizId){
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const response = await axios.get(`https://react-quiz-2a9c7.firebaseio.com/quizes/${quizId}.json`)
			const quiz = response.data
			dispatch(fetchQuizSuccess(quiz))
		} catch(e) {
			dispatch(fetchQuizesError(e))
		}
	}
}
export function fetchQuizesStart(){
	return{
		type: FETCH_QUIZES_START
	}
}
export function fetchQuizesSuccess(quizes){
	return{
		type: FETCH_QUIZES_SUCCESS,
		quizes: quizes
	}
}
export function fetchQuizesError(e){
	return{
		type: FETCH_QUIZES_ERROR,
		error: e
	}
}
export function fetchQuizSuccess(quiz){
	return{
		type: FETCH_QUIZ_SUCCESS,
		quiz: quiz
	}
}
export function quizSetState(answerState, results){
	return{
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
}
export function finishQuiz(){
	return{
		type: FINISH_QUIZ
	}
}

export function quizNextQuestion(number){
	return{
		type: QUIZ_NEXT_QUESTION,
		number
	}
}
export function quizAnswerClick(answerId){
	return (dispatch, getState) =>{
		const state = getState().quiz
		if(state.answerState){
			const key = Object.keys(state.answerState)[0]
			if (state.answerState[key] === 'success'){
				return
			}
		}
		const results = state.results
		// console.log('ansId:', answerId)
		const question = state.quiz[state.activeQuestion]

		if(question.rightAnswerId === answerId){
			if(!results[question.id]){
				results[question.id] = 'success'
			}
			dispatch(quizSetState(
				{[answerId]: 'success'},
				results: results
			))
			// this.setState({
			// 	answerState: {[answerId]: 'success'},
			// 	results: results
			// })
			
			const timeout = setTimeout(()=>{
				if(isQuizFinished(state)){
					dispatch(finishQuiz())
				} else{
					dispatch(quizNextQuestion(state.activeQuestion + 1))
					// this.setState({
					// 	activeQuestion: this.state.activeQuestion + 1,
					// 	answerState: null
					// })
				}
				clearTimeout(timeout)
			}, 400)
			
		} 
		else{
			results[question.id] = 'error'
			dispatch(quizSetState(
				{[answerId]: 'error'},
				results: results
			))
			// this.setState({
			// 	answerState: {[answerId]: 'error'},
			// 	results: results
			// })

		}	
	}
}
function isQuizFinished(state){
	return state.activeQuestion + 1 === state.quiz.length
}
export function retryQuiz(){
	return{
		type: QUIZ_RETRY
	}
}