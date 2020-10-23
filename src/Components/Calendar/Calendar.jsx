import React from 'react'
import classes from '../../CSS/Dashboard/Calendar.module.css'

const Calendar = ({ children }) => {
  return (
    <div className={classes.calendarContainer}>
      {children}
    </div>
  )
}

export default Calendar
