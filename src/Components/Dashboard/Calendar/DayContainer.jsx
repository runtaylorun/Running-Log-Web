import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../../../CSS/Dashboard/Calendar.module.css';

const DayContainer = ({ day = '', nextMonth = false }) => {
	const [showAddButton, setShowAddButton] = useState(false);

	return (
		<div
			onMouseOut={() => setShowAddButton(false)}
			onMouseOver={() => setShowAddButton(true)}
			className={classes.dayContainer}
		>
			<div style={{ width: '100%' }}>
				<h4 style={{ color: nextMonth ? '#a1a1a1' : 'black', textAlign: 'left' }}>{day}</h4>
			</div>
			<div>
				<h2>9 mi</h2>
			</div>
			<div style={{ display: 'flex' }}>
				<button style={{ marginBottom: 8, cursor: 'pointer', visibility: showAddButton ? 'visible' : 'hidden' }}>
					<Link to='/activityForm'>+</Link>
				</button>
			</div>
		</div>
	);
};

export default DayContainer;
