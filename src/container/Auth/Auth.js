import React, {Component} from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'

class Auth extends Component{
	state = {
		isFormValid: false,
		formControls: {
			email:{
				label: 'Email',
				value: '',
				type: 'email',
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				label: 'Пароль',
				value: '',
				type: 'password',
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	}
	loginHandler = () =>{
		this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
		// const authdate = {
		// 	email: this.state.formControls.email.value,
		// 	password: this.state.formControls.password.value,
		// 	returnSecureToken: true
		// }
		// try {
		// 	const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA_drMp3Mz5Pk37Tuxe2E9P3d3V2TmBWHI', authdate)
		// 	console.log(response.data)
		// } catch(e) {
		// 	console.log(e);
		// }
	}
	registrHandler = () =>{
		this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)
		// const authdate = {
		// 	email: this.state.formControls.email.value,
		// 	password: this.state.formControls.password.value,
		// 	returnSecureToken: true
		// }
		// try {
		// 	const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA_drMp3Mz5Pk37Tuxe2E9P3d3V2TmBWHI', authdate)
		// 	console.log(response.data)
		// } catch(e) {
		// 	console.log(e);
		// }
	}
	submitHandler = (event) =>{
		event.preventDefault()
	}

	
	validateControl = (value, validation) => {
		if(!validation){
			return true
		}
		let isValid = true
		if(validation.required){
			isValid = value.trim() !== '' && isValid
		}
		if(validation.email){
			isValid = is.email(value) && isValid
		}
		if(validation.minLength){
			isValid = value.trim().length >= 6 && isValid
		}
		return isValid
	}
	onChangeHandler(event, controlName){
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }
		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({
			formControls: formControls,
			isFormValid: isFormValid
		})

	}
	renderInputs = () => {
			const inputs = Object.keys(this.state.formControls).map((controlName, index)=>{
			const control = this.state.formControls[controlName]
			// console.log(controlName)
			// console.log(control)
			return(
				<Input
					key={controlName + index}
					label={control.label}
					type={control.type}
					value={control.value}
					touched={control.touched}
					valid={control.valid}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={(event) => this.onChangeHandler(event, controlName)}
				/>
				)
			})
			return inputs
		}
	render(){
		return(
		<div className={classes.Auth}>
			<div>
				<h1>Авторизация</h1>
				<form onSubmit={this.submitHandler} className={classes.AuthForm}>
					{this.renderInputs()}		
					<Button type='success'
					disabled={!this.state.isFormValid}
					onClick={this.loginHandler}>Войти</Button>
					<Button type='primary'
					disabled={!this.state.isFormValid}
					onClick={this.registrHandler}>Зарегестрироваться</Button>
				</form>
			</div>
		</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return{
		auth: (email, password, isLogin) =>{dispatch(auth(email, password, isLogin))}
	}
}

export default connect(null, mapDispatchToProps)(Auth)