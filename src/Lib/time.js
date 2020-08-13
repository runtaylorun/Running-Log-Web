import Moment from 'moment'

export const getStartOfCurrentWeekISO = () => {
  return Moment().clone().startOf('isoWeek')
}

export const getDatesForCurrentWeek = () => {
  const dates = []
  const startOfCurrentWeek = getStartOfCurrentWeekISO()

  for (let i = 0; i < 7; i++) {
    dates.push(Moment(startOfCurrentWeek).add(i, 'd').format('DD/MM/YY'))
  }

  return dates
}
