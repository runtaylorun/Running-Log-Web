import Moment from 'moment'
import { secondsToHourMinuteSeconds } from './time'

export const calculatePacePerMile = (time, distance, distanceUnit) => {
  const timeInSeconds = timeToSeconds(time)

  if (distanceUnit === 'Km') {
    const convertedDistance = distance / 1.609344
    const averageSecondsPerMile = timeInSeconds / convertedDistance
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  } else {
    const averageSecondsPerMile = timeInSeconds / distance
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  }
}

export const calculatePacePerKilometer = (time, distance, distanceUnit) => {
  const timeInSeconds = timeToSeconds(time)

  if (distanceUnit === 'Mi') {
    const convertedDistance = distance * 1.609344
    const averageSecondsPerMile = timeInSeconds / convertedDistance
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  } else {
    const averageSecondsPerMile = timeInSeconds / distance
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  }
}

export const timeToSeconds = (time) => {
  return Moment.duration(time).asSeconds()
}
