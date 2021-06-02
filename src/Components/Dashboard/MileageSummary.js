import React from 'react'
import classes from './dashboard.module.css'
import { useSelector } from 'react-redux'
import { getUserMeasurementSystem } from '../../Redux/Reducers/selectors'
import { Line } from 'react-chartjs-2'
import { distanceUnits, convertToUserMeasurementSystem, roundTo2 } from '../../Lib/conversions'
import { getStartOfCurrentWeekISO, weeksFromCurrentDate, dateIsBetween } from '../../Lib/time'
const MileageSummary = ({ activities }) => {
  const measurementSystem = useSelector(getUserMeasurementSystem)

  const startOfWeek = getStartOfCurrentWeekISO().format('MM-DD')
  const getActivitiesForPastWeeks = (weeks) => {
    const activitiesByWeek = []

    for (let i = 0; i < weeks; i++) {
      activitiesByWeek.push(activities?.filter(activity => dateIsBetween(weeksFromCurrentDate(i), weeksFromCurrentDate(i, false), activity.date)))
    }

    return activitiesByWeek
  }

  const activitiesGrouped = getActivitiesForPastWeeks(5)

  const data = {
    labels: [weeksFromCurrentDate(4).format('MM-DD'), weeksFromCurrentDate(3).format('MM-DD'), weeksFromCurrentDate(2).format('MM-DD'), weeksFromCurrentDate(1).format('MM-DD'), startOfWeek],
    datasets: [
      {
        label: 'Weekly Milage',
        fill: false,
        lineTension: 0.5,
        borderColor: 'hsl(215, 100%, 50%)',
        pointRadius: 5,
        pointBorderColor: 'hsl(215, 100%, 50%)',
        pointBackgroundColor: 'hsl(215, 100%, 50%)',
        pointHitRadius: 10,
        data: activitiesGrouped.map(week => {
          return week.reduce((accumulator, activity) => {
            return accumulator + roundTo2(convertToUserMeasurementSystem(activity.distanceUnit, activity.distance, measurementSystem))
          }, 0)
        })
      }
    ]
  }

  return (
        <div className={classes.mileageContainer}>
            <h2>Mileage Past 5 Weeks</h2>
            <Line data={data} />
        </div>
  )
}

export default MileageSummary
