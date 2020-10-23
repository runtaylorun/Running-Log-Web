import React from 'react'
import classes from '../../CSS/Dashboard/Dashboard.module.css'
import DashboardDay from './DashboardDay'
import Moment from 'moment'
import { getStartOfCurrentWeekISO, getDatesForCurrentWeek, formatDate } from '../../Lib/time'

const DashboardWeek = ({ activities }) => {
  console.log(activities)
  const generateWeek = () => {
    const containers = []
    const currentWeek = getStartOfCurrentWeekISO()
    for (let i = 0; i < 7; i++) {
      containers.push(
        <DashboardDay
          day={Moment(currentWeek).add(i, 'd').format('ddd')}
          activities={activities.filter(activity => activity.date === formatDate(Moment(currentWeek).add(i, 'd')))}
        />
      )
    }

    return containers
  }

  return (
    <div className={classes.weekContainer}>
      <div className={classes.weekHeader}>
        {getDatesForCurrentWeek().map(date => {
          return <h3 key={date}>{date}</h3>
        })}
      </div>
      <div className={classes.weekBody}>
        {generateWeek()}
      </div>
      <div className={classes.weekFooter}>
          <h2>Weekly Total</h2>
      </div>
    </div>
  )
}

export default DashboardWeek
