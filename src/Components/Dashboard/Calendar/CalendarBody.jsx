import React from 'react'
import DayContainer from './DayContainer'
import { formatDate, getStartOfCurrentWeekISO, getEndOfCurrentWeekISO, toISO, dateIsBefore, dateIsAfter } from '../../../Lib/time'
import classes from '../../../CSS/Dashboard/Calendar.module.css'

const CalendarBody = ({ daysThisMonth, startingDay, previousEndingDay, currentMonth, currentYear, userActivities }) => {
  const maxDaysOnCalendar = 42
  let endOfWeek = 0
  const generateDayContainers = () => {
    const containers = []

    if (startingDay !== 0) {
      for (let i = startingDay - 2; i >= 0; i--) {
        containers.push(<DayContainer nextMonth day={previousEndingDay - i} />)
        endOfWeek++
      }
    }

    for (let i = 1; i <= daysThisMonth; i++) {
      endOfWeek++
      containers.push(<DayContainer
        year={currentYear}
        month={currentMonth + 1}
        day={i}
        activities={userActivities.filter(activity => activity.date === formatDate(`${currentYear}-${currentMonth + 1}-${i}`))}/>)

      if (endOfWeek % 7 === 0) {
        const startOfWeekDate = getStartOfCurrentWeekISO(formatDate(`${currentYear}-${currentMonth + 1}-${i}`))
        const endOfWeekDate = getEndOfCurrentWeekISO(formatDate(`${currentYear}-${currentMonth + 1}-${i}`))
        console.log(userActivities)

        containers.push(<DayContainer day={endOfWeek / 7} weeklyBreakdown activities={userActivities.filter(activity => dateIsAfter(activity.date, startOfWeekDate) && dateIsBefore(activity.date, endOfWeekDate))} />)
      }
    }

    if (daysThisMonth < 35) {
      for (let i = 1; i <= maxDaysOnCalendar - (daysThisMonth + (startingDay - 1)); i++) {
        containers.push(<DayContainer nextMonth day={i} />)
        endOfWeek++
        if (endOfWeek % 7 === 0) {
          containers.push(<DayContainer day={endOfWeek / 7} weeklyBreakdown />)
        }
      }
    }

    return containers
  }
  return <div className={classes.calendarBodyContainer}>{generateDayContainers()}</div>
}

export default CalendarBody
