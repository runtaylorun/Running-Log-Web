import React, { useState } from 'react'
import classes from '../../../CSS/Dashboard/Calendar.module.css'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import Moment from 'moment'
import CalendarFooter from './CalendarFooter'

const Calendar = () => {

    const [selectedMonth, setSelectedMonth] = useState(Moment().month())
    const [selectedYear, setSelectedYear] = useState(Moment().year())
    const [daysThisMonth, setDaysThisMonth] = useState(Moment().daysInMonth())
    console.log(daysThisMonth)

    const advanceMonthHandler = () => {
      setSelectedMonth(selectedMonth + 1)
      setDaysThisMonth(Moment().daysInMonth(selectedMonth + 1))
    }

    const decreaseMonthHandler = () => {
      setSelectedMonth(selectedMonth - 1)
      setDaysThisMonth(Moment().daysInMonth(selectedMonth - 1))
    }

        return (
<div className={classes.calendarContainer}>
    <CalendarHeader 
    selectedMonth={selectedMonth}
    advanceMonthHandler={advanceMonthHandler}
    decreaseMonthHandler={decreaseMonthHandler} 
    />
    <CalendarBody 
    daysThisMonth={daysThisMonth} 
    />
    <CalendarFooter />
  </div>
    )
  

    }

export default Calendar
