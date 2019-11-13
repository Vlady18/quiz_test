import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'
import Loader from '../../components/UI/Loader/Loader'
class Quiz extends React.Component{
	
	// isQuizFinished(){
	// 	return this.state.activeQuestion + 1 === this.state.quiz.length
	// }

	// repeatHand(){ 
	// 	this.setState({
	// 		activeQuestion: 0,
	// 		isFinished: false,
	// 		results: {},
	// 		answerState: null
	// 	})
	// }
	componentDidMount(){
		this.props.fetchQuizById(this.props.match.params.id)
	}
	componentWillUnmount(){
		this.props.retryQuiz()
	}
	render(){
		return(
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопроссы !</h1>
					{
					this.props.loading || !this.props.quiz
					? <Loader />
					: 	this.props.isFinished
						? <FinishedQuiz
							results={this.props.results}
							quiz={this.props.quiz}
							repeatHand={this.props.retryQuiz.bind(this)}
						  />
						: <ActiveQuiz 
							answers={this.props.quiz[this.props.activeQuestion].answers}
							question={this.props.quiz[this.props.activeQuestion].question}
							onAnswerClick={this.props.quizAnswerClick}
							quizLength={this.props.quiz.length}
							activeQuestion={this.props.activeQuestion + 1}
							answerState={this.props.answerState}
							/>
					}
					
					
				</div>
			</div>
		)
	}
} 

function mapStateToProps(state){
	return{
		activeQuestion: state.quiz.activeQuestion,
		isFinished: state.quiz.isFinished,
		loading: state.quiz.loading,
		results: state.quiz.results, /*[id]: 'success' 'error'*/
		answerState: state.quiz.answerState, /*[id]: 'success' 'error'*/
		quiz: state.quiz.quiz
	}
}

function mapDispatchToProps(dispatch){
	return{
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: ()=> dispatch(retryQuiz())

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz) 