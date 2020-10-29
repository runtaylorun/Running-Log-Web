import Moment from 'moment'
import { secondsToHourMinuteSeconds } from './time'

export const calculatePacePerMile = (time, distance) => {
  const timeInSeconds = timeToSeconds(time)
  console.log(Moment(time))

  if (distance.distanceUnit === 'Km') {
    const convertedDistance = distance.distance / 1.609344
    const averageSecondsPerMile = timeInSeconds / convertedDistance
    console.log(averageSecondsPerMile)
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  } else {
    const averageSecondsPerMile = timeInSeconds / distance.distance
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  }
}

export const calculatePacePerKilometer = (time, distance) => {
  const timeInSeconds = timeToSeconds(time)

  if (distance.distanceUnit === 'Mi') {
    const convertedDistance = distance.distance * 1.609344
    const averageSecondsPerMile = timeInSeconds / convertedDistance
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  } else {
    const averageSecondsPerMile = timeInSeconds / distance.distance
    return secondsToHourMinuteSeconds(averageSecondsPerMile)
  }
}

export const timeToSeconds = (time) => {
  return Moment.duration(time).asSeconds()
}
