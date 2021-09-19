/* eslint-disable react/prop-types */
import React from 'react'
import classes from './dashboard.module.css'

import Moment from 'moment'

const OffDaySummary = ({ offDay }) => {
	const calculateOffDay = () => {
		const currentDate = Moment()
		const diffInDays = currentDate.diff(offDay?.date, 'days')

		return diffInDays
	}
	return (
		<div className={classes.offDayContainer}>
			<div className={classes.offDayHeader}>
				<h1>Off Day Tracker</h1>
			</div>
			<div className={classes.offDayBody}>
				<p><span>{calculateOffDay()}</span>{' days since last off day'}</p>
			</div>
		</div>
	)
}

export default OffDaySummary
