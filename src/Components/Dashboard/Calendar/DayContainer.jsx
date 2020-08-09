import React from 'react';
import classes from '../../../CSS/Dashboard/Calendar.module.css';

const DayContainer = ({ day = '', nextMonth = false }) => {
	return (
		<div className={classes.dayContainer}>
			<h4 style={{ color: nextMonth ? '#a1a1a1' : 'black' }}>{day}</h4>
		</div>
	);
};

export default DayContainer;
