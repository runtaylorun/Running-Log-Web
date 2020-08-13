import React from 'react'
import classes from '../../CSS/Dashboard/Dashboard.module.css'
import Day from './Day'
import Moment from 'moment'
import { getStartOfCurrentWeekISO, getDatesForCurrentWeek } from '../../Lib/time'

const DashboardWeek = () => {
  const generateWeek = () => {
    const containers = []
    const currentWeek = getStartOfCurrentWeekISO()
    for (let i = 0; i < 7; i++) {
      containers.push(<Day day={Moment(currentWeek).add(i, 'd').format('ddd')} />)
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
    </div>
  )
}

export default DashboardWeek
