import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'
import {connect} from 'react-redux'
function createOptionControl(number){
	return createControl({
				label: `Вариант ${number}`,
				errorMessage: 'Значение не может быть пустым',
				id: number
			}, {required: true})
}

function createFormControls(){
	return {
			question: createControl({
				label: 'Введите вопрос',
				errorMessage: 'Вопрос не может быть пустым'
			}, {required: true}),
			option1: createOptionControl(1),
			option2: createOptionControl(2),
			option3: createOptionControl(3),
			option4: createOptionControl(4)
		}
}
class QuizCreator extends Component{
	state={
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	}
	submitHandler = ( event )=> {
		event.preventDefault()
	}

	changeHandler(value, controlName){
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.touched = true
		control.value = value
		control.valid = validate(control.value, control.validation)

		formControls[controlName] = control

		this.setState({
			formControls: formControls,
			isFormValid: validateForm(formControls)
		})
		
	}
	createQuizhandler = (event)=>{
		// event.preventDefault()
		// axios.post('https://react-quiz-2a9c7.firebaseio.com/quizes.json', this.state.quiz)
		// .then(response =>{
		// 	console.log(response)
		// })
		// .catch(error => console.log(error))
		
			
			this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})
			this.props.finishCreateQuiz()	
	}
	addQuestionHandler = (event) =>{

		const {question, option1, option2, option3, option4} = this.state.formControls
		const questionItem = {
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{text: option1.value, id: option1.id},
				{text: option2.value, id: option2.id},
				{text: option3.value, id: option3.id},
				{text: option4.value, id: option4.id}
			],
		}
		this.props.createQuizQuestion(questionItem)

		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})
	}
	renderControls(){
		return (
			Object.keys(this.state.formControls).map((controlName, index)=>{
			const control = this.state.formControls[controlName]
			// console.log(controlName)
			return (
				<React.Fragment
				key={controlName + index}
				>
					<Input
						key={controlName + index}
						label={control.label}
						valid={control.valid}
						value={control.value}
						errorMessage={control.errorMessage}
						touched={control.touched}
						shouldValidate={!!control.validation}
						onChange={event => this.changeHandler(event.target.value, controlName)}
					/>
					{ index === 0 ? <hr/> : null }
					</React.Fragment>
				)
		})
		)
	}

	selectChangeHandler=(event)=>{
		this.setState({
			rightAnswerId: +event.target.value
		})
	}

	render(){

		const select = 
		<Select
			label='Выберите правильный ответ'
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={[
				{text: "1", value: 1},
				{text: "2", value: 2},
				{text: "3", value: 3},
				{text: "4", value: 4}
			]}
		/>
		return(
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создать тест</h1>
					<form onSubmit={this.submitHandler}>
						{ this.renderControls() }
						{select}
						<Button
							type="primary" 
							onClick={this.addQuestionHandler} 
							disabled={!this.state.isFormValid}
						>
							Добавить вопрос
						</Button>
						<Button 
							type='success' 
							onClick={this.createQuizhandler} 
							disabled={this.props.quiz.length === 0}
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
	return{
		quiz: state.create.quiz
	}
}
function mapDispatchToProps(dispatch){
	return{
		createQuizQuestion: item => {dispatch(createQuizQuestion(item))},
		finishCreateQuiz: () => {dispatch(finishCreateQuiz())}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)