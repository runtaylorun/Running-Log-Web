/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Progress, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { formatDateMMDD } from '../../Lib/time'
import { useWindowDimensions } from '../../Hooks/useWindowDimensions'
import classes from './gear.module.css'

const GearCard = ({ gear, size, showOptions, removeable, retirable, editable, onRemove, onRetire }) => {
	const { width } = useWindowDimensions()
	const removeHandler = (e) => {
		onRemove(e, gear)
	}

	const retireHandler = (e) => {
		onRetire(e, gear)
	}

	return (
		<div className={classes.card}>
			{showOptions &&
			<Dropdown className={classes.options} icon='ellipsis horizontal' >
				<Dropdown.Menu>
					{editable && <Dropdown.Item><Link style={{ color: 'black' }} to={`/gear/gearForm/${gear.id}`}>Edit</Link></Dropdown.Item>}
					{retirable && <Dropdown.Item onClick={retireHandler} text={gear?.dateRetired ? 'Return to Action' : 'Retire'} />}
					{removeable && <Dropdown.Item onClick={removeHandler} text='Remove' />}
				</Dropdown.Menu>
			</Dropdown>}

			<div className={classes.cardIconContainer} style={{}}>
				<Icon circular color='blue' size={width < 576 ? 'large' : 'big'} name='heartbeat' />
			</div>
			<div className={classes.cardDetailsContainer}>
				<p>{`${gear.brand} ${gear.model}`}</p>
				<p>{gear.colorway}</p>
				<p>{formatDateMMDD(gear?.dateAdded)} - Current</p>
			</div>
			<div className={classes.cardProgressContainer}>
				<Progress className={classes.progress} size='medium' value={gear.miles} total={gear.maxMiles} label={`${gear.miles} / ${gear.maxMiles} Mi`} />
			</div>
		</div>
	)
}

GearCard.propTypes = {
	gear: PropTypes.object
}

export default GearCard
