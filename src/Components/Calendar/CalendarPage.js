import React, { useState } from 'react'
import Moment from 'moment'
import Calendar from './Calendar'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import CalendarFooter from './CalendarFooter'
import classes from './calendar.module.css'
import useActivities from '../../Hooks/useActivities'

const CalendarPage = (props) => {
	const [selectedMonth, setSelectedMonth] = useState(Moment().month())
	const [selectedYear, setSelectedYear] = useState(Moment().year())
	const [selectedDate, setSelectedDate] = useState(Moment())
	const [daysThisMonth, setDaysThisMonth] = useState(Moment().daysInMonth())
	const [activities] = useActivities({ month: selectedMonth + 1, year: selectedYear })

	const increaseMonthHandler = () => {
		const forwardOneMonth = Moment(selectedDate).add(1, 'M')
		updateDates(forwardOneMonth)
	}

	const decreaseMonthHandler = () => {
		const backOneMonth = Moment(selectedDate).subtract(1, 'M')
		updateDates(backOneMonth)
	}

	const updateDates = (updatedDate) => {
		setSelectedDate(updatedDate)
		setSelectedMonth(Moment(updatedDate).month())
		setSelectedYear(Moment(updatedDate).year())
		setDaysThisMonth(Moment(updatedDate).daysInMonth())
	}

	return (
		<div className={classes.calendarPage} >
			<Calendar>
				<CalendarHeader
					selectedMonth={selectedMonth}
					selectedYear={selectedYear}
					advanceMonthHandler={increaseMonthHandler}
					decreaseMonthHandler={decreaseMonthHandler}
				/>
				<CalendarBody
					daysThisMonth={daysThisMonth}
					startingDay={Moment([selectedYear, selectedMonth]).day()}
					previousEndingDay={Moment(selectedDate).subtract(1, 'M').daysInMonth()}
					currentMonth={selectedMonth}
					currentYear={selectedYear}
					userActivities={activities}
				/>
				<CalendarFooter activities={activities} />
			</Calendar>
		</div>
	)
}

export default CalendarPage
