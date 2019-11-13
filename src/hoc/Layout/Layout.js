import React,{Component} from 'react'
import classes from './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux' 

class Layout extends Component{
	state={
		menu: false
	}
	toggleMenuHandler = () => {
		this.setState({
			menu: !this.state.menu
		})
	}
	onCloseHandler = () =>{
		this.setState({
			menu: false
		})
	}
	render(){

	return(
		<div className={classes.Layout}>
			<Drawer
				isOpen={this.state.menu}
				onClose={this.onCloseHandler}
				isAutenticated={this.props.isAutenticated}
			/>
			<MenuToggle
				isOpen={this.state.menu}
				onToggle={this.toggleMenuHandler}
			/>
			<main>
				{this.props.children}
			</main>	
		</div>
	)	
	}
}

function mapStateToProps(state){
	return{
		isAutenticated: !!state.auth.token
	}
}
export default connect(mapStateToProps)(Layout)