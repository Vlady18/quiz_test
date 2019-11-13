import React from 'react'
import classes from './ActiveQuiz.css'
import AnswerList from './AnswerList/AnswerList'
const ActiveQuiz = (props) =>{
	return(
		<div className={classes.ActiveQuiz}>
			<h4 className={classes.Question}>
				<span>
					<strong>{props.activeQuestion} </strong>
					{props.question}
				</span>
				<small>{props.activeQuestion} из {props.quizLength}</small>
			</h4>
			<AnswerList 
				answers={props.answers}
				onAnswerClick={props.onAnswerClick}
				answerState={props.answerState}
			/>	
		</div>

	)
}
export default ActiveQuiz