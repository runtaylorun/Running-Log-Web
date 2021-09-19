/* eslint-disable react/prop-types */
import React from 'react'
import classes from './dashboard.module.css'
import { shortenString } from '../../Lib/string'
import { useSelector } from 'react-redux'
import { getMileageTotal } from '../../Lib/mileage'
import { distanceUnits } from '../../Lib/conversions'
import { getUserMeasurementSystem } from '../../Redux/Reducers/selectors'
import { Link } from 'react-router-dom'

const Day = ({ day, activities, date }) => {
	const measurementSystem = useSelector(getUserMeasurementSystem)
	const mileageTotal = getMileageTotal(activities, measurementSystem)

	return (
		<div className={classes.day}>
			<div className={classes.dayDate}>
				<h3 style={{ fontWeight: 400 }}>{date}</h3>
				<h3 style={{ fontWeight: 400 }}>{day}</h3>
			</div>
			<div style={{ width: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '50%' }}>
				{activities?.map((activity) => (
					<div className={classes.activity} key={activity.id}>
						<a href={`/activityView/${activity.id}`}>{activity?.title?.length ? shortenString(activity?.title) : 'Activity'}</a>
					</div>
				))}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '25%', marginTop: 10 }}>
				<Link style={{ marginBottom: 5 }} to={'/activityForm/0'}>New</Link>
				<p style={{ fontSize: 20 }}>{`${mileageTotal ?? 0} ${distanceUnits[measurementSystem]}`}</p>
			</div>
		</div>
	)
}

export default Day
