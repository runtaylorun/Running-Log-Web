import React from 'react'
import CalendarDay from './CalendarDay'
import { formatDateMMDD, getStartOfCurrentWeekISO, getEndOfCurrentWeekISO, dateIsBefore, dateIsAfter } from '../../Lib/time'
import classes from './calendar.module.css'

/*
  startingDay: day of week integer code for the day of the week that starts the current month
  previousEndingDay: day of month integer code for the last day of the previous month
*/
const CalendarBody = ({ daysThisMonth, startingDay, previousEndingDay, currentMonth, currentYear, userActivities }) => {
  const maxDaysOnCalendar = 42
  let endOfWeek = 0
  const generateCalendarDays = () => {
    const containers = []

    // this loop gets the needed previous days of the month to help fill the calendar
    if (startingDay !== 0) {
      for (let i = startingDay - 2; i >= 0; i--) {
        containers.push(<CalendarDay nextMonth day={previousEndingDay - i} />)
        endOfWeek++
      }
    } else {
      for (let i = 5; i >= 0; i--) {
        containers.push(<CalendarDay nextMonth day={previousEndingDay - i} />)
        endOfWeek++
      }
    }

    for (let i = 1; i <= daysThisMonth; i++) {
      endOfWeek++
      containers.push(<CalendarDay
        year={currentYear}
        month={currentMonth + 1}
        day={i}
        activities={userActivities?.filter(activity => activity.date === formatDateMMDD(`${currentMonth + 1}-${i}-${currentYear}`))}/>)

      if (endOfWeek % 7 === 0) {
        const startOfWeekDate = getStartOfCurrentWeekISO(formatDateMMDD(`${currentMonth + 1}-${i}-${currentYear}`))
        const endOfWeekDate = getEndOfCurrentWeekISO(formatDateMMDD(`${currentMonth + 1}-${i}-${currentYear}`))

        containers.push(<CalendarDay day={endOfWeek / 7} weeklyBreakdown activities={userActivities?.filter(activity => dateIsAfter(activity.date, startOfWeekDate) && dateIsBefore(activity.date, endOfWeekDate))} />)
      }
    }

    if (daysThisMonth < 35) {
      for (let i = 1; i <= maxDaysOnCalendar - (daysThisMonth + (startingDay === 0 ? 6 : startingDay - 1)); i++) {
        containers.push(<CalendarDay nextMonth day={i} />)
        endOfWeek++
        if (endOfWeek % 7 === 0) {
          containers.push(<CalendarDay day={endOfWeek / 7} weeklyBreakdown />)
        }
      }
    }
    return containers
  }
  return <div className={classes.calendarBodyContainer}>{generateCalendarDays()}</div>
}

export default CalendarBody
