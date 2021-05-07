import React from 'react'
// import PageLoader from '../Shared/PageLoader'
import classes from './calendar.module.css'

const Calendar = ({ children }) => {
  return (
    <div className={classes.calendarContainer}>
        {children}
    </div>
  )
}

export default Calendar
