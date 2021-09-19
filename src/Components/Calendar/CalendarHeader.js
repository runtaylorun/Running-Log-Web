/* eslint-disable react/prop-types */
import React from 'react'
import Moment from 'moment'
import { Icon } from 'semantic-ui-react'
import classes from './calendar.module.css'
const CalendarHeader = ({ selectedMonth, selectedYear, advanceMonthHandler, decreaseMonthHandler }) => {
	return (
		<div className={classes.calendarHeaderContainer}>
			<div className={classes.calendarDateHeader}>
				<Icon
					onClick={decreaseMonthHandler}
					style={{ marginRight: 10, cursor: 'pointer' }}
					name='arrow left'
					size='large'
				/>
				<h2>
					{Moment().month(selectedMonth).format('MMMM')} {Moment().year(selectedYear).format('YYYY')}
				</h2>
				<Icon
					onClick={advanceMonthHandler}
					style={{ marginLeft: 10, cursor: 'pointer' }}
					name='arrow right'
					size='large'
				/>
			</div>
			<div className={classes.calendarDaysHeader}>
				<h3>Monday</h3>
				<h3>Tuesday</h3>
				<h3>Wednesday</h3>
				<h3>Thursday</h3>
				<h3>Friday</h3>
				<h3>Saturday</h3>
				<h3>Sunday</h3>
				<h3>Weekly Total</h3>
			</div>
		</div>
	)
}

export default CalendarHeader
