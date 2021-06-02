import React from 'react'
import classes from './dashboard.module.css'
import DashboardDay from './DashboardDay'
import { useSelector } from 'react-redux'
import { getUserMeasurementSystem } from '../../Redux/Reducers/selectors'
import { getMileageTotal } from '../../Lib/mileage'
import { distanceUnits } from '../../Lib/conversions'
import Moment from 'moment'
import { getStartOfCurrentWeekISO, getDatesForCurrentWeek, formatDateMMDD } from '../../Lib/time'

const DashboardWeek = ({ activities }) => {
  const measurementSystem = useSelector(getUserMeasurementSystem)
  const mileageTotal = getMileageTotal(activities, measurementSystem)

  const generateWeek = () => {
    const containers = []
    const currentWeek = getStartOfCurrentWeekISO()
    const dates = getDatesForCurrentWeek()
    for (let i = 0; i < 7; i++) {
      containers.push(
        <DashboardDay
          date={dates[i]}
          day={Moment(currentWeek).add(i, 'd').format('ddd')}
          activities={activities?.filter(activity => activity.date === formatDateMMDD(Moment(currentWeek).add(i, 'd')))}
        />
      )
    }

    return containers
  }

  return (
    <div className={classes.weekContainer}>
      <div className={classes.weekBody}>
        {generateWeek()}
      </div>
      <div className={classes.weekFooter}>
        <h2>{`${mileageTotal} ${distanceUnits[measurementSystem]} this week`}</h2>
      </div>
    </div>
  )
}

export default DashboardWeek
