import React from 'react'
import classes from './dashboard.module.css'
import DashboardDay from './DashboardDay'
import Moment from 'moment'
import { getStartOfCurrentWeekISO, getDatesForCurrentWeek, formatDateDDMM } from '../../Lib/time'

const DashboardWeek = ({ activities }) => {
  const generateWeek = () => {
    const containers = []
    const currentWeek = getStartOfCurrentWeekISO()
    const dates = getDatesForCurrentWeek()
    for (let i = 0; i < 7; i++) {
      containers.push(
        <DashboardDay
          date={dates[i]}
          day={Moment(currentWeek).add(i, 'd').format('ddd')}
          activities={activities.filter(activity => activity.date === formatDateDDMM(Moment(currentWeek).add(i, 'd')))}
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
        <h2>{`Weekly Total: ${activities.reduce((accumulator, activity) => { return accumulator + activity.distance }, 0)} Mi`}</h2>
      </div>
    </div>
  )
}

export default DashboardWeek
