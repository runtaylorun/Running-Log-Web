import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import classes from './gear.module.css'

const BlankCard = () => {
	return (
		<div className={classes.blankCard}>
			<Link to="/gear/gearForm/0" ><Button size='large' icon='plus' /></Link>
		</div>
	)
}

export default BlankCard
