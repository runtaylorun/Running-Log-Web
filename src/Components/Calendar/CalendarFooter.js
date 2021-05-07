import React from 'react'
import { useSelector } from 'react-redux'
import { getUserMeasurementSystem } from '../../Redux/Reducers/selectors'
import { getMileageTotal } from '../../Lib/mileage'
import { distanceUnits } from '../../Lib/conversions'
import classes from './calendar.module.css'

const CalendarFooter = ({ activities }) => {
  const measurementSystem = useSelector(getUserMeasurementSystem)

  const mileageTotal = getMileageTotal(activities, measurementSystem)

  return (
		<div className={classes.calendarFooter}>
			<h2>Monthly Total: </h2>
			<h2>{`${mileageTotal ?? 0} ${distanceUnits[measurementSystem]}`}</h2>
		</div>
  )
}

export default CalendarFooter
