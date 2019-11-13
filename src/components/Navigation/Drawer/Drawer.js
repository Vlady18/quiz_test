import React, {Component} from 'react'
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'



class Drawer extends Component{
	clickHandler = () =>{
		this.props.onClose()
	}

	renderLinks(links){
		return links.map((link, index) =>{
			return(
			<li key={index}>
				<NavLink
					to={link.to} 
					exact={link.exact}
					activeClassName={classes.active}
					onClick={this.clickHandler}
				>
					{link.label}
				</NavLink>
			</li>
			)
		})
	}
	// overlayHand(){
	// 	!this.props.isOpen
	// }
	render(){
	const cls = [classes.Drawer]
	if(!this.props.isOpen){
		cls.push(classes.close)
	}
	const links = [
		{label: 'Список', to: '/', exact: true},		
		]
	if(this.props.isAutenticated){
		links.push({label: 'Создание теста', to: '/quiz-creator', exact: false})
		links.push({label: 'Выйти', to: '/logout', exact: false})
	} else{
		links.push({label: 'Авторизация', to: '/auth', exact: false})
	}
		return(
		<React.Fragment>
			<nav className={cls.join(' ')}>
				<ul>
					{this.renderLinks(links)}
				</ul>
			</nav>
			{this.props.isOpen? <Backdrop onClose={this.props.onClose} /> : null}
		</React.Fragment>
		)
	}
}

export default Drawer