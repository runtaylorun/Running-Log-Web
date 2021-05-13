import Moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(Moment)

export const getStartOfCurrentWeekISO = (date) => {
  if (date) {
    return Moment(date).clone().startOf('week')
  } else {
    return Moment().clone().startOf('week')
  }
}

export const getEndOfCurrentWeekISO = (date) => {
  if (date) {
    return Moment(date).clone().endOf('week')
  } else {
    return Moment().clone().endOf('week')
  }
}

export const toISO = (date) => {
  return Moment(date).toISOString()
}

export const dateIsAfter = (comparedDate, baseDate) => {
  return Moment(comparedDate).isAfter(baseDate) || Moment(comparedDate).isSame(baseDate)
}

export const dateIsBetween = (startDate, endDate, date) => {
  return dateIsAfter(date, startDate) && dateIsBefore(date, endDate)
}

export const dateIsBefore = (comparedDate, baseDate) => {
  return Moment(comparedDate).isBefore(baseDate)
}

export const getDatesForCurrentWeek = () => {
  const dates = []
  const startOfCurrentWeek = getStartOfCurrentWeekISO()

  for (let i = 0; i < 7; i++) {
    dates.push(Moment(startOfCurrentWeek).add(i, 'd').format('MM/DD/YY'))
  }

  return dates
}

export const formatDateMMDD = (dateString) => {
  return Moment(dateString).format('MM-DD-YYYY')
}

export const formatDateYYMMDD = (dateString) => {
  return Moment(dateString).format('YYYY-MM-DD')
}

export const HMStoSeconds = (hours, minutes, seconds) => {
  return ((hours * 60) * 60) + (minutes * 60) + seconds
}

export const secondsToHourMinuteSeconds = (seconds) => {
  return Moment.duration(seconds, 'seconds').format('h:mm:ss')
}

export const weeksFromCurrentDate = (numberOfWeeks, isStart = true) => {
  if (isStart) {
    return Moment(getStartOfCurrentWeekISO()).subtract(numberOfWeeks, 'w')
  } else {
    return Moment(getEndOfCurrentWeekISO()).subtract(numberOfWeeks, 'w')
  }
}

export const getCurrentDate = () => {
  return formatDateMMDD(Moment())
}
