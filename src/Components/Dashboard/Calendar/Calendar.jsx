import React, { useState } from 'react'
import classes from '../../../CSS/Dashboard/Calendar.module.css'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import Moment from 'moment'
import CalendarFooter from './CalendarFooter'

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(Moment().month())
  const [selectedYear, setSelectedYear] = useState(Moment().year())
  const [selectedDate, setSelectedDate] = useState(Moment())
  const [daysThisMonth, setDaysThisMonth] = useState(Moment().daysInMonth())

  const advanceMonthHandler = () => {
    const newDate = Moment(selectedDate).add(1, 'M')

    updateDates(newDate)
  }

  const decreaseMonthHandler = () => {
    const newDate = Moment(selectedDate).subtract(1, 'M')

    updateDates(newDate)
  }

  const updateDates = (newDate) => {
    setSelectedDate(newDate)
    setSelectedMonth(Moment(newDate).month())
    setSelectedYear(Moment(newDate).year())
    setDaysThisMonth(Moment(newDate).daysInMonth())
  }

  return (
    <div className={classes.calendarContainer}>
      <CalendarHeader
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        advanceMonthHandler={advanceMonthHandler}
        decreaseMonthHandler={decreaseMonthHandler}
      />
      <CalendarBody
        daysThisMonth={daysThisMonth}
        startingDay={Moment([selectedYear, selectedMonth]).day()}
        previousEndingDay={Moment(selectedDate).subtract(1, 'M').daysInMonth()}
      />
      <CalendarFooter />
    </div>
  )
}

export default Calendar
