import React from 'react';
import DayContainer from './DayContainer';
import classes from '../../../CSS/Dashboard/Calendar.module.css';

const CalendarBody = ({ daysThisMonth, startingDay, previousEndingDay }) => {
	const maxDaysOnCalendar = 42;
	const generateDayContainers = () => {
		let containers = [];
		console.log(previousEndingDay);

		if (startingDay !== 0) {
			for (let i = startingDay - 2; i >= 0; i--) {
				containers.push(<DayContainer nextMonth day={previousEndingDay - i} />);
			}
		}

		for (let i = 1; i <= daysThisMonth; i++) {
			containers.push(<DayContainer day={i} />);
		}

		if (daysThisMonth < 35) {
			for (let i = 1; i <= maxDaysOnCalendar - (daysThisMonth + (startingDay - 1)); i++) {
				containers.push(<DayContainer nextMonth day={i} />);
			}
		}

		return containers;
	};
	return <div className={classes.calendarBodyContainer}>{generateDayContainers()}</div>;
};

export default CalendarBody;
