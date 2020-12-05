import React from 'react'
import { Loader, Dimmer, Segment } from 'semantic-ui-react'
import classes from '../../CSS/Dashboard/Calendar.module.css'

const Calendar = ({ children, loading }) => {
  return (
    <div className={classes.calendarContainer}>
      {loading
        ? <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}><Loader active inline='centered' size='large'>Loading Calendar</Loader></div>
        : children
      }
    </div>
  )
}

export default Calendar
