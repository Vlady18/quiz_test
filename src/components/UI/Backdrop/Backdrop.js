import React from 'react'
import classes from './Backdrop.css'

const Backdrop = (props) => {

	return(
	<div
		className={classes.Backdrop}
		onClick={props.onClose}
	/>
	)
} 

export default Backdrop