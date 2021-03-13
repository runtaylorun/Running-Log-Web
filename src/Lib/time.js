import Moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(Moment)

export const getStartOfCurrentWeekISO = (date) => {
  if (date) {
    return Moment(date).clone().startOf('isoWeek')
  } else {
    return Moment().clone().startOf('isoWeek')
  }
}

export const getEndOfCurrentWeekISO = (date) => {
  if (date) {
    return Moment(date).clone().endOf('isoWeek')
  } else {
    return Moment().clone().endOf('isoWeek')
  }
}

export const toISO = (date) => {
  return Moment(date).toISOString()
}

export const dateIsAfter = (comparedDate, baseDate) => {
  return Moment(comparedDate).isAfter(baseDate) || Moment(comparedDate).isSame(baseDate)
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

export const secondsToHourMinuteSeconds = (seconds) => {
  return Moment.duration(seconds, 'seconds').format('h:mm:ss')
}

export const getCurrentDate = () => {
  return formatDateMMDD(Moment())
}
