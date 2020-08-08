import React from 'react'
import Moment from 'moment'
import {Icon} from 'semantic-ui-react'
import classes from '../../../CSS/Dashboard/Calendar.module.css'
const CalendarHeader = ({selectedMonth, advanceMonthHandler, decreaseMonthHandler}) => {

  
  return (
    <div className={classes.calendarHeader}>
      <Icon onClick={decreaseMonthHandler} style={{marginRight: 10, cursor: 'pointer'}} name='arrow left' size='large' />
      <h2>{Moment().month(selectedMonth).format("MMMM")}</h2>
      <Icon onClick={advanceMonthHandler} style={{marginLeft: 10, cursor: 'pointer'}} name='arrow right' size='large' />
    </div>
  )
  
  }

export default CalendarHeader
