import React, { useState, useEffect } from 'react'
import Moment from 'moment'
import Calendar from './Calendar'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import CalendarFooter from './CalendarFooter'
import { getActivities } from '../../Services/activities'
import classes from './calendar.module.css'

const CalendarPage = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(Moment().month())
  const [selectedYear, setSelectedYear] = useState(Moment().year())
  const [selectedDate, setSelectedDate] = useState(Moment())
  const [daysThisMonth, setDaysThisMonth] = useState(Moment().daysInMonth())
  const [userActivities, setUserActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const pageLoad = async () => {
      const params = {
        month: selectedMonth + 1,
        year: selectedYear
      }
      const results = await getActivities(params)

      if (results) {
        setUserActivities([...results.data])
        setIsLoading(false)
      }
    }
    pageLoad()
  }, [selectedMonth])

  const increaseMonthHandler = () => {
    const forwardOneMonth = Moment(selectedDate).add(1, 'M')
    setIsLoading(true)
    updateDates(forwardOneMonth)
  }

  const decreaseMonthHandler = () => {
    const backOneMonth = Moment(selectedDate).subtract(1, 'M')
    setIsLoading(true)
    updateDates(backOneMonth)
  }

  const updateDates = (updatedDate) => {
    setSelectedDate(updatedDate)
    setSelectedMonth(Moment(updatedDate).month())
    setSelectedYear(Moment(updatedDate).year())
    setDaysThisMonth(Moment(updatedDate).daysInMonth())
  }

  return (
    <div className={classes.calendarPage} >
      <Calendar loading={isLoading}>
        <CalendarHeader
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          advanceMonthHandler={increaseMonthHandler}
          decreaseMonthHandler={decreaseMonthHandler}
        />
        <CalendarBody
          daysThisMonth={daysThisMonth}
          startingDay={Moment([selectedYear, selectedMonth]).day()}
          previousEndingDay={Moment(selectedDate).subtract(1, 'M').daysInMonth()}
          currentMonth={selectedMonth}
          currentYear={selectedYear}
          userActivities={userActivities}
        />
        <CalendarFooter />
      </Calendar>
    </div>
  )
}

export default CalendarPage
