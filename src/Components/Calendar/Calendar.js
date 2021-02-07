import React from 'react'
import PageLoader from '../Shared/PageLoader'
import classes from './calendar.module.css'

const Calendar = ({ children, loading }) => {
  return (
    <div className={classes.calendarContainer}>
      {loading
        ? <PageLoader label='Loading Calendar...' />
        : children
      }
    </div>
  )
}

export default Calendar
